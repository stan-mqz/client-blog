import {
  Link,
  useActionData,
  useSubmit,
  type ActionFunctionArgs,
} from "react-router-dom";
import { ErrorMessage } from "../Components/ErrorMessage";
import { useBlogStore } from "../store/store";
import type { recoverEmailData } from "../types/userTypes";
import { useForm } from "react-hook-form";
import { ErrorFormMessage } from "../Components/ErrorFormMessage";
import { recoverEmail } from "../services/AuthService";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const response = await recoverEmail(data);
  return response?.message 
};

export const RecoverEmail = () => {
  const error = useBlogStore((state) => state.error);
  const submit = useSubmit();

  const message = useActionData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<recoverEmailData>();

  const onSubmit = (data: recoverEmailData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("newEmail", data.newEmail);

    submit(formData, { method: "POST" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
        {message && (
          <p className="text-green-600 font-bold">{message}</p>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-7">Recover E-mail</h1>
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

          {/* newEmail */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">New E-mail</label>
            <input
              {...register("newEmail", {
                required: "New E-mail is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              placeholder="Enter your new e-mail"
              className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.newEmail && (
              <ErrorFormMessage>{errors.newEmail.message}</ErrorFormMessage>
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
          Remember your email?{" "}
          <span className="text-purple-400 cursor-pointer">Sign in here</span>
        </Link>
      </div>
    </div>
  );
};
