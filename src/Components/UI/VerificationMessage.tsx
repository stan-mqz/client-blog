import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


export const VerificationMessage = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      navigate('/auth/login')
    }
  })

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="flex flex-col items-center gap-4 bg-slate-800 px-10 py-8 rounded-xl shadow-xl text-center w-[32%]">
          <h1 className="text-3xl font-bold text-white">Operation Succesful</h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            {location.state}
          </p>

          <Link
            to="/auth/login"
            className="inline-block bg-purple-600 text-white font-semibold rounded-lg px-6 py-3 mt-4 hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
};
