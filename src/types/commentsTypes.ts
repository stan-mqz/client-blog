import { z } from "zod";
import {UserBasicSchema} from './userTypes'


export const CommentSchema = z.object({
  id_comment: z.number(),
  content_comment: z.string(),
  user_id: z.number(),
  post_id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: UserBasicSchema,
  isOwner: z.boolean()
});


export const CreateCommentSchema = z.object({
  content_comment: z.string(),
  post_id: z.number(),
});

export const UpdateCommentSchema = z.object({
  content_comment: z.string(),
});

export const CommentsArraySchema = z.array(CommentSchema);

export type Comment = z.infer<typeof CommentSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type UpdateComment = z.infer<typeof UpdateCommentSchema>;
export type Comments = z.infer<typeof CommentsArraySchema>;