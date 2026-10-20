import { jsonLd } from '@/lib/schema';

/**
 * Renders JSON-LD as plain <script> tags so the markup is in the server HTML
 * (next/script with afterInteractive only injects it after hydration).
 */
export default function JsonLd({ schemas }: { schemas: unknown[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
    </>
  );
}
