import * as Yup from "yup";

export const CreateNewModelSchema = Yup.object().shape({
  model: Yup.string().required("Required")
});
