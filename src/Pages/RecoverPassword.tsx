import {
  Link,
  useActionData,
  useSubmit,
  type ActionFunctionArgs,
} from "react-router-dom";
import { useBlogStore } from "../store/store";
import type { recoverPasswordData } from "../types/userTypes";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../Components/ErrorMessage";
import { ErrorFormMessage } from "../Components/ErrorFormMessage";
import { recoverPassword } from "../services/AuthService";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const response = await recoverPassword(data);
  return response?.message;
};

export const RecoverPassword = () => {
  const error = useBlogStore((state) => state.error);
  const submit = useSubmit();
  const message = useActionData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<recoverPasswordData>();

  const onSubmit = (data: recoverPasswordData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("newPassword", data.newPassword);

    submit(formData, { method: "POST" });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
        {message && <p className="text-green-600 font-bold">{message}</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-7">
            Recover Password
          </h1>
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
              className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
            )}
          </div>

          {/* newPassword */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">New Password</label>
            <input
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "The password must be at least 6 characters long",
                },
              })}
              type="password"
              placeholder="Enter your new password"
              className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.newPassword && (
              <ErrorFormMessage>{errors.newPassword.message}</ErrorFormMessage>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2"
          >
            Update
          </button>
        </form>
        <Link to={"/auth/login"} className="text-white">
          Remember your password?{" "}
          <span className="text-purple-400 cursor-pointer">Sign in here</span>
        </Link>
      </div>
    </div>
  );
};
