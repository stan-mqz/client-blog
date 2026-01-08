import { z } from "zod";
import { UserBasicSchema } from "./userTypes";
import { CommentSchema } from "./commentsTypes";

export const PostSchema = z.object({
  id_post: z.number(),
  title: z.string(),
  content: z.string(),
  image: z.string().nullable(),
  user: UserBasicSchema,
  likesCount: z.number(),
  likedByUser: z.boolean(),
  comments: z.array(CommentSchema),
  isOwner: z.boolean(),
});

export const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z
    .any()
    .optional()
    .refine((files) => !files || files instanceof FileList, "Invalid file")
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.type?.startsWith("image/"),
      "Only image files are allowed"
    ),
});

export const UpdatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  image: z.string().nullable().optional(),
});

export const PostsArraySchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
export type Posts = z.infer<typeof PostsArraySchema>;
