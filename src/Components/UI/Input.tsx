type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  defaultValue?: string
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur?: () => void;
  textarea?: true;
};

export const Input = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  textarea,
  defaultValue
}: InputProps) => {
  return (


    <div className="flex flex-col gap-2 w-full">
      <label className="text-white font-medium">{label}</label>

      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          className="bg-white rounded-lg w-full h-36 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed p-3"
        ></textarea>
      ) : (
        <input
          autoFocus
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      )}
    </div>
  );
};
