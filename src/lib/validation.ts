import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().min(7).max(30),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  county: z.string().trim().max(80).optional().or(z.literal("")),
  locality: z.string().trim().max(120).optional().or(z.literal("")),
  preferredContact: z.enum(["phone", "whatsapp", "email"]).default("phone"),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  budgetRange: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
  configurator: z.unknown().optional(),
  website: z.string().max(0).optional(), // honeypot
});

export type LeadInput = z.infer<typeof leadSchema>;

export function generateReference(date = new Date(), random = Math.random()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const n = Math.floor(random * 46656)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `HBK-${y}${m}-${n}`;
}
