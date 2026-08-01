export const SOCIALS = {
  linkedin: "https://www.linkedin.com/company/homebiogas-kenya/posts/?feedView=all",
  facebook: "https://www.facebook.com/homebiogask/",
};

export const COMPANY = {
  phone: "+254 724 738 393",
  email: "info@homebiogaskenya.co.ke",
  address: "Kenya House Complex, 2nd Floor, Koinange Street, near University Way",
  postalAddress: "P.O. Box 51437-00100, Nairobi, Kenya",
  website: "https://www.homebiogaskenya.co.ke",
};

export const DIGESTER_TECHNOLOGIES = [
  { name: "Fixed-dome", description: "A durable masonry or concrete digester built in situ for long-term household, farm and institutional use." },
  { name: "Floating-drum", description: "A digester with a moving gas holder that makes stored gas volume and delivery pressure easy to observe." },
  { name: "Flexible PVC", description: "A tubular or balloon digester suited to rapid installation and sites where a lighter civil-work footprint is useful." },
  { name: "Container and tank systems", description: "Modular packaged systems configured around the available feedstock, site constraints and intended gas use." },
];

export const PROCESS_CHAIN = [
  "Organic waste",
  "Collection",
  "Preparation",
  "Anaerobic digestion",
  "Biogas production",
  "Gas treatment",
  "Gas distribution",
  "Cooking / heating / power / machinery",
  "Bio-slurry",
  "Soil and agriculture",
];

export type ServiceGroup = { category: string; items: { slug: string; name: string; summary: string }[] };

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    category: "Biogas systems",
    items: [
      { slug: "domestic-biogas-systems", name: "Domestic biogas systems", summary: "Household digesters sized on daily manure or kitchen waste for cooking and lighting." },
      { slug: "farm-biogas-systems", name: "Farm biogas systems", summary: "Livestock waste digestion for cooking, brooding, machinery and bio-slurry recovery." },
      { slug: "institutional-biogas-systems", name: "Institutional biogas systems", summary: "Schools, colleges and hospitals with large kitchens and sanitation waste streams." },
      { slug: "commercial-biogas-systems", name: "Commercial biogas systems", summary: "Hotels, markets, abattoirs and processors treating high organic loads." },
    ],
  },
  {
    category: "Digester technologies",
    items: [
      { slug: "fixed-dome-concrete-biodigesters", name: "Fixed-dome concrete biodigesters", summary: "Masonry and concrete plants built in situ for long service life." },
      { slug: "flexible-pvc-biodigesters", name: "Flexible / PVC biodigesters", summary: "Tubular membrane digesters for rapid, lower-cost installation." },
      { slug: "wastewater-treatment-biodigesters", name: "Wastewater-treatment biodigesters", summary: "Anaerobic treatment of sanitary and process effluent." },
      { slug: "organic-waste-treatment", name: "Organic-waste treatment", summary: "Market, kitchen and slaughterhouse waste handling and digestion." },
    ],
  },
  {
    category: "Gas handling and appliances",
    items: [
      { slug: "biogas-appliances", name: "Biogas appliances", summary: "Burners, cookers, ovens, lamps, water heaters and brooders." },
      { slug: "gas-piping-and-distribution", name: "Gas piping and distribution", summary: "Sized pipe runs, valves, condensate traps and safety isolation." },
      { slug: "gas-filtration", name: "Gas filtration", summary: "Hydrogen-sulphide and moisture removal to protect appliances and engines." },
      { slug: "pressure-management", name: "Pressure management", summary: "Water traps, manometers, relief and regulation for stable delivery." },
      { slug: "biogas-generators", name: "Biogas generators", summary: "Electricity generation from treated biogas." },
      { slug: "engine-conversion", name: "Engine conversion", summary: "Converting stationary petrol engines to run on biogas." },
      { slug: "poultry-brooding", name: "Poultry brooding", summary: "Biogas brooders delivering controlled heat to chicks." },
      { slug: "water-heating", name: "Water heating", summary: "Biogas water heating for kitchens, dairies and lodges." },
      { slug: "bio-slurry-recovery", name: "Bio-slurry recovery", summary: "Digestate handling, storage and agricultural application." },
    ],
  },
  {
    category: "Engineering services",
    items: [
      { slug: "feasibility-studies", name: "Feasibility studies", summary: "Waste, energy demand and viability assessment before design." },
      { slug: "site-surveys", name: "Site surveys", summary: "Ground, drainage, water and distance assessment on site." },
      { slug: "engineering-design", name: "Engineering design", summary: "Plant sizing, drawings and gas-network design." },
      { slug: "construction", name: "Construction", summary: "Excavation, masonry, membrane installation and pipework." },
      { slug: "commissioning", name: "Commissioning", summary: "Charging, leak testing and first-gas verification." },
      { slug: "user-training", name: "User training", summary: "Safe operation, feeding routines and maintenance for users." },
      { slug: "maintenance", name: "Maintenance", summary: "Scheduled servicing of digesters, filters and appliances." },
      { slug: "rehabilitation", name: "Rehabilitation", summary: "Repair and recovery of failed or under-performing plants." },
      { slug: "renewable-energy-consultancy", name: "Renewable-energy consultancy", summary: "Advisory on waste-to-energy strategy and compliance." },
    ],
  },
];

export const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.items.map((i) => ({ ...i, category: g.category })));

export type AppItem = {
  slug: string;
  name: string;
  use: string;
  requirement: string;
  projectSlug: string;
};

export const APPLICATIONS: AppItem[] = [
  { slug: "household-cooker", name: "Household cooker", use: "Daily family cooking on one or two burners.", requirement: "From ~6 m³ digester with stable daily feeding.", projectSlug: "kerarapon-16m3-system" },
  { slug: "commercial-cooker", name: "Commercial cooker", use: "High-volume kitchens and institutional catering.", requirement: "Large digester volume and buffered gas storage.", projectSlug: "nairobi-school-32m3-project" },
  { slug: "oven", name: "Oven", use: "Baking bread and pastries on biogas.", requirement: "Stable pressure and filtered gas.", projectSlug: "kerarapon-16m3-system" },
  { slug: "water-heater", name: "Water heater", use: "Hot water for kitchens, dairies and guest rooms.", requirement: "Continuous supply with pressure management.", projectSlug: "kwenia-eco-lodge-phases" },
  { slug: "poultry-brooder", name: "Poultry brooder", use: "Controlled heat for chicks in the brooding period.", requirement: "Reliable low-pressure supply and safety isolation.", projectSlug: "gataka-12m3-poultry-pig-system" },
  { slug: "biogas-lamp", name: "Biogas lamp", use: "Lighting in areas without reliable grid supply.", requirement: "Filtered gas, dedicated pipe run.", projectSlug: "kwenia-eco-lodge-phases" },
  { slug: "generator", name: "Generator", use: "Electricity generation from treated biogas.", requirement: "H2S filtration and moisture removal are mandatory.", projectSlug: "kerarapon-16m3-system" },
  { slug: "chaff-cutter", name: "Chaff cutter", use: "Fodder chopping driven by a converted engine.", requirement: "Converted stationary engine and gas storage.", projectSlug: "kerarapon-16m3-system" },
  { slug: "water-pump", name: "Water pump", use: "Irrigation and livestock water supply.", requirement: "Engine conversion and steady gas flow.", projectSlug: "gataka-12m3-poultry-pig-system" },
];

export const PLANT_COMPONENTS = [
  { id: "mixing-tank", name: "Mixing tank", technical: "Feed slurry prepared at roughly 1:1 water-to-manure by volume before entry.", simple: "Waste and water are mixed here before entering the plant." },
  { id: "inlet", name: "Feed inlet", technical: "Gravity inlet pipe discharging below liquid level to avoid gas escape.", simple: "The mixed waste flows down into the digester." },
  { id: "digester", name: "Digester", technical: "Sealed anaerobic chamber; retention time typically 30–60 days depending on temperature and feedstock.", simple: "Bacteria break down the waste without air and make gas." },
  { id: "gas-storage", name: "Gas holder", technical: "Dome volume stores gas and displaces slurry into the expansion chamber as pressure rises.", simple: "Gas collects in the top of the dome." },
  { id: "gas-outlet", name: "Main gas outlet", technical: "Dome crown take-off, sized to peak appliance demand.", simple: "The gas leaves the plant through this pipe." },
  { id: "valve", name: "Main valve", technical: "Isolation valve for maintenance, leak testing and emergency shut-off.", simple: "A tap to shut the gas off." },
  { id: "condensate-trap", name: "Condensate trap", technical: "Water trap at the pipeline low point, drained routinely to prevent blockage.", simple: "Removes water that collects inside the pipe." },
  { id: "gas-filter", name: "Gas filter", technical: "Hydrogen-sulphide removal media protecting appliances, engines and generators.", simple: "Cleans the gas so appliances last longer." },
  { id: "pressure-control", name: "Pressure control", technical: "Manometer and relief arrangement maintaining delivery within appliance range.", simple: "Keeps the gas pressure safe and steady." },
  { id: "expansion-chamber", name: "Expansion chamber", technical: "Receives displaced slurry as gas accumulates; returns it as gas is drawn.", simple: "Holds slurry pushed out when the dome fills with gas." },
  { id: "slurry-outlet", name: "Slurry outlet", technical: "Overflow discharging digested slurry once fresh feed is added.", simple: "Digested material leaves here." },
  { id: "slurry-storage", name: "Slurry storage", technical: "Lined storage or drying beds prior to field application.", simple: "Bio-slurry is stored before use on the farm." },
];
