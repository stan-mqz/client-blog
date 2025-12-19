import { VerificationMessage } from "../Components/VerificationMessage";
import { register } from "../services/AuthService";
import {
  Link,
  useActionData,
  useSubmit,
  type ActionFunctionArgs,
} from "react-router-dom";
import { useBlogStore } from "../store/store";
import { ErrorMessage } from "../Components/ErrorMessage";
import { useForm } from "react-hook-form";
import type { UserRegister } from "../types/userTypes";
import { ErrorFormMessage } from "../Components/ErrorFormMessage";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  const response = await register(data);

  return response?.message
};

export const Register = () => {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>();

  const onSubmit = (data: UserRegister) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    submit(formData, { method: "POST" });
  };

  const message = useActionData();
  const error = useBlogStore((state) => state.authError);
  return (
    <>
      {message ? (
        <VerificationMessage message={message} />
      ) : (
        <>
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-7">Sign up</h1>
              </div>
              <Link to={"/auth/login"} className="text-white">
                Already have an account?{" "}
                <span className="text-purple-400 cursor-pointer">
                  Sign in here
                </span>
              </Link>
              <form
                className="flex flex-col gap-5 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-2">
                  <label className="text-white font-medium">Username</label>
                  <input
                    {...register("username", {
                      required: "You must introduce a username",
                      minLength: {
                        value: 3,
                        message:
                          "The username must be at least 3 characters long",
                      },
                    })}
                    type="text"
                    name="username"
                    className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <ErrorFormMessage>
                      {errors.username.message}
                    </ErrorFormMessage>
                  )}
                </div>

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
                    name="email"
                    className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your e-mail"
                  />
                  {errors.email && (
                    <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white font-medium">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "The password must be at least 6 characters long",
                      },
                    })}
                    type="password"
                    name="password"
                    className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <ErrorFormMessage>
                      {errors.password.message}
                    </ErrorFormMessage>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
