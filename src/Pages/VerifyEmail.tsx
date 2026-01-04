import { Link, useLoaderData } from "react-router-dom";


export const VerifyEmail = () => {
  const result = useLoaderData();


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-800 px-10 py-8 rounded-xl shadow-xl text-center w-[32%]">
        <h1 className="text-3xl font-bold text-white mb-4">
          {result ? "Email Verified ✅" : "Verification Failed ❌"}
        </h1>

        {result && (
          <Link
            to="/auth/login"
            className="inline-block bg-purple-600 text-white font-semibold rounded-lg px-6 py-3 mt-4 hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
};
