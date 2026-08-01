import { COMPANY, DIGESTER_TECHNOLOGIES, SOCIALS, PROCESS_CHAIN, SERVICE_GROUPS } from "@/lib/content";
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
          { label: "Technologies", value: "Fixed-dome · Floating-drum · Flexible · Tank" },
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
            We build professional, reliable biogas plants for homes, farms, institutions and industries. Organic waste is
            converted into gas for cooking, water heating, poultry brooding, lighting and appropriately treated engines
            that can power farm machinery such as chaff cutters, milking machines and water pumps.
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

      <section className="bg-bone">
        <div className="shell section">
          <div className="max-w-3xl">
            <p className="chapter-marker text-clay">Systems we work with</p>
            <h2 className="display-xl mt-4">A technology selected for the site—not forced onto it</h2>
            <p className="lede mt-6 text-ink/72">
              The company materials identify four principal digester families. Final selection follows a site survey,
              measured daily feedstock and the energy demand the system must serve.
            </p>
          </div>
          <div className="mt-10 grid border-l border-t border-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {DIGESTER_TECHNOLOGIES.map((technology, index) => (
              <article key={technology.name} className="border-b border-r border-ink/12 p-6">
                <p className="mono-label text-clay">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="display-md mt-5">{technology.name}</h3>
                <p className="mt-3 text-sm text-ink/70">{technology.description}</p>
              </article>
            ))}
          </div>
          <p className="mono-data mt-7 text-ink/55">
            Office: {COMPANY.address} · {COMPANY.phone} · {COMPANY.email}
          </p>
        </div>
      </section>
    </>
  );
}
