import { DENSITIES_VALUES } from "@config/constants";

export const getSectionDensitiesArray = (
  sectionDensity: number,
  length = 9
) => {
  let sectionDensityIndex = DENSITIES_VALUES.findIndex(
    (density) => density === sectionDensity
  );
  const sectionDensitites = new Array(length).fill(0);

  for (let i = length - 1; i >= 0; i--) {
    sectionDensitites[i] = DENSITIES_VALUES[sectionDensityIndex];
    sectionDensityIndex = Math.max(sectionDensityIndex - 1, 0);
  }

  // generated 9 densities by default: [0, 0, 1200, 1500, 1800, 2100, 2400, 2700, 3000]
  return sectionDensitites;
};
