import type { Post } from "../types/postsTypes";

type CommentsProps = {
  post: Post;
};

export const Comments = ({ post }: CommentsProps) => {
  const comments = post.comments.map((comment) => comment);

  return (
    <>
      <form className="w-full">
        <label className="text-white font-bold mb-2 block" htmlFor="id-comment">
          Got something to say?
        </label>

        <div className="flex items-center gap-2">
          <div className="w-12 shrink-0">
            <img
              src={post.user.avatar}
              alt="user avatar"
              className="w-full rounded-full"
            />
          </div>

          <input
            id="id-comment"
            className="flex-1 bg-slate-700 p-2 rounded-md text-white active:border-slate-400 placeholder:text-white"
            type="text"
            placeholder="Add a new comment here"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white p-2 uppercase font-bold rounded-md h-full cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>

      <h2 className="text-white text-center uppercase font-bold mt-10 text-lg">
        Comments Section
      </h2>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id_comment}>
            <div className="bg-slate-700 mt-5 w-[90%] ml-16 p-2 rounded-md">
              <div className="flex gap-3 items-start">
                <div className="w-16 shrink-0">
                  <img
                    className="w-full rounded-full"
                    src={comment.user.avatar}
                    alt="user avatar"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-white font-bold">
                    {comment.user.username}
                  </p>

                  <p className="text-white mt-3">{comment.content_comment}</p>
                </div>
              </div>
            </div>

            {comment.isOwner && (
              <div className="ml-16 mt-2 flex gap-4 text-md font-bold">
                <button className="text-purple-600 hover:underline uppercase cursor-pointer">
                  Edit Comment
                </button>

                <button className="text-red-600 hover:underline uppercase cursor-pointer">
                  Delete Comment
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <h2 className="text-lg text-red-600 text-center font-bold uppercase mt-10">
          No comments yet
        </h2>
      )}
    </>
  );
};
