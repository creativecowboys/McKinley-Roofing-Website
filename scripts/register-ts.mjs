// Registers the resolver hook in scripts/ts-resolve-hook.mjs.
// Usage: node --import ./scripts/register-ts.mjs scripts/test-lead-decision.mjs
import { register } from "node:module";
import { pathToFileURL } from "node:url";
register("./ts-resolve-hook.mjs", pathToFileURL("./scripts/"));
