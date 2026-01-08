import { ModalPost } from "./ModalPost";
import { useNavigate, useNavigation, useSubmit } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { Input } from "./Input";
import { Controller, useForm } from "react-hook-form";
import type { CreatePost } from "../../types/postsTypes";
import { ErrorFormMessage } from "../Errors/ErrorFormMessage";
import { FileInput } from "./FileInput";

export const CreatePostModal = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isNavigating = navigation.state !== "idle";
  const isSubmitting = navigation.state === "submitting";

  const {
    handleSubmit,
    control,
    watch,

    formState: { errors },
  } = useForm<CreatePost>();

  const onClose = () => {
    navigate("/home");
  };

//todo: Create legnth validation  
  const title = watch("title");
  const content = watch("content");


  const onSubmit = (data: CreatePost) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (data.image) {
      formData.append("image", data.image[0]);
    }

    submit(formData, { method: "POST", encType: "multipart/form-data" });
  };

  return (
    <>
      {isNavigating ? (
        <LoadingSpinner />
      ) : (
        <ModalPost open={true} onClose={onClose}>
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
                  onChange={(e) => onChange(e.target.files)}
                />
              )}
            />

            <button
              type="submit"
              className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        </ModalPost>
      )}
    </>
  );
};
