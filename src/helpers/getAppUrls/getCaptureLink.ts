export const getCaptureLink = (id?: string) => {
  return `https://${import.meta.env.VITE_BASE_HOST}/client/${id}`;
};
