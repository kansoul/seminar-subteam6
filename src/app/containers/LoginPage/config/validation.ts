import * as yup from "yup";

export const validate = yup.object().shape({
  username: yup.string().required("Hãy nhập username của bạn"),
  password: yup.string().required("Hãy nhập password của bạn"),
});
