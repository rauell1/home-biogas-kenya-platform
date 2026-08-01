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
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: dbUrl });

try {
  const sql = fs.readFileSync(path.resolve(process.cwd(), 'drizzle/0002_mature_doctor_octopus.sql'), 'utf8');
  console.log("Applying migration 0002...");
  const statements = sql.split('--> statement-breakpoint');
  for (const stmt of statements) {
    if (stmt.trim()) {
      await pool.query(stmt.trim());
    }
  }
  console.log("Migration 0002 applied successfully!");
} catch (err) {
  console.error("Migration error:", err);
} finally {
  await pool.end();
}
