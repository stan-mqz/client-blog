
export const VerifyEmail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="flex flex-col items-center gap-4 bg-slate-800 px-10 py-8 rounded-xl shadow-xl text-center w-[32%]">
        <h1 className="text-3xl font-bold text-white">
          Email Verified ✅
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed">
          Your email has been verified correctly.
          <br />
          You can now access your account.  
        </p>
      </div>
    </div>
  );
};
