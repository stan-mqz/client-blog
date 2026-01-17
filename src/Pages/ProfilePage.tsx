import { useLoaderData } from "react-router-dom";
import type { UserProfile } from "../types/userTypes";

export const ProfilePage = () => {
  const user = useLoaderData() as UserProfile;


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

        <div className="grid grid-cols-3 gap-7 my-5 w-[90%]">
          {user.posts.map((post) => (
            <>
              <div className="bg-slate-800 space-y-3 p-2 rounded-lg">
                <p className="font-bold text-white">{post.title}</p>
                <div className="rounded-lg overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    src={post?.image!}
                    alt="Post Image"
                  />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
