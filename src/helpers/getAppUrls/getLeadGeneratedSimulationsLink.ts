export function getLeadGeneratedSimulationsLink(patientId: string) {
  return `https://${
    import.meta.env.VITE_BASE_HOST
  }/client/simulations/${patientId}`;
}
