type FileInputProps = {
  label: string;
  value?: FileList 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileInput = ({ label, value, onChange }: FileInputProps) => {
  const file = value?.[0];

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-white font-medium">{label}</label>

      <label className="flex items-center gap-4 cursor-pointer group">

        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white transition
          ${file ? "bg-green-600" : "bg-purple-600 group-hover:bg-purple-700"}`}
        >
          {file ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )}

        </div>

        <div
          className={`flex-1 border-b pb-2 transition
          ${file ? "border-green-500" : "border-gray-400 group-hover:border-purple-500"}`}
        >
          <p className={`text-sm truncate ${file ? "text-green-400" : "text-gray-300"}`}>
            {file ? file.name : "Upload your file"}
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
