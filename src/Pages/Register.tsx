import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useBlogStore } from "../store/store";
import { Controller, useForm } from "react-hook-form";
import type { UserRegister } from "../types/userTypes";
import { AuthForm } from "../Components/UI/AuthForm";
import { Input } from "../Components/UI/Input";
import { ErrorFormMessage } from "../Components/Errors/ErrorFormMessage";

export const Register = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const {
    handleSubmit,
    control,

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
      <AuthForm<UserRegister>
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        messages={{
          header: "Sign up",
          success: message,
          error: error,
          submit: "Sign up",
          submitting: 'Signing up...'
        }}
        links={[
          {
            path: "/auth/login",
            message: "Already have an account? ",
            highlight: "Sign in here",
          },
        ]}
      >
        <Controller
          control={control}
          name="username"
          rules={{
            required: "You must introduce a username",
            minLength: {
              value: 3,
              message: "The username must be at least 3 characters long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Username"
              placeholder="Enter your username"
              type="text"
            />
          )}
        />

        {errors.username && (
          <ErrorFormMessage>{errors.username.message}</ErrorFormMessage>
        )}

        <Controller
          control={control}
          name="email"
          rules={{
            required: "E-mail is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="E-mail"
              placeholder="Enter your e-mail"
              type="email"
            />
          )}
        />

        {errors.email && (
          <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
        )}

        <Controller
          control={control}
          name="password"
          rules={{
            required: "You must introduce a password",
            minLength: {
              value: 8,
              message: "The password must be at least 8 characters long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          )}
        />

        {errors.password && (
          <ErrorFormMessage>{errors.password.message}</ErrorFormMessage>
        )}
      </AuthForm>
    </>
  );
};
