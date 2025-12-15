export const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">

          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-7">Sign in</h1>
            <p className="text-white">Don't have an account yet? {" "}
              <span className="text-purple-400 cursor-pointer">Create one here</span>
            </p>
          </div>

          <form className="flex flex-col gap-5 w-full">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Email</label>
              <input
                type="email"
                className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your E-mail"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Password</label>
              <input
                type="password"
                className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2"
            >
              Sign in
            </button>
          </form>

          <p className="text-white">Forgot your e-mail? {''} <span className="text-purple-400 cursor-pointer" >Click here to recover it</span></p>
          <p className="text-white">Forgot your password? {''} <span className="text-purple-400 cursor-pointer">Click here to recover it</span></p>
        </div>
      </div>
    </>
  );
};