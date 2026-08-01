import { NextResponse } from "next/server";
import { db } from "@/db";
import { cookieConsentLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requirePermission } from "@/lib/guard";

export async function GET(request: Request) {
  try {
    await requirePermission("audit.read");
    const { searchParams } = new URL(request.url);
    const isExport = searchParams.get("export") === "csv";

    const logs = await db.select().from(cookieConsentLogs).orderBy(desc(cookieConsentLogs.createdAt)).limit(1000);

    if (isExport) {
      const header = "Consent ID,Region,Necessary,Functional,Analytics,Marketing,Logged At\n";
      const rows = logs
        .map(
          (l) =>
            `"${l.consentId}","${l.region}",${l.categories.necessary},${l.categories.functional},${l.categories.analytics},${l.categories.marketing},"${new Date(l.createdAt).toISOString()}"`
        )
        .join("\n");

      return new Response(header + rows, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="consent-logs.csv"',
        },
      });
    }

    return NextResponse.json({ logs });
  } catch {
    return NextResponse.json({ error: "Unauthorized or failed to fetch logs" }, { status: 401 });
  }
}
