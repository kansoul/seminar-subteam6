import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputRegister from "../InputRegister";
import { generateYupSchema } from "./config/validation";
import { useState } from "react";

export default function Modal(props: {
  onClose: (created?: boolean) => void;
  apiModal: any;
  dataKey: string[];
  isUser?: boolean;
}) {
  const { onClose, apiModal, dataKey, isUser } = props;
  const [iconImg, setIconImg] = useState<any>({});
  const handleDefaultValue = (arr: string[]) => {
    const obj = arr.reduce((acc: any, key) => {
      acc[key] = "";
      return acc;
    }, {});
    return obj;
  };
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(generateYupSchema(dataKey)),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: handleDefaultValue(dataKey),
  });

  const onImageChange = (event: any) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        setIconImg({
          ...iconImg,
          img: reader.result,
          file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateData = (data: any) => {
    if (isUser) {
      apiModal(data)
        .then(() => {
          onClose(true);
        })
        .catch(() => {
          alert("Có lỗi xảy ra!");
        });
    } else {
      const formData = new FormData();
      Object.keys(data).map((key) => {
        formData.append(key, data[key]);
      });
      formData.append("icon", iconImg.file);
      apiModal(formData)
        .then(() => {
          onClose(true);
        })
        .catch(() => {
          alert("Có lỗi xảy ra!");
        });
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 w-full h-full md:inset-0 bg-[#08080884] flex flex-col">
      <div className="relative mx-auto bg-white rounded-lg shadow dark:bg-gray-700 mt-8 pb-8 w-[600px]">
        <div className="flex justify-end pt-2 pr-6">
          <button
            type="button"
            onClick={() => onClose()}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="flex items-start justify-center pb-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            TẠO MỚI DATA
          </h3>
        </div>

        <form className="px-12 mt-3" onSubmit={handleSubmit(handleCreateData)}>
          {dataKey.map((value, index) => (
            <div className="mb-6" key={index}>
              {value !== "icon" ? (
                <InputRegister
                  register={register}
                  errMsg={errors?.[value]?.message}
                  isAutoFill={false}
                  label={value}
                  name={value}
                  type={value === "password" ? "password" : "text"}
                />
              ) : (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    icon
                  </label>
                  <input
                    onChange={onImageChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="file"
                  />
                  {iconImg.img && (
                    <img
                      alt="demo"
                      src={iconImg.img}
                      width={200}
                      height={200}
                    />
                  )}
                </>
              )}
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
