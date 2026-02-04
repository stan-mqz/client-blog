import type { Post } from "../../types/postsTypes";
import { useForm } from "react-hook-form";
import type { CommentAction, UpdateComment } from "../../types/commentsTypes";
import { ErrorFormMessage } from "./../Errors/ErrorFormMessage";
import { useNavigation, useSubmit } from "react-router-dom";
import { useBlogStore } from "../../store/store";
import { ErrorMessage } from "./../Errors/ErrorMessage";
import { useState } from "react";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { SubmitButton } from "./SubmitButton";

type CommentsProps = {
  post: Post;
};

export const Comments = ({ post }: CommentsProps) => {
  const [updatingComment, setUpdatingComment] = useState<UpdateComment>({
    id_comment: null,
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const submit = useSubmit();
  const commentError = useBlogStore((state) => state.commentError);
  const avatar = useBlogStore((state) => state.userData?.avatar);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CommentAction>();

  const contentComment = watch("content_comment") || "";
  const commentLength = contentComment.length;
  const editContentComment = watch("update_comment") || "";
  const editCommentLength = editContentComment.length;

  const onSubmit = (data: CommentAction) => {
    const formData = new FormData();

    if (data.intent === "comment-create") {
      formData.append("intent", "comment-create");
      formData.append("content_comment", data.content_comment);
      formData.append("id_post", String(post.id_post));
    }

    if (data.intent === "comment-update") {
      formData.append("intent", "comment-update");
      formData.append("update_comment", data.update_comment!);
      formData.append("id_comment", String(data.id_comment));
    }

    submit(formData, { method: "POST" });

    reset();
    setUpdatingComment({ id_comment: null, update_comment: "" });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <ConfirmDeleteModal
          open={openDeleteModal}
          onCancel={() => {
            setOpenDeleteModal(false);
            setDeleteTarget(null);
          }}
          onConfirm={() => {
            if (!deleteTarget) return;

            const formData = new FormData();
            formData.append("intent", "comment-delete");
            formData.append("id_comment", String(deleteTarget));

            submit(formData, { method: "POST" });

            setOpenDeleteModal(false);
            setDeleteTarget(null);
          }}
        />

        <input type="hidden" {...register("intent")} />
        <input
          type="hidden"
          {...register("id_comment", { valueAsNumber: true })}
        />

        {!updatingComment.id_comment && (
          <>
            <label className="text-white font-bold mb-2 block text-sm sm:text-base">
              Got something to say?
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="w-10 sm:w-12 shrink-0">
                <img
                  src={avatar}
                  alt="user avatar"
                  className="w-full rounded-full"
                />
              </div>

              <input
                {...register("content_comment", {
                  required: "Content is required",
                  minLength: { value: 1, message: "Min 1 character" },
                  maxLength: { value: 100, message: "Max 100 characters" },
                })}
                className="flex-1 w-full bg-slate-700 p-2 rounded-md text-white text-sm sm:text-base"
                placeholder="Add a new comment here"
              />

              <div className="">
                <SubmitButton
                  text="Create Comment"
                  disabled={isSubmitting}
                  onClick={() => setValue("intent", "comment-create")}
                />
              </div>
            </div>

            <p
              className={`pl-0 sm:pl-16 mt-1 text-xs sm:text-sm ${
                commentLength > 100 ? "text-red-600" : "text-white"
              }`}
            >
              {commentLength}/100
            </p>
            {"content_comment" in errors && errors.content_comment && (
              <div className="pl-0 sm:pl-14">
                <ErrorFormMessage>
                  {errors.content_comment.message}
                </ErrorFormMessage>
              </div>
            )}
          </>
        )}

        {updatingComment.id_comment && (
          <>
            <div className="pl-0 sm:pl-16 mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <input
                {...register("update_comment", {
                  required: "Content is required",
                  minLength: { value: 1, message: "Min 1 character" },
                  maxLength: { value: 100, message: "Max 100 characters" },
                })}
                className="flex-1 w-full bg-slate-700 p-2 rounded-md text-white text-sm sm:text-base"
              />

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setValue("intent", "comment-update");
                    handleSubmit(onSubmit)();
                  }}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none bg-purple-600 text-white px-3 sm:px-4 py-2 uppercase font-bold rounded-md disabled:bg-purple-400 cursor-pointer text-xs sm:text-base"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setUpdatingComment({
                      id_comment: null,
                      update_comment: "",
                    });
                  }}
                  className="flex-1 sm:flex-none bg-red-600 text-white px-3 sm:px-4 py-2 uppercase font-bold rounded-md disabled:bg-purple-400 cursor-pointer text-xs sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
            <p
              className={`pl-0 sm:pl-16 mt-1 text-xs sm:text-sm ${
                editCommentLength > 100 ? "text-red-600" : "text-white"
              }`}
            >
              {editCommentLength}/100
            </p>
            {"update_comment" in errors && errors.update_comment && (
              <div className="pl-0 sm:pl-16">
                <ErrorFormMessage>
                  {errors.update_comment.message}
                </ErrorFormMessage>
              </div>
            )}
          </>
        )}
      </form>

      <h2 className="text-white text-center uppercase font-bold mt-8 sm:mt-10 text-base sm:text-lg">
        Comments Section
      </h2>

      {commentError && <ErrorMessage>{commentError}</ErrorMessage>}

      {post.comments.length === 0 ? (
        <p className="ml-0 sm:ml-16 mt-5 text-gray-400 text-sm sm:text-base text-center sm:text-left">
          No comments yet
        </p>
      ) : (
        post.comments.map((comment) => (
          <div key={comment.id_comment} className="ml-0 sm:ml-16 mt-4 sm:mt-5">
            <div className="bg-slate-700 p-2 sm:p-3 rounded-md flex gap-2 sm:gap-3">
              <img
                src={comment.user.avatar}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm sm:text-base truncate">
                  {comment.user.username}
                </p>
                <p className="text-white text-xs sm:text-base wrap-break-word">
                  {comment.content_comment}
                </p>
              </div>
            </div>

            {comment.isOwner && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUpdatingComment({ id_comment: comment.id_comment });
                    setValue("update_comment", comment.content_comment);
                    setValue("id_comment", comment.id_comment);
                    setValue("intent", "comment-update");
                  }}
                  className="text-purple-600 font-bold uppercase text-xs sm:text-sm cursor-pointer text-left"
                >
                  Edit Comment
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(comment.id_comment);
                    setOpenDeleteModal(true);
                  }}
                  className="text-red-600 font-bold uppercase text-xs sm:text-sm cursor-pointer text-left"
                >
                  Delete Comment
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
};
