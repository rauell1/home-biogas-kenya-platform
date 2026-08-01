import { SOCIALS, PROCESS_CHAIN, SERVICE_GROUPS } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An engineering-led waste-to-energy company"
        lede="Home Biogas Kenya designs, builds, commissions and maintains biogas and organic-waste systems for households, farms, institutions and commercial facilities across Kenya."
        meta={[
          { label: "Base", value: "Nairobi, Kenya" },
          { label: "Technologies", value: "Fixed-dome · Flexible PVC · Wastewater" },
          { label: "Services", value: String(SERVICE_GROUPS.flatMap((g) => g.items).length) },
          { label: "Approach", value: "Measure first, then design" },
        ]}
      />

      <div className="shell section grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div className="prose-body space-y-6">
          <p className="lede text-ink/85">
            Every system starts from measured reality: what waste exists, how much arrives each day, what energy the site
            actually consumes, and what the ground, water and drainage conditions allow.
          </p>
          <p>
            We install flexible/PVC and fixed-dome concrete plants, supply and connect biogas appliances, and provide
            feasibility studies, planning, engineering design, construction, operation support and technical consultancy.
          </p>
          <p>
            A plant that produces gas but cannot deliver it at the pressure an appliance needs is a failed plant. So we
            treat the digester, the gas train and the end use as one engineered system — and we train the people who
            will run it every day.
          </p>
          <p className="note">
            Home Biogas Kenya is represented online only by our LinkedIn and Facebook pages. We are not affiliated with
            the international HomeBiogas brand or HomeBiogas Ventures Limited.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a className="btn btn-outline btn-sm" href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn btn-outline btn-sm" href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
              Facebook ↗
            </a>
          </div>
        </div>

        <aside className="panel p-6 md:p-8">
          <h2 className="mono-label text-clay">The chain we engineer</h2>
          <ol className="mt-5">
            {PROCESS_CHAIN.map((s, i) => (
              <li key={s} className="flex gap-4 border-b border-ink/10 py-2.5 last:border-b-0">
                <span className={`mono-label ${i === 3 ? "text-methane" : "text-ink/40"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </>
  );
}
