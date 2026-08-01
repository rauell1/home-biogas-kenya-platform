import PageHeader from "@/components/PageHeader";

const ROWS = [
  { f: "Cow manure", suit: "Excellent", tone: "olive", note: "Stable digestion, good buffering, requires 1:1 water mixing." },
  { f: "Pig manure", suit: "Excellent", tone: "olive", note: "Higher yield, watch ammonia and odour handling." },
  { f: "Poultry waste", suit: "Good with care", tone: "safety", note: "Energy rich but high nitrogen; co-digest to avoid inhibition." },
  { f: "Food waste", suit: "Excellent", tone: "olive", note: "Shred and remove packaging, bones and cutlery." },
  { f: "Human waste", suit: "Suitable", tone: "olive", note: "Sanitation-linked systems need effluent compliance design." },
  { f: "Market waste", suit: "Good", tone: "olive", note: "Highly variable; sorting and shredding required." },
  { f: "Slaughterhouse waste", suit: "Specialist", tone: "safety", note: "Requires pre-treatment, screening and compliance study." },
  { f: "Wastewater", suit: "Specialist", tone: "safety", note: "Low gas per m³; treated for compliance rather than energy." },
  { f: "Soap, sand, disinfectant", suit: "Not suitable", tone: "oxide", note: "Kills or washes out digester bacteria." },
];

const TONE: Record<string, string> = {
  olive: "border-olive text-olive",
  safety: "border-safety text-[#8a6d13]",
  oxide: "border-oxide text-oxide",
};

export default function FeedstockChecker() {
  return (
    <>
      <PageHeader
        eyebrow="Tool"
        title="Feedstock checker"
        lede="Not everything organic belongs in a digester. Check what your waste stream will actually do to the process."
        meta={[
          { label: "Entries", value: String(ROWS.length) },
          { label: "Rule", value: "No soap, sand or disinfectant" },
          { label: "Mixing", value: "Typically 1:1 with water" },
          { label: "Verification", value: "Confirmed at site survey" },
        ]}
      />
      <div className="shell section">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-t border-ink/20 min-w-[42rem]">
            <thead>
              <tr className="mono-label text-ink/45">
                <th className="py-3 font-medium">Feedstock</th>
                <th className="font-medium">Suitability</th>
                <th className="font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {ROWS.map((r) => (
                <tr key={r.f} className="hover:bg-bone/60 transition-colors">
                  <td className="py-5 pr-6 display-md">{r.f}</td>
                  <td className="pr-6">
                    <span className={`tag ${TONE[r.tone]}`}>{r.suit}</span>
                  </td>
                  <td className="py-5 text-sm text-ink/75">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
