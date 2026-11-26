/**
 * Joshua packages shown on the site (approved 2026-11-26).
 * Packages differ by team size only for now; a per-package feature split is
 * not defined and the Joshua app does not gate modules yet, so the site must
 * not promise feature differences. Setup (implantação) is quoted case by case.
 */
export type Package = {
  id: "standard" | "premium" | "enterprise";
  name: string;
  /** Highest user count covered; null = no upper limit. */
  maxUsers: number | null;
  /** Monthly price in BRL; null = quoted by the sales team. */
  monthly: number | null;
};

export const packages: readonly Package[] = [
  { id: "standard", name: "Standard", maxUsers: 5, monthly: 690 },
  { id: "premium", name: "Premium", maxUsers: 15, monthly: 1490 },
  { id: "enterprise", name: "Enterprise", maxUsers: null, monthly: null },
];

export const startingPackage = packages[0] as Package & { maxUsers: number; monthly: number };

export const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
