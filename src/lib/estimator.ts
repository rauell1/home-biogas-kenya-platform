export type FeedstockId =
  | "cow_manure"
  | "pig_manure"
  | "poultry_waste"
  | "food_waste"
  | "human_waste"
  | "market_waste"
  | "slaughterhouse_waste"
  | "wastewater"
  | "mixed_waste";

export const FEEDSTOCK_OPTIONS: { id: FeedstockId; label: string; unit: string }[] = [
  { id: "cow_manure", label: "Cow manure", unit: "animals" },
  { id: "pig_manure", label: "Pig manure", unit: "animals" },
  { id: "poultry_waste", label: "Poultry waste", unit: "birds" },
  { id: "food_waste", label: "Food waste", unit: "kg/day" },
  { id: "human_waste", label: "Human waste", unit: "people" },
  { id: "market_waste", label: "Market waste", unit: "kg/day" },
  { id: "slaughterhouse_waste", label: "Slaughterhouse waste", unit: "kg/day" },
  { id: "wastewater", label: "Wastewater", unit: "m³/day" },
  { id: "mixed_waste", label: "Mixed waste", unit: "kg/day" },
];

/** Indicative fresh-material availability per unit, per day. Ranges, not guarantees. */
const KG_PER_UNIT: Record<FeedstockId, [number, number]> = {
  cow_manure: [8, 15],
  pig_manure: [2, 4],
  poultry_waste: [0.08, 0.14],
  food_waste: [1, 1],
  human_waste: [0.3, 0.5],
  market_waste: [1, 1],
  slaughterhouse_waste: [1, 1],
  wastewater: [1, 1],
  mixed_waste: [1, 1],
};

/** Indicative biogas yield range in m³ of gas per kg of fresh material. */
const GAS_PER_KG: Record<FeedstockId, [number, number]> = {
  cow_manure: [0.023, 0.04],
  pig_manure: [0.04, 0.06],
  poultry_waste: [0.05, 0.09],
  food_waste: [0.06, 0.13],
  human_waste: [0.02, 0.03],
  market_waste: [0.04, 0.09],
  slaughterhouse_waste: [0.05, 0.1],
  wastewater: [0.005, 0.02],
  mixed_waste: [0.03, 0.08],
};

export type EstimatorInput = {
  feedstocks: { id: FeedstockId; quantity: number }[];
  applications: string[];
  retentionDays?: number;
};

export type EstimatorResult = {
  valid: boolean;
  message?: string;
  freshKgPerDayMin: number;
  freshKgPerDayMax: number;
  gasM3PerDayMin: number;
  gasM3PerDayMax: number;
  digesterM3Min: number;
  digesterM3Max: number;
  technologies: string[];
  assumptions: string[];
};

const round = (n: number, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

export function estimate(input: EstimatorInput): EstimatorResult {
  const empty: EstimatorResult = {
    valid: false,
    freshKgPerDayMin: 0,
    freshKgPerDayMax: 0,
    gasM3PerDayMin: 0,
    gasM3PerDayMax: 0,
    digesterM3Min: 0,
    digesterM3Max: 0,
    technologies: [],
    assumptions: [],
  };

  const entries = input.feedstocks.filter((f) => Number.isFinite(f.quantity) && f.quantity > 0);
  if (entries.length === 0) {
    return { ...empty, message: "Enter a waste quantity before an estimate can be produced." };
  }

  const retention = input.retentionDays ?? 40;
  let kgMin = 0;
  let kgMax = 0;
  let gasMin = 0;
  let gasMax = 0;

  for (const e of entries) {
    const [uMin, uMax] = KG_PER_UNIT[e.id];
    const [gMin, gMax] = GAS_PER_KG[e.id];
    const fMin = e.quantity * uMin;
    const fMax = e.quantity * uMax;
    kgMin += fMin;
    kgMax += fMax;
    gasMin += fMin * gMin;
    gasMax += fMax * gMax;
  }

  // Slurry volume: fresh material mixed roughly 1:1 with water, ~1000 kg per m³.
  const slurryMin = (kgMin * 2) / 1000;
  const slurryMax = (kgMax * 2) / 1000;
  const digesterMin = slurryMin * retention * 1.2;
  const digesterMax = slurryMax * retention * 1.3;

  const technologies: string[] = [];
  if (digesterMax <= 20) technologies.push("Fixed-dome concrete biodigester", "Flexible / PVC biodigester");
  else technologies.push("Fixed-dome concrete biodigester", "Multi-chamber / modular digestion");
  if (entries.some((e) => e.id === "wastewater" || e.id === "human_waste")) {
    technologies.push("Wastewater-treatment biodigester");
  }
  if (entries.some((e) => e.id === "slaughterhouse_waste")) {
    technologies.push("Pre-treatment and effluent compliance study");
  }
  if (input.applications.includes("electricity") || input.applications.includes("chaff_cutting") || input.applications.includes("water_pumping")) {
    technologies.push("Gas filtration and engine conversion package");
  }

  return {
    valid: true,
    freshKgPerDayMin: round(kgMin),
    freshKgPerDayMax: round(kgMax),
    gasM3PerDayMin: round(gasMin, 2),
    gasM3PerDayMax: round(gasMax, 2),
    digesterM3Min: Math.max(4, Math.round(digesterMin)),
    digesterM3Max: Math.max(6, Math.round(digesterMax)),
    technologies: Array.from(new Set(technologies)),
    assumptions: [
      `Hydraulic retention time assumed at ${retention} days for Kenyan ambient temperatures.`,
      "Fresh material mixed with water at approximately 1:1 by volume.",
      "Feedstock availability ranges are typical published values, not site measurements.",
      "Gas yields vary with temperature, dry-matter content, contamination and feeding discipline.",
      "Digester volume includes a 20-30% allowance for gas storage and freeboard.",
    ],
  };
}
