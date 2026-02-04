import { type FieldValues, type UseFormHandleSubmit } from "react-hook-form";
import { ErrorMessage } from "../Errors/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import { SubmitButton } from "./SubmitButton";

export type NavLinkConfig = {
  path: string;
  message: string;
  highlight?: string;
};

export type Messages = {
  header: string;
  submit: string;
  error?: string;
  success?: string;
  submitting: string;
};

export type AuthFormProps<T extends FieldValues> = {
  onSubmit: (data: T) => void;
  handleSubmit: UseFormHandleSubmit<T>;
  isSubmitting: boolean;
  children: ReactNode;
  messages: Messages;
  links?: NavLinkConfig[];
};

export function AuthForm<T extends FieldValues>({
  onSubmit,
  handleSubmit,
  isSubmitting,
  children,
  messages,
  links,
}: AuthFormProps<T>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (messages.success) {
      navigate("/auth/success", { state: messages.success });
    }
  }, [messages.success, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col gap-6 w-[30%] items-center py-12 px-8 rounded-lg bg-slate-800 shadow-xl">
          {messages.error && <ErrorMessage>{messages.error}</ErrorMessage>}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-7">
              {messages.header}
            </h1>
            {links?.[0] && (
              <Link to={links[0].path} className="text-white">
                {links[0].message}
                {links[0].highlight && (
                  <span className="text-purple-400 cursor-pointer">
                    {links[0].highlight}
                  </span>
                )}
              </Link>
            )}
          </div>

          <form
            className="flex flex-col space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {children}

            <SubmitButton
              text={`${isSubmitting ? messages.submitting : messages.submit}`}
              disabled={isSubmitting}
              onClick={() => console.log('Hello')}
            />
          </form>

          {links?.[1] && (
            <Link to={links[1].path} className="text-white">
              {links[1].message}
              {links[1].highlight && (
                <span className="text-purple-400 cursor-pointer">
                  {links[1].highlight}
                </span>
              )}
            </Link>
          )}

          {links?.[2] && (
            <Link to={links[2].path} className="text-white">
              {links[2].message}
              {links[2].highlight && (
                <span className="text-purple-400 cursor-pointer">
                  {links[2].highlight}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
