export function formatBengaliNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatTaka(value: number): string {
  return `৳${formatBengaliNumber(value)}`;
}

export function formatUnit(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    g: "গ্রাম",
    litre: "লিটার",
    liter: "লিটার",
    l: "লিটার",
    piece: "টি",
    pcs: "টি",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] ?? unit;
}
