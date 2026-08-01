import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/email";

const subscriptionSchema = z.object({
  email: z.string().trim().email().max(254),
  company: z.string().max(200).optional().default(""),
  locale: z.enum(["en", "sw"]).optional().default("en"),
});

export async function POST(request: Request) {
  const parsed = subscriptionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ message: "You are subscribed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[newsletter] RESEND_API_KEY is not configured");
    return NextResponse.json({ message: "Newsletter signup is temporarily unavailable." }, { status: 503 });
  }

  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "home-biogas-kenya-platform/1.0",
    },
    body: JSON.stringify({
      email: parsed.data.email.toLowerCase(),
      unsubscribed: false,
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    }),
  });

  if (!response.ok && response.status !== 409) {
    const error = await response.text();
    console.error("[newsletter:resend]", response.status, error);
    return NextResponse.json({ message: "We could not complete your signup. Please try again." }, { status: 502 });
  }

  if (response.ok) {
    await sendMail({
      to: parsed.data.email,
      subject: "Welcome to Home Biogas Kenya updates",
      text: "Thank you for joining our newsletter. We will share practical biogas guidance, project updates, training opportunities and new solutions.\n\nYou can unsubscribe from any newsletter email.",
    });
  }

  return NextResponse.json({
    message: parsed.data.locale === "sw" ? "Umejiandikisha kwa mafanikio." : "Thank you. You are subscribed.",
  });
}
