import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  setAccessToken,
  setCurrentUser,
  setIsAuthenticated,
} from "../../features/auth/authSlice";
import { validate } from "./config/validation";
import { useAppDispatch } from "../../hooks";
import { login } from "../../services/admin";
import InputRegister from "../../components/InputRegister";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(validate),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (data: any) => {
    setLoading(true);
    login(data)
      .then((result: any) => {
        dispatch(setAccessToken(result.data));
        dispatch(setCurrentUser(result.data));
        dispatch(setIsAuthenticated(true));
        navigate("/");
      })
      .catch((errors: any) => {
        dispatch(setAccessToken(null));
        dispatch(setCurrentUser(null));
        dispatch(setIsAuthenticated(false));
        alert("Sai tên đăng nhập hoặc mật khẩu");
        console.log(errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng Nhập Tài Khoản
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <InputRegister
                register={register}
                errMsg={errors?.username?.message}
                isAutoFill={true}
                label={"Tên đăng nhập"}
                name={"username"}
              />
              <InputRegister
                register={register}
                errMsg={errors?.password?.message}
                isAutoFill={true}
                label={"Mật khẩu"}
                name={"password"}
                type="password"
              />
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                    isSubmitting || loading
                      ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400 dark:bg-gray-400 d dark:hover:bg-gray-400 dark:focus:ring-gray-400"
                      : ""
                  }`}
                >
                  Đăng Nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
