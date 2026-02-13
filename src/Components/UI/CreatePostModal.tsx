import { ModalPost } from "./ModalPost";
import { useNavigate, useNavigation, useSubmit } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { Input } from "./Input";
import { Controller, useForm } from "react-hook-form";
import type { CreatePost } from "../../types/postsTypes";
import { ErrorFormMessage } from "../Errors/ErrorFormMessage";
import { FileInput } from "./FileInput";
import { useBlogStore } from "../../store/store";
import { ErrorMessage } from "../Errors/ErrorMessage";
import { SubmitButton } from "./SubmitButton";

export const CreatePostModal = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isNavigating = navigation.state !== "idle";
  const isSubmitting = navigation.state === "submitting";
  const postError = useBlogStore(state => state.postError)

  const {
    handleSubmit,
    control,
    watch,

    formState: { errors },
  } = useForm<CreatePost>();

  const onClose = () => {
    navigate("/home");
  };

  const title = watch("title") || '';
  const titleLength = title.length
  const content = watch("content") || '';
  const contentLength = content.length

  const onSubmit = (data: CreatePost) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (data.image) {
      formData.append("image", data.image);
    }

    submit(formData, { method: "POST", encType: "multipart/form-data" });
  };

  return (
    <>
      {isNavigating ? (
        <LoadingSpinner />
      ) : (
        <ModalPost open={true} onClose={onClose}>
          {postError && <ErrorMessage>{postError}</ErrorMessage>}
          <h1 className="text-center text-white text-2xl m-6 uppercase font-bold">
            Create Post
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-10 w-[90%] mx-auto min-h-96 max-h-[95%]"
          >
            <div className="space-y-2">
              <Controller
                control={control}
                name="title"
                rules={{
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long",
                  },

                  maxLength: {
                    value: 100,
                    message: "Title lenght can't be longer than 100 characters",
                  },
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="Title"
                    type="text"
                    placeholder="Write the title of the post"
                  />
                )}
              />

              <p
                className={` ${
                  titleLength > 100 ? "text-red-600" : "text-white"
                }`}
              >
                {titleLength}/100
              </p>

              {errors.title && (
                <ErrorFormMessage>{errors.title.message}</ErrorFormMessage>
              )}
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                rules={{
                  required: "Content is required",
                  minLength: {
                    value: 10,
                    message: "Content must be at least 10 characters long",
                  },

                  maxLength: {
                    value: 500,
                    message:
                      "Content lenght can't be longer than 500 characters",
                  },
                }}
                name="content"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="Content"
                    type="text"
                    placeholder="Write the content of the post"
                    textarea={true}
                  />
                )}
              />

              <p
                className={` ${
                  contentLength > 500 ? "text-red-600" : "text-white"
                }`}
              >
                {contentLength}/500
              </p>

              {errors.content && (
                <ErrorFormMessage>{errors.content.message}</ErrorFormMessage>
              )}
            </div>

            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <FileInput
                  label="Image"
                  value={value}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              )}
            />


            <SubmitButton
            text='Create Post'
            disabled={isSubmitting}
            />

          </form>
        </ModalPost>
      )}
    </>
  );
};
