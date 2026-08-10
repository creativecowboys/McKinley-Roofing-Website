import type { LeadPayload } from './email';

/**
 * GoHighLevel (LeadConnector) API v2 client.
 *
 * Env:
 *  - GHL_API_TOKEN    (required — skip if missing)
 *  - GHL_LOCATION_ID  (required — skip if missing)
 *  - GHL_PIPELINE_ID  (optional — falls back to first pipeline)
 *  - GHL_STAGE_NAME   (optional — default "New Lead", falls back to first stage)
 *
 * Required Private Integration / token scopes:
 *  - contacts.write
 *  - opportunities.write
 *  - opportunities.readonly   (needed to list pipelines/stages)
 */

const BASE_URL = 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-07-28';

function ghlHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Version: API_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

interface GhlPipelineStage {
  id: string;
  name: string;
}

interface GhlPipeline {
  id: string;
  name: string;
  stages?: GhlPipelineStage[];
}

function buildNoteBody(lead: LeadPayload): string {
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(' ').trim();
  const lines: string[] = ['New website lead'];
  if (lead.source) lines.push(`Source: ${lead.source}`);
  if (fullName) lines.push(`Name: ${fullName}`);
  if (lead.email) lines.push(`Email: ${lead.email}`);
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.address) lines.push(`Address: ${lead.address}`);
  if (lead.newClient) lines.push(`New Client: ${lead.newClient}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  return lines.join('\n');
}

/**
 * Create/update a GHL contact, attach a note to the contact, and open an
 * opportunity in the configured pipeline stage. Each step is wrapped so a
 * failure logs and is treated as non-fatal.
 *
 * Returns { ghl: true } if the contact upsert (the core action) succeeded.
 */
export async function createGhlLead(
  lead: LeadPayload
): Promise<{ ghl: boolean }> {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.log('[lead] ghl skipped: not configured');
    return { ghl: false };
  }

  const headers = ghlHeaders(token);
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(' ').trim();
  const source = lead.source || 'contact-form';

  // Step A — upsert contact
  let contactId: string | undefined;
  try {
    const res = await fetch(`${BASE_URL}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        locationId,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        source: 'McKinley Website',
        tags: ['Source: McKinley Website'],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[lead] ghl contact upsert failed (${res.status}):`, text);
      return { ghl: false };
    }

    const data = (await res.json()) as
      | { contact?: { id?: string }; id?: string }
      | undefined;
    contactId = data?.contact?.id ?? data?.id;

    if (!contactId) {
      console.error('[lead] ghl contact upsert: no contact id in response');
      return { ghl: false };
    }
  } catch (err) {
    console.error('[lead] ghl contact upsert error:', err);
    return { ghl: false };
  }

  // Step B — add note to the CONTACT (opportunities reject a notes property w/ 422)
  try {
    const res = await fetch(`${BASE_URL}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: buildNoteBody(lead) }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`[lead] ghl note failed (${res.status}):`, text);
    }
  } catch (err) {
    console.error('[lead] ghl note error:', err);
  }

  // Step C — resolve pipeline + stage id
  const configuredPipelineId = process.env.GHL_PIPELINE_ID;
  const stageName = process.env.GHL_STAGE_NAME || 'New Lead';
  let pipelineId: string | undefined;
  let pipelineStageId: string | undefined;
  try {
    const res = await fetch(
      `${BASE_URL}/opportunities/pipelines?locationId=${encodeURIComponent(
        locationId
      )}`,
      { method: 'GET', headers }
    );
    if (!res.ok) {
      const text = await res.text();
      console.error(`[lead] ghl pipelines fetch failed (${res.status}):`, text);
    } else {
      const data = (await res.json()) as { pipelines?: GhlPipeline[] };
      const pipelines = data.pipelines ?? [];
      const pipeline =
        (configuredPipelineId &&
          pipelines.find((p) => p.id === configuredPipelineId)) ||
        pipelines[0];
      if (pipeline) {
        pipelineId = pipeline.id;
        const stages = pipeline.stages ?? [];
        const stage =
          stages.find(
            (s) => s.name?.toLowerCase() === stageName.toLowerCase()
          ) || stages[0];
        pipelineStageId = stage?.id;
      }
    }
  } catch (err) {
    console.error('[lead] ghl pipelines error:', err);
  }

  // Step D — create opportunity (duplicate open opps return an error; non-fatal)
  if (pipelineId && pipelineStageId) {
    try {
      const res = await fetch(`${BASE_URL}/opportunities/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          pipelineId,
          locationId,
          contactId,
          pipelineStageId,
          name: `${fullName || 'New Lead'} — ${source}`,
          status: 'open',
          source: 'McKinley Website',
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`[lead] ghl opportunity failed (${res.status}):`, text);
      }
    } catch (err) {
      console.error('[lead] ghl opportunity error:', err);
    }
  } else {
    console.log('[lead] ghl opportunity skipped: no pipeline/stage resolved');
  }

  // Contact upsert succeeded — count GHL as a success even if a later step failed.
  return { ghl: true };
}
