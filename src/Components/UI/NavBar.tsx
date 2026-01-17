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


  const id_user = useBlogStore(state => state.userData?.id_user)
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
    <nav className="flex bg-slate-800 justify-between items-center p-3.5">
      <div className="flex gap-4 items-center font-bold">
        <Link to={'/home'}>
          <HomeIcon className="size-9 text-white" />
        </Link>
        <Link to={`/home/profile/${id_user}`} className="flex gap-3 justify-center items-center">
          <div className="w-14">
            <img
              className="w-full rounded-full"
              src={avatar}
              alt="User Avatar"
            />
          </div>
          <div className="text-white">
            <p>{username}</p>
            <p>{email}</p>
          </div>
        </Link>
      </div>
      <div className="flex gap-3 text-white">
        <div>
          <PlusCircleIcon
            className="size-9 text-white cursor-pointer"
          onClick={() => navigate('/home/create-post')}
          />
        </div>
        <div>
          <Cog8ToothIcon className="size-9 text-white" />
        </div>
        <div>
          <button
            className="text-white bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition-colors font-medium shadow-lg cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
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
