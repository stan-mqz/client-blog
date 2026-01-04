import type { Post } from "../../types/postsTypes";
import { PostDetails } from "./PostDetails";
import { useState } from "react";

type DisplayPostProp = {
  post: Post;
};

export const DisplayPost = ({ post }: DisplayPostProp) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <article
        onClick={() => setOpenDetails(true)}
        className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-slate-600 cursor-pointer"
      >
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

          <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
            {post.title}
          </h2>

          <p className="text-slate-300 leading-relaxed mb-4">{post.content}</p>
        </div>

        {post.image && (
          <div className="px-6 pb-6">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        )}
      </article>

      <PostDetails post={post} open={openDetails} setOpen={setOpenDetails} />
    </>
  );
};
