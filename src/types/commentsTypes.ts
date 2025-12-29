import { z } from "zod";
import { UserBasicSchema } from "./userTypes";

export const CommentSchema = z.object({
  id_comment: z.number(),
  content_comment: z.string(),
  user_id: z.number(),
  post_id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: UserBasicSchema,
  isOwner: z.boolean(),
});

export const CreateCommentSchema = z.object({
  intent: z.literal("comment-create"),
  content_comment: z.string(),
});

export const UpdateCommentSchema = z.object({
  intent: z.literal("comment-update").optional(),
  id_comment: z.number().nullable(),
  update_comment: z.string().optional(),
});

export const DeleteCommentSchema = z.object({
  intent: z.literal('comment-delete'),
  id_comment: z.number()
})

export const CommentsArraySchema = z.array(CommentSchema);

export type Comment = z.infer<typeof CommentSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type UpdateComment = z.infer<typeof UpdateCommentSchema>;
export type Comments = z.infer<typeof CommentsArraySchema>;

export type CommentAction = CreateComment | UpdateComment;
