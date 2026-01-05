import {
  useActionData,
  useNavigation,
  useSubmit
} from "react-router-dom";
import { useBlogStore } from "../store/store";
import type { UserRecoverPassword } from "../types/userTypes";
import { Controller, useForm } from "react-hook-form";
import { ErrorFormMessage } from "../Components/Errors/ErrorFormMessage";
import { AuthForm } from "../Components/UI/AuthForm";
import { Input } from "../Components/UI/Input";

export const RecoverPassword = () => {
  const error = useBlogStore((state) => state.authError);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const message = useActionData();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserRecoverPassword>();

  const onSubmit = (data: UserRecoverPassword) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("newPassword", data.newPassword);

    submit(formData, { method: "POST" });
  };
  return (
    <AuthForm<UserRecoverPassword>
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      messages={{
        header: "Recover Password",
        error: error,
        submit: "Update",
        success: message,
        submitting: "Updating...",
      }}
      links={[
        {
          path: "/auth/register",
          message: "Don't have an account yet? ",
          highlight: "Create one here",
        },

        {
          path: "/auth/login",
          message: "Remember your password? ",
          highlight: "Sing in here",
        },
      ]}
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: "E-mail is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
        render={({ field }) => (
          <Input
            label="E-mail"
            placeholder="Enter your e-mail"
            type="text"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {errors.email && (
        <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
      )}

      <Controller
        name="newPassword"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at leat 8 characters long",
          },
        }}
        render={({ field }) => (
          <Input
            label="New Password"
            placeholder="Enter your new password"
            type="password"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {errors.newPassword && (
        <ErrorFormMessage>{errors.newPassword.message}</ErrorFormMessage>
      )}
    </AuthForm>
    // <div className="flex items-center justify-center min-h-screen ">
    //   <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
    //     {message && <p className="text-green-600 font-bold">{message}</p>}
    //     {error && <ErrorMessage>{error}</ErrorMessage>}

    //     <div className="text-center">
    //       <h1 className="text-4xl font-bold text-white mb-7">
    //         Recover Password
    //       </h1>
    //       <Link to={"/auth/register"} className="text-white">
    //         Don't have an account yet?{" "}
    //         <span className="text-purple-400 cursor-pointer">
    //           Create one here
    //         </span>
    //       </Link>
    //     </div>

    //     <form
    //       className="flex flex-col gap-5 w-full"
    //       onSubmit={handleSubmit(onSubmit)}
    //     >
    //       {/* Email */}
    //       <div className="flex flex-col gap-2">
    //         <label className="text-white font-medium">E-mail</label>
    //         <input
    //           {...register("email", {
    //             required: "E-mail is required",
    //             pattern: {
    //               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //               message: "Enter a valid email address",
    //             },
    //           })}
    //           type="email"
    //           placeholder="Enter your e-mail"
    //           className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    //         />
    //         {errors.email && (
    //           <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
    //         )}
    //       </div>

    //       {/* newPassword */}
    //       <div className="flex flex-col gap-2">
    //         <label className="text-white font-medium">New Password</label>
    //         <input
    //           {...register("newPassword", {
    //             required: "New Password is required",
    //             minLength: {
    //               value: 6,
    //               message: "The password must be at least 6 characters long",
    //             },
    //           })}
    //           type="password"
    //           placeholder="Enter your new password"
    //           className="bg-white rounded-lg w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    //         />
    //         {errors.newPassword && (
    //           <ErrorFormMessage>{errors.newPassword.message}</ErrorFormMessage>
    //         )}
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2"
    //       >
    //         Update
    //       </button>
    //     </form>
    //     <Link to={"/auth/login"} className="text-white">
    //       Remember your password?{" "}
    //       <span className="text-purple-400 cursor-pointer">Sign in here</span>
    //     </Link>
    //   </div>
    // </div>
  );
};
