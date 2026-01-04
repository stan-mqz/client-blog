import { Typography } from "@mui/material";
import type { Post } from "../../types/postsTypes";
import {
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import { useFetcher } from "react-router-dom";
import { Comments } from "./Comments";
import { ModalPost } from "./ModalPost";
import { useEffect, useState } from "react";

type PostDetailsProps = {
  post: Post;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostDetails = ({ post, open, setOpen }: PostDetailsProps) => {
  const fetcher = useFetcher();

  const [liked, setLiked] = useState(post.likedByUser);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  useEffect(() => {
    setLiked(post.likedByUser);
    setLikesCount(post.likesCount);
  }, [post.id_post,post.likedByUser, post.likesCount]);

  useEffect(() => {

    if (fetcher.state === "idle" && fetcher.data?.success) {
      setLiked(fetcher.data.liked);
      setLikesCount(fetcher.data.likesCount);
    }
  }, [fetcher.state, fetcher.data]);

  const intent = liked ? "unlike" : "like";

  return (
    <ModalPost open={open} setOpen={setOpen}>
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-600">
            <img
              className="w-full h-full object-cover"
              src={post.user.avatar}
              alt={`${post.user.username} avatar`}
            />
          </div>

          <p className="text-white font-semibold text-lg">
            {post.user.username}
          </p>
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
          <fetcher.Form
            method="POST"
            onSubmit={() => {
              setLiked(!liked);
              setLikesCount((c) => (liked ? c - 1 : c + 1));
            }}
          >
            <input type="hidden" name="id" value={post.id_post} />
            <input type="hidden" name="intent" value={intent} />

            <button type="submit">
              {liked ? (
                <HeartIconSolid className="size-8 text-purple-600 cursor-pointer transition-transform duration-200 hover:scale-110" />
              ) : (
                <HeartIcon className="size-8 text-white cursor-pointer transition-all duration-200 hover:scale-110 hover:text-purple-600" />
              )}
            </button>

             <span
            className={`text-sm font-semibold tracking-wide ${
              liked ? "text-purple-500" : "text-slate-300"
            }`}
          >
            {likesCount}
          </span>

          </fetcher.Form>

         
          <ChatBubbleLeftEllipsisIcon className="size-7 text-white cursor-pointer transition-all duration-200 hover:scale-110 hover:text-purple-600" />
        </div>
      </div>

      <div className="pl-6 pb-5 w-[96%]">
        <Comments post={post} />
      </div>
    </ModalPost>
  );
};
