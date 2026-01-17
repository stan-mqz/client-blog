import { useLoaderData, useNavigate } from "react-router-dom";
import type { UserProfile } from "../types/userTypes";

export const ProfilePage = () => {
  const user = useLoaderData() as UserProfile;

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center w-full mt-20">
        <div className="w-36">
          <img
            className="w-full rounded-full"
            src={user?.avatar}
            alt="User Avatar"
          />
        </div>
        <div className="text-white text-center space-y-3 mt-5 font-bold">
          <p>{user?.username}</p>
          <p>{user?.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 my-5 w-full px-4 sm:w-[95%] lg:w-[90%]">
          {user.posts.map((post) => (
            <div
              key={post.id_post}
              className="bg-slate-800 space-y-3 p-3 sm:p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
              onClick={() => navigate(`/home/display-post/${post.id_post}`)}
            >
              <p className="font-bold text-white text-sm sm:text-base">
                {post.title}
              </p>
              <div className="rounded-lg overflow-hidden">
                <img
                  className="w-full h-40 sm:h-48 object-cover"
                  src={post?.image!}
                  alt="Post Image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
