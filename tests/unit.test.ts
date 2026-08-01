import { describe, expect, it } from "vitest";
import { estimate } from "../src/lib/estimator";
import { generateReference, leadSchema } from "../src/lib/validation";
import { can } from "../src/lib/rbac";

describe("estimator", () => {
  it("refuses to estimate without a quantity", () => {
    const r = estimate({ feedstocks: [{ id: "cow_manure", quantity: 0 }], applications: [] });
    expect(r.valid).toBe(false);
    expect(r.message).toMatch(/quantity/i);
  });

  it("produces a bounded range with assumptions", () => {
    const r = estimate({ feedstocks: [{ id: "cow_manure", quantity: 5 }], applications: ["cooking"] });
    expect(r.valid).toBe(true);
    expect(r.gasM3PerDayMin).toBeLessThan(r.gasM3PerDayMax);
    expect(r.digesterM3Min).toBeGreaterThan(0);
    expect(r.assumptions.length).toBeGreaterThan(3);
  });

  it("adds engine conversion when electricity is requested", () => {
    const r = estimate({ feedstocks: [{ id: "pig_manure", quantity: 20 }], applications: ["electricity"] });
    expect(r.technologies.join(" ")).toMatch(/engine conversion/i);
  });
});

describe("validation", () => {
  it("rejects a lead without a phone number", () => {
    expect(leadSchema.safeParse({ fullName: "Jane Doe" }).success).toBe(false);
  });

  it("accepts a minimal valid lead", () => {
    expect(leadSchema.safeParse({ fullName: "Jane Doe", phone: "0700000000" }).success).toBe(true);
  });

  it("generates a reference in the HBK format", () => {
    expect(generateReference(new Date("2026-03-04"), 0.5)).toMatch(/^HBK-2026\d{2}-[0-9A-Z]{3,}$/);
  });
});

describe("permissions", () => {
  it("prevents a viewer from publishing", () => {
    expect(can("viewer", "projects.publish")).toBe(false);
  });
  it("allows a technical reviewer to approve", () => {
    expect(can("technical_reviewer", "projects.approve_technical")).toBe(true);
  });
  it("restricts user management to super admins", () => {
    expect(can("administrator", "users.manage")).toBe(false);
    expect(can("super_admin", "users.manage")).toBe(true);
  });
});
