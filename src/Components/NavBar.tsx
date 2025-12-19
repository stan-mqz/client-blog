import { useBlogStore } from "../store/store";
import {
  HomeIcon,
  PlusCircleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/16/solid";

export const NavBar = () => {
  const { username, email, avatar } = useBlogStore.getState().userData!

  return (
    <nav className="flex bg-slate-800 justify-between items-center p-3.5">
      <div className="flex gap-4 items-center font-bold">
        <div>
          <HomeIcon className="size-9 text-white" />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <div className="w-14">
            <img
              className="w-full rounded-full"
              src={`${avatar}`}
              alt="User Avatar"
            />
          </div>

          <div className="text-white">
            <p>{username}</p>
            <p>{email}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 text-white">
        <div>
          <PlusCircleIcon className="size-9 text-white" />
        </div>

        <div>
          <Cog8ToothIcon className="size-9 text-white" />
        </div>
      </div>
    </nav>
  );
};
