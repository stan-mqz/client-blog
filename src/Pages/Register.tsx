import { VerificationMessage } from "../Components/VerificationMessage";
import { register } from "../services/AuthService";
import { Form, useActionData, type ActionFunctionArgs } from "react-router-dom";

export const action = async ({ request }: ActionFunctionArgs) => {
  let error;
  const data = Object.fromEntries(await request.formData());

  if (Object.values(data).includes("")) {
    error = "All fields must be filled";
  }

  if (error) {
    return error;
  }

  const { message } = await register(data);

  return message;
};

export const Register = () => {
  const message = useActionData() as string;

  return (
    <>
      {message ? (
        <VerificationMessage
        message={message}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
          <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-7">Sign up</h1>
            </div>

            <Form method="POST" className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your username"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">E-mail</label>
                <input
                  type="email"
                  name="email"
                  className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your e-mail"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2"
              >
                Sign up
              </button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
