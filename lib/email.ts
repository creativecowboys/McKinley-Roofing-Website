import { Resend } from 'resend';

export interface LeadPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  newClient?: string;
  message?: string;
  source?: string;
}

const SOURCE_LABELS: Record<string, string> = {
  'inspection-modal': 'Free Roof Inspection Request',
  'contact-page': 'Contact Form Submission',
  'contact-form': 'Contact Form Submission',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface SendLeadEmailOptions {
  /** Override recipients (comma-separated). Defaults to LEAD_NOTIFY_EMAIL. */
  to?: string;
  /** Prepended to the subject line, e.g. "[Filtered] ". */
  subjectPrefix?: string;
  /** Optional banner shown above the lead table (used for spam-review copies). */
  note?: string;
}

/**
 * Send a lead-notification email via Resend.
 *
 * Env:
 *  - RESEND_API_KEY      (required — skip if missing)
 *  - LEAD_FROM_EMAIL     (e.g. "McKinley Roofing <leads@mail.mckinleyroofing.net>")
 *  - LEAD_NOTIFY_EMAIL   (required — comma-separated recipients; skip if missing)
 *
 * Returns true on a successful send, false if skipped or failed.
 */
export async function sendLeadEmail(
  lead: LeadPayload,
  options: SendLeadEmailOptions = {}
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const notify = options.to || process.env.LEAD_NOTIFY_EMAIL;
  const from =
    process.env.LEAD_FROM_EMAIL || 'McKinley Roofing <onboarding@resend.dev>';

  if (!apiKey || !notify) {
    console.log('[lead] email skipped: not configured');
    return false;
  }

  const to = notify
    .split(',')
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (to.length === 0) {
    console.log('[lead] email skipped: not configured');
    return false;
  }

  const source = lead.source || 'contact-form';
  const label = SOURCE_LABELS[source] || 'New Website Lead';
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(' ').trim();
  const subject = `${options.subjectPrefix ?? ''}${label}${fullName ? ` from ${fullName}` : ''}`;

  const rows: Array<[string, string | undefined]> = [
    ['Name', fullName || undefined],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Address', lead.address],
    ['New Client', lead.newClient],
    ['Message', lead.message],
    ['Source', source],
  ];

  const presentRows = rows.filter(([, value]) => value && String(value).trim());

  const textBody =
    (options.note ? `${options.note}\n\n` : '') +
    presentRows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const noteHtml = options.note
    ? `<p style="background: #fef3c7; border: 1px solid #f59e0b; color: #78350f; padding: 10px 12px; border-radius: 6px; max-width: 600px;">${escapeHtml(
        options.note
      )}</p>`
    : '';

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
      <h2 style="color: #dc2626; margin-bottom: 16px;">${escapeHtml(label)}</h2>
      ${noteHtml}
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        ${presentRows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0; vertical-align: top; white-space: nowrap;">${escapeHtml(
              k
            )}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(
              String(v)
            ).replace(/\n/g, '<br>')}</td>
          </tr>`
          )
          .join('')}
      </table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text: textBody,
      html: htmlBody,
      ...(lead.email ? { replyTo: lead.email } : {}),
    });

    if (error) {
      console.error('[lead] email failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[lead] email failed:', err);
    return false;
  }
}
