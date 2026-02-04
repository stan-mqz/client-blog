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
  
  );
};
