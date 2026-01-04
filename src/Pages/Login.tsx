import {
  Link,
  redirect,
  type ActionFunctionArgs,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/AuthService";
import { useBlogStore } from "../store/store";
import { ErrorMessage } from "../Components/Errors/ErrorMessage";
import { ErrorFormMessage } from "../Components/Errors/ErrorFormMessage";
import type { UserLogin } from "../types/userTypes";


export const Login = () => {
  const error = useBlogStore((state) => state.authError);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const onSubmit = (data: UserLogin) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    submit(formData, { method: "POST" });
  };

  return (

    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-7">Sign in</h1>
          <Link to={"/auth/register"} className="text-white">
            Don't have an account yet?{" "}
            <span className="text-purple-400 cursor-pointer">
              Create one here
            </span>
          </Link>
        </div>
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            {errors.email && (
              <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your password"
              className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            {errors.password && (
              <ErrorFormMessage>{errors.password.message}</ErrorFormMessage>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <Link to={"/auth/recover-email"} className="text-white">
          Forgot your e-mail?{" "}
          <span className="text-purple-400 cursor-pointer">
            Click here to recover it
          </span>
        </Link>
        <Link to={"/auth/recover-password"} className="text-white">
          Forgot your password?{" "}
          <span className="text-purple-400 cursor-pointer">
            Click here to recover it
          </span>
        </Link>
      </div>
    </div>
  );
};