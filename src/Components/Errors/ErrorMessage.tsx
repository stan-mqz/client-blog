export const ErrorMessage = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-red-600 text-2xl text-white uppercase p-2 font-bold">
      {children}
    </div>
  )
}