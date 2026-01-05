import { useSubmit, useNavigation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useBlogStore } from "../store/store";
import type { UserLogin } from "../types/userTypes";
import { AuthForm } from "../Components/UI/AuthForm";
import { Input } from "../Components/UI/Input";
import { ErrorFormMessage } from "../Components/Errors/ErrorFormMessage";

export const Login = () => {
  const error = useBlogStore((state) => state.authError);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const {
    control,
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
    <AuthForm<UserLogin>
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      messages={{
        header: "Sign in",
        error: error,
        submit: "Sign in",
        submitting: 'Signing in...'
      }}
      links={[
        {
          path: "/auth/register",
          message: "Don't have an account yet? ",
          highlight: "Create one here",
        },

        {
          path: "/auth/recover-email",
          message: "Forgot your e-mail? ",
          highlight: "Click here to recover it",
        },

        {
          path: "/auth/recover-password",
          message: "Forgot your password? ",
          highlight: "Click here to recover it",
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
        name="password"
        control={control}
        rules={{
          required: "Password is required",
        }}
        render={({ field }) => (
          <Input
            label="password"
            placeholder="Enter your password"
            type="password"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {errors.password && (
        <ErrorFormMessage>{errors.password.message}</ErrorFormMessage>
      )}
    </AuthForm>
  );
};
