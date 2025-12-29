import { Typography } from "@mui/material";
import type { Post } from "../types/postsTypes";
import {
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import { useFetcher } from "react-router-dom";
import { Comments } from "./Comments";
import { ModalPost } from "./ModalPost";

type PostDetailsProps = {
  post: Post;
};

export const PostDetails = ({ post }: PostDetailsProps) => {
  const likedByUser = post.likedByUser;
  const likesCount = post.likesCount;
  const fetcher = useFetcher();

  return (
    <ModalPost>
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-600">
            <img
              className="w-full h-full object-cover"
              src={post.user.avatar}
              alt={`${post.user.username} avatar`}
            />
          </div>

          <div>
            <p className="text-white font-semibold text-lg">
              {post.user.username}
            </p>
          </div>
        </div>

        <Typography
          component="h2"
          className="text-2xl font-bold text-white mb-3 leading-tight"
        >
          {post.title}
        </Typography>

        <Typography className="text-slate-300 leading-relaxed mb-4">
          {post.content}
        </Typography>
      </div>

      {post.image && (
        <div className="px-6 pb-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full max-h-[70vh] object-contain rounded-lg bg-black"
          />
        </div>
      )}

      <div className="flex items-center justify-between px-6 pb-5">
        <div className="flex items-center gap-4">
          <fetcher.Form method="POST">
            <input type="hidden" name="id" value={post.id_post} />

            <button type="submit" disabled={fetcher.state === "submitting"}>
              {likedByUser ? (
                <>
                  <input type="hidden" name="intent" value="unlike" />
                  <HeartIconSolid className="size-8 text-purple-600 cursor-pointer transition-transform duration-200 group-hover:scale-110" />
                </>
              ) : (
                <>
                  <input type="hidden" name="intent" value="like" />
                  <HeartIcon className="size-8 text-white cursor-pointer transition-all duration-200 group-hover:scale-110 group-hover:text-purple-600" />
                </>
              )}
            </button>

            <span
              className={`text-sm font-semibold tracking-wide ${
                likedByUser ? "text-purple-500" : "text-slate-300"
              }`}
            >
              {likesCount}
            </span>
          </fetcher.Form>

          <div className="flex items-center gap-1 group">
            <ChatBubbleLeftEllipsisIcon className="size-7 text-white cursor-pointer transition-all duration-200 group-hover:scale-110 group-hover:text-purple-600" />
          </div>
        </div>
      </div>
      <div className="pl-6 pb-5 w-[96%]">
        <Comments post={post} />
      </div>
    </ModalPost>
  );
};
