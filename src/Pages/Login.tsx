import {
  Form,
  Link,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router-dom";
import { login } from "../services/AuthService";
import { ErrorMessage } from "../Components/ErrorMessage";
import { useGlobalStore } from "../store/store";

export const action = async ({ request }: ActionFunctionArgs) => {
  let error;
  const data = Object.fromEntries(await request.formData());

  if (Object.values(data).includes("")) {
    error = "All fields must be filled";
  }

  if (error) {
    return error;
  }

  const user = await login(data);
  useGlobalStore.getState().setUserData(user);

  return redirect("/");
};

export const Login = () => {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-7">Sign in</h1>
            <Link to={"auth/register"} className="text-white">
              Don't have an account yet?{" "}
              <span className="text-purple-400 cursor-pointer">
                Create one here
              </span>
            </Link>
          </div>

          <Form className="flex flex-col gap-5 w-full" method="POST">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">E-mail</label>
              <input
                type="email"
                className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your e-mail"
                name="email"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Password</label>
              <input
                type="password"
                className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                name="password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2"
            >
              Sign in
            </button>
          </Form>

          <p className="text-white">
            Forgot your e-mail? {""}{" "}
            <span className="text-purple-400 cursor-pointer">
              Click here to recover it
            </span>
          </p>
          <p className="text-white">
            Forgot your password? {""}{" "}
            <span className="text-purple-400 cursor-pointer">
              Click here to recover it
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
