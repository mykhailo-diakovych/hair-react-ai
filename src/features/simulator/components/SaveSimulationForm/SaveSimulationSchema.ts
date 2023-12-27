import * as Yup from "yup";

export const SaveSimulationSchema = Yup.object().shape({
  simulationName: Yup.string().min(1, "Too Short!").required("Required")
});
