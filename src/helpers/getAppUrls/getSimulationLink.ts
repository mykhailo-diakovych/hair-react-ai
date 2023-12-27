export function getSimulationLink(refCode: string, simulationId: string) {
  return `https://${
    import.meta.env.VITE_BASE_HOST
  }/simulation/preview/${refCode}?simulationId=${simulationId}`;
}
