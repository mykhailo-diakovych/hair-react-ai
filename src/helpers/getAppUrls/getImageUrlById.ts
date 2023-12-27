import { getRefCodeById } from "@helpers/getRefCodeById";
import { CLINIC_STORAGE_KEY } from "@config/constants";

export const getImageUrlById = (id: string, isPublic = true): string => {
  const clinicId = localStorage.getItem(CLINIC_STORAGE_KEY) || "";
  const clinicRefCode = getRefCodeById(clinicId);

  return `https://hair-${
    import.meta.env.VITE_MODE || "dev"
  }-public-779851926111-eu-west-2.s3.eu-west-2.amazonaws.com/media/images/${
    isPublic ? "" : clinicRefCode + "/"
  }${id}.png`;
};
