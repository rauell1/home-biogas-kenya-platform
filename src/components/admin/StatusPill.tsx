const TONES: Record<string, string> = {
  approved: "border-olive text-olive",
  published: "border-olive text-olive",
  company_owned: "border-olive text-olive",
  licensed: "border-olive text-olive",
  verified: "border-olive text-olive",
  confirmed: "border-olive text-olive",
  active: "border-olive text-olive",
  approved_public: "border-olive text-olive",
  WON: "border-olive text-olive",

  in_review: "border-safety text-[#8a6d13]",
  pending: "border-safety text-[#8a6d13]",
  draft: "border-safety text-[#8a6d13]",
  unreviewed: "border-safety text-[#8a6d13]",
  unknown: "border-safety text-[#8a6d13]",
  uncertain: "border-safety text-[#8a6d13]",
  NEW: "border-safety text-[#8a6d13]",
  scheduled: "border-safety text-[#8a6d13]",

  rejected: "border-oxide text-oxide",
  restricted: "border-oxide text-oxide",
  wrong_company: "border-oxide text-oxide",
  disabled: "border-oxide text-oxide",
  LOST: "border-oxide text-oxide",
  revoked: "border-oxide text-oxide",
  expired: "border-oxide text-oxide",
};

export default function StatusPill({ value }: { value: string }) {
  const tone = TONES[value] ?? "border-ink/25 text-ink/60";
  return <span className={`tag ${tone}`}>{value.replaceAll("_", " ")}</span>;
}
