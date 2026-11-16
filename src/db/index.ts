import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

type Db = NodePgDatabase & { $client: Pool };

function createDb(): Db {
  const pool = new Pool({ connectionString: databaseUrl });
  return drizzle(pool);
}

// Cloudflare Workers forbids using a socket opened in one request from
// another request, so there the pool is scoped to the current request
// (OpenNext publishes its execution context under this well-known symbol).
// On Node (local dev, scripts) one pool is shared.
const cloudflareContextSymbol = Symbol.for("__cloudflare-context__");
const perRequestDb = new WeakMap<object, Db>();

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlDb?: Db;
};

function currentDb(): Db {
  const context = (globalThis as Record<symbol, unknown>)[cloudflareContextSymbol] as
    | { ctx?: object }
    | undefined;
  const scope = context?.ctx;
  if (scope) {
    let scoped = perRequestDb.get(scope);
    if (!scoped) {
      scoped = createDb();
      perRequestDb.set(scope, scoped);
    }
    return scoped;
  }
  globalForDb.__arenaNextJsPostgresqlDb ??= createDb();
  return globalForDb.__arenaNextJsPostgresqlDb;
}

/** Drizzle database for the current scope (see above). */
export const db = new Proxy({} as Db, {
  get(_target, property) {
    const target = currentDb();
    const value = Reflect.get(target, property, target);
    return typeof value === "function" ? value.bind(target) : value;
  },
});
