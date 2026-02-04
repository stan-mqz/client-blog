import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useBlogStore } from "../store/store";
import type { UserRecoverEmail } from "../types/userTypes";
import { Controller, useForm } from "react-hook-form";
import { ErrorFormMessage } from "../Components/Errors/ErrorFormMessage";
import { AuthForm } from "../Components/UI/AuthForm";
import { Input } from "../Components/UI/Input";

export const RecoverEmail = () => {
  const error = useBlogStore((state) => state.authError);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const message = useActionData();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserRecoverEmail>();

  const onSubmit = (data: UserRecoverEmail) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("newEmail", data.newEmail);

    submit(formData, { method: "POST" });
  };

  return (
    <AuthForm<UserRecoverEmail>
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      messages={{
        header: "Recover E-mail",
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
          message: "Remember your e-mail? ",
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
        name="newEmail"
        control={control}
        rules={{
          required: "new E-mail is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
        render={({ field }) => (
          <Input
            label="New E-mail"
            placeholder="Enter your new email"
            type="email"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {errors.newEmail && (
        <ErrorFormMessage>{errors.newEmail.message}</ErrorFormMessage>
      )}
    </AuthForm>

  
  );
};
