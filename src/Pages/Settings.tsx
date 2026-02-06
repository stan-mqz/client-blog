import { Controller, useForm } from "react-hook-form";
import { Input } from "../Components/UI/Input";
import { SubmitButton } from "../Components/UI/SubmitButton";
import { FileInput } from "../Components/UI/FileInput";
import type {
  UpdateUserEmail,
  UpdateUserName,
  UpdatePassword,
  UpdateAvatar,
} from "../types/userTypes";
import { ErrorFormMessage } from "../Components/Errors/ErrorFormMessage";

export const Settings = () => {
  const {
    control: controlUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: errorsUsername },
  } = useForm<UpdateUserName>();

  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm<UpdateUserEmail>();

  /* Formularios faltantes */
  const {
    control: controlAvatar,
    handleSubmit: handleSubmitAvatar,
    formState: { errors: errorsAvatar },
  } = useForm<UpdateAvatar>();

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm<UpdatePassword>();

  const onSubmitUsername = (data: UpdateUserName) => {
    console.log(data);
  };

  const onSubmitEmail = (data: UpdateUserEmail) => {
    console.log(data);
  };

  const onSubmitAvatar = (data: UpdateAvatar) => {
    console.log(data);
  };

  const onSubmitPassword = (data: UpdatePassword) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="mt-10 space-y-16">
        <h1 className="text-white font-bold text-4xl">User Profile Settings</h1>

        {/* USERNAME */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">
            Upadate User Information
          </h2>

          <form
            onSubmit={handleSubmitUsername(onSubmitUsername)}
            className="space-y-5"
          >
            <Controller
              name="username"
              control={controlUsername}
              rules={{
                required: "New username is required",
                minLength: {
                  value: 3,
                  message:
                    "The new username must be at least 3 characters long",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your new username"
                  label="Change username"
                />
              )}
            />

            {errorsUsername.username && (
              <ErrorFormMessage>
                {errorsUsername.username.message}
              </ErrorFormMessage>
            )}

            <SubmitButton text="update username" disabled={false} />
          </form>

          {/* EMAIL */}
          <form
            onSubmit={handleSubmitEmail(onSubmitEmail)}
            className="space-y-5"
          >
            <Controller
              name="email"
              control={controlEmail}
              rules={{
                required: "New e-mail is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your new e-mail"
                  label="Change E-mail"
                />
              )}
            />

            {errorsEmail.email && (
              <ErrorFormMessage>{errorsEmail.email.message}</ErrorFormMessage>
            )}

            <SubmitButton text="update e-mail" disabled={false} />
          </form>
        </div>

        {/* AVATAR */}
        <form
          onSubmit={handleSubmitAvatar(onSubmitAvatar)}
          className="space-y-5"
        >
          <h2 className="text-white font-bold text-xl">Upadate Avatar</h2>

          <Controller
            name="image"
            control={controlAvatar}
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, value } }) => (
              <FileInput
                value={value}
                label="Image"
                onChange={(e) => onChange(e.target.files)}
              />
            )}
          />

          {errorsAvatar.image && (
            <ErrorFormMessage>{errorsAvatar.image.message}</ErrorFormMessage>
          )}

          <SubmitButton text="update avatar" disabled={false} />
        </form>

        {/* PASSWORD */}
        <form
          onSubmit={handleSubmitPassword(onSubmitPassword)}
          className="space-y-5"
        >
          <h2 className="text-white font-bold text-xl">Upadate Password</h2>

          <Controller
            name="email"
            control={controlPassword}
            rules={{ required: "E-mail is required" }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Enter your e-mail"
                label="E-mail"
              />
            )}
          />

          {errorsPassword.email && (
            <ErrorFormMessage>{errorsPassword.email.message}</ErrorFormMessage>
          )}

          <Controller
            name="currentPassword"
            control={controlPassword}
            rules={{ required: "Current password is required" }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Enter your current password"
                label="Current Password"
              />
            )}
          />

          <Controller
            name="newPassword"
            control={controlPassword}
            rules={{
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Enter your new password"
                label="New Password"
              />
            )}
          />

          {errorsPassword.newPassword && (
            <ErrorFormMessage>
              {errorsPassword.newPassword.message}
            </ErrorFormMessage>
          )}

          <SubmitButton text="update password" disabled={false} />
        </form>
      </div>
    </div>
  );
};
