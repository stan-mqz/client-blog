import { Link, useNavigate } from "react-router-dom";
import { useBlogStore } from "../../store/store";
import {
  HomeIcon,
  PlusCircleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/16/solid";
import { logout } from "../../services/AuthService";
import { useState } from "react";

export const NavBar = () => {
  const id_user = useBlogStore((state) => state.userData?.id_user);
  const username = useBlogStore((state) => state.userData?.username);
  const email = useBlogStore((state) => state.userData?.email);
  const avatar = useBlogStore((state) => state.userData?.avatar);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="flex flex-col sm:flex-row bg-slate-800 justify-between items-center p-3 sm:p-3.5 gap-3 sm:gap-0">
      <div className="flex gap-3 sm:gap-4 items-center font-bold w-full sm:w-auto justify-between sm:justify-start">
        <Link to={"/home"}>
          <HomeIcon className="size-8 sm:size-9 text-white" />
        </Link>
        <Link
          to={`/home/profile/${id_user}`}
          className="flex gap-2 sm:gap-3 justify-center items-center"
        >
          <div className="w-10 sm:w-14">
            <img
              className="w-full rounded-full"
              src={avatar}
              alt="User Avatar"
            />
          </div>
          <div className="text-white text-sm sm:text-base">
            <p className="truncate max-w-30 sm:max-w-none">{username}</p>
            <p className="hidden sm:block">{email}</p>
          </div>
        </Link>
      </div>
      <div className="flex gap-2 sm:gap-3 text-white items-center w-full sm:w-auto justify-center sm:justify-end">
        <div>
          <PlusCircleIcon
            className="size-8 sm:size-9 text-white cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => navigate("/home/create-post")}
          />
        </div>
        <div>
          <Cog8ToothIcon
          onClick={() => navigate("/home/settings")}
          className="size-8 sm:size-9 text-white cursor-pointer hover:text-gray-300 transition-colors" />
        </div>
        <div>
          <button
            className="text-white bg-red-600 hover:bg-red-700 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-colors font-medium shadow-lg cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed text-sm sm:text-base"
            onClick={handleLogOut}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};
