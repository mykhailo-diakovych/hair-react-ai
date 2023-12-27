import { normalizeComponent } from "@helpers/deepar/normalizeValue";

export const convertHexToRGB = (hex: string): number[] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [normalizeComponent(r), normalizeComponent(g), normalizeComponent(b)];
};
