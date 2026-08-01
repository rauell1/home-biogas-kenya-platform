import fs from 'fs';
import path from 'path';
import pg from 'pg';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not found in environment");
  process.exit(1);
}

console.log("Connecting to Neon PostgreSQL...");
const pool = new pg.Pool({ connectionString: dbUrl });

try {
  const sql = fs.readFileSync(path.resolve(process.cwd(), 'scripts/seed.sql'), 'utf8');
  console.log("Executing seed.sql...");
  await pool.query(sql);
  console.log("Database seeded successfully with verified projects!");
} catch (err) {
  console.error("Seeding error:", err);
} finally {
  await pool.end();
}
