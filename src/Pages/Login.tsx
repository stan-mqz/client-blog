import { Link, redirect, type ActionFunctionArgs, useSubmit } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/AuthService";
import { useGlobalStore } from "../store/store";
import { ErrorMessage } from "../Components/ErrorMessage";
import { ErrorFormMessage } from "../Components/ErrorFormMessage";
import type { loginData } from "../types";


export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData()) 

  const user = await login(data);
  useGlobalStore.getState().setUserData(user);

  return redirect("/");
};

export const Login = () => {
  const error = useGlobalStore((state) => state.error);
  const submit = useSubmit(); 

  const { register, handleSubmit, formState: { errors } } = useForm<loginData>();

  const onSubmit = (data: loginData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    submit(formData, { method: "POST" }); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-7">Sign in</h1>
          <Link to={"/auth/register"} className="text-white">
            Don't have an account yet?{" "}
            <span className="text-purple-400 cursor-pointer">Create one here</span>
          </Link>
        </div>

        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">E-mail</label>
            <input
              {...register("email", {
                required: "E-mail is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              placeholder="Enter your e-mail"
              className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your password"
              className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <ErrorFormMessage>{errors.password.message}</ErrorFormMessage>}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
