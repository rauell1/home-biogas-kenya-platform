export type CatalogueItem = {
  slug: string;
  name: string;
  category: "Appliance" | "Gas handling" | "Plant" | "Power";
  spec: string;
  image?: string;
};

export const PRODUCTS: CatalogueItem[] = [
  { slug: "double-biogas-cooker", name: "Double biogas cooker", category: "Appliance", spec: "Two low-pressure burners for household and farm kitchens", image: "/catalogue/double-cooker.jpg" },
  { slug: "single-biogas-cooker", name: "Single biogas cooker", category: "Appliance", spec: "Compact low-pressure burner for everyday cooking", image: "/catalogue/single-cooker.jpg" },
  { slug: "h2s-gas-filter", name: "Biogas filter / desulphuriser", category: "Gas handling", spec: "Removes hydrogen sulphide before appliances and engines", image: "/catalogue/gas-filter.jpg" },
  { slug: "gas-valves", name: "Biogas valves", category: "Gas handling", spec: "Isolation and flow-control fittings for safe distribution", image: "/catalogue/valves.jpg" },
  { slug: "gas-pipe-kit", name: "Gas pipe kit", category: "Gas handling", spec: "Pipe and fittings selected for the required route and demand", image: "/catalogue/gas-pipe-kit.jpg" },
  { slug: "portable-biogas-plant", name: "Portable biogas plant", category: "Plant", spec: "Compact flexible system for measured daily organic waste", image: "/catalogue/portable-digester.jpg" },
  { slug: "food-waste-biodigester", name: "Food-waste biodigester", category: "Plant", spec: "Compact system sized around measured kitchen-waste input" },
  { slug: "flexible-pvc-biodigester", name: "Flexible PVC biodigester", category: "Plant", spec: "Rapid-installation tubular system in multiple capacities" },
  { slug: "fixed-dome-biodigester", name: "Fixed-dome concrete biodigester", category: "Plant", spec: "Site-built system sized after survey and feedstock measurement" },
  { slug: "biogas-water-heater", name: "Biogas water heater", category: "Appliance", spec: "Hot-water production for homes, dairies and institutions" },
  { slug: "poultry-brooder", name: "Poultry brooder", category: "Appliance", spec: "Biogas-fired radiant heat for poultry production" },
  { slug: "biogas-lamp", name: "Biogas lamp", category: "Appliance", spec: "Off-grid lighting supplied from a stable gas line" },
  { slug: "biogas-generator", name: "Biogas generator", category: "Power", spec: "Engine-generator package requiring dry, desulphurised gas" },
  { slug: "biogas-engine-conversion", name: "Engine conversion", category: "Power", spec: "Conversion assessment for pumps, chaff cutters and machinery" },
];

export const PLANT_SIZES = [4, 6, 8, 10, 12, 16, 20, 24, 32] as const;
