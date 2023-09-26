export default function InputRegister(props: {
  register: any;
  errMsg: any;
  isAutoFill: boolean;
  label: string;
  name?: string;
  type?: string;
  disabled?: boolean;
}) {
  const { register, errMsg, isAutoFill, label, name, type, disabled } = props;
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        disabled={disabled}
        autoComplete={`${isAutoFill ? "" : "one-time-code"}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(name)}
      />
      {errMsg && (
        <p className="text-red-400 text-sm font-light whitespace-pre-line">
          {errMsg}
        </p>
      )}
    </div>
  );
}

InputRegister.defaultValue = {
  type: "text",
  disabled: false,
};
