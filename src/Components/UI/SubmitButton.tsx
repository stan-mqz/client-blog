type SubmitButtonProps = {
    text: string
    disabled: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}


export const SubmitButton = ({text,disabled, onClick}:SubmitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full h-10 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colorsdisabled:bg-purple-400 disabled:cursor-not-allowed p-2 uppercase" 
      disabled={disabled}
    >
      {text}
    </button>
  );
};
