export const getRefCodeById = (id?: string) => {
  return id?.split("-")[0] || id || "";
};
