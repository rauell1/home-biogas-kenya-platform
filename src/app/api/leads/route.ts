import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads, leadActivities } from "@/db/schema";
import { leadSchema, generateReference } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { audit } from "@/lib/auth";
import { sendMail } from "@/lib/email";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  const reference = generateReference();
  const [lead] = await db
    .insert(leads)
    .values({
      reference,
      fullName: data.fullName,
      organisation: data.organisation || null,
      phone: data.phone,
      whatsapp: data.whatsapp || null,
      email: data.email || null,
      county: data.county || null,
      locality: data.locality || null,
      preferredContact: data.preferredContact,
      timeline: data.timeline || null,
      budgetRange: data.budgetRange || null,
      notes: data.notes || null,
      configurator: (data.configurator ?? null) as never,
    })
    .returning();

  await db.insert(leadActivities).values({
    leadId: lead.id,
    type: "follow_up",
    body: "Initial contact attempt for new website assessment request.",
    actorEmail: "system",
    dueAt: new Date(Date.now() + 2 * 24 * 3600 * 1000),
  });

  await sendMail({
    to: data.email || process.env.EMAIL_REPLY_TO || "",
    subject: `Home Biogas Kenya — assessment request ${reference}`,
    text: `Thank you ${data.fullName}. Your reference is ${reference}. Our engineering team will contact you within two working days.`,
  });
  await sendMail({
    to: process.env.EMAIL_REPLY_TO || "",
    subject: `New lead ${reference} — ${data.fullName}`,
    text: `County: ${data.county}\nPhone: ${data.phone}\nNotes: ${data.notes ?? ""}`,
  });

  await audit(null, "lead.created", "lead", lead.id, { reference, ip });

  return NextResponse.json({ reference }, { status: 201 });
}
