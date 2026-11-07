// Lets `node scripts/test-*.mjs` import the app's TypeScript modules directly.
//
// Node 22 strips types from .ts files on its own, but its ESM resolver still
// wants a file extension, while the app's source uses Next.js style
// extensionless imports ('./spam') and the '@/' alias. This hook fills in both.
// Test-only: nothing in the app imports it.

import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

const ROOT = new URL("../", import.meta.url);
const EXTS = [".ts", ".tsx", ".mjs", ".js"];

export function resolve(specifier, context, next) {
  // '@/lib/email' -> <repo>/lib/email
  if (specifier.startsWith("@/")) {
    specifier = new URL(specifier.slice(2), ROOT).href;
  }

  if (specifier.startsWith(".") || specifier.startsWith("file:")) {
    const base = specifier.startsWith("file:")
      ? new URL(specifier)
      : new URL(specifier, context.parentURL);

    if (!EXTS.some((e) => base.pathname.endsWith(e))) {
      for (const ext of EXTS) {
        const candidate = new URL(base.href + ext);
        if (existsSync(candidate)) return next(candidate.href, context);
      }
      for (const ext of EXTS) {
        const candidate = new URL(`${base.href}/index${ext}`);
        if (existsSync(candidate)) return next(candidate.href, context);
      }
    }
    return next(base.href, context);
  }

  return next(specifier, context);
}

export { pathToFileURL };
