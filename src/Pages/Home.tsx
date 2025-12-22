import { useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { useBlogStore } from "../store/store";
import { LoadingSpinner } from "../Components/LoadingSpinner/LoadingSpinner";
import { getAllPosts, likePost, unlikePost } from "../services/PostServices";
import type { Post } from "../types/postsTypes";
import { DisplayPost } from "../Components/DisplayPost";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  if (data.likedByUser === "true") {
    await unlikePost(+data.id);
  } else {
    await likePost(+data.id);
  }

  return null;
};

export const loader = async () => {
  const response = await getAllPosts();
  return response;
};

export const Home = () => {
  const posts = useLoaderData() as Post[] | null;

  const isLoading = useBlogStore((state) => state.isLoading);

  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900">
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
            <div className="max-w-3xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-white text-center">
                Feed
              </h1>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="space-y-6">
              {posts?.map((post) => (
                <DisplayPost key={post.id_post} post={post} />
              ))}
            </div>
          </div>

          {posts?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <p className="text-xl">No hay posts aún</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
