import * as yup from "yup";
// Hidden for simplicity
export const generateYupSchema = (keys: string[]) => {
  const schemaObject: any = {};

  keys.forEach((key) => {
    if (key !== "icon") {
      schemaObject[key] = yup.string().required(`${key} is required`);
    }
  });

  return yup.object().shape({ ...schemaObject });
};
