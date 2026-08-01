import { NextResponse } from "next/server";
import { db } from "@/db";
import { cookieConsentLogs } from "@/db/schema";
import { buildConsentModeV2 } from "@/lib/consent-manager";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { consentId, categories, region } = body;

    if (!consentId || !categories) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const consentModeV2 = buildConsentModeV2(categories);

    await db.insert(cookieConsentLogs).values({
      consentId,
      categories,
      region: region || "GLOBAL",
      userAgent: request.headers.get("user-agent") || "unknown",
      consentModeV2,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Consent log error:", err);
    return NextResponse.json({ error: "Failed to record consent" }, { status: 500 });
  }
}
