import { Input } from "../Components/UI/Input";

export const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6  ">
      <div className="mt-10 space-y-16">
        <h1 className="text-white font-bold text-4xl">User Profile Settings</h1>

        <form className="space-y-5">
          <h2 className="text-white font-bold text-xl ">
            Upadate User Information
          </h2>

          <Input
            type="text"
            placeholder="Enter your new username"
            label="Change username"
          />

          <Input
            type="e-mail"
            placeholder="Enter your new e-mail"
            label="Change E-mail"
          />

          <button
            type="submit"
            className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>

        <form className="space-y-5">
          <h2 className="text-white font-bold text-xl ">Upadate Avatar</h2>

          <p>Update Avatar*</p>
        </form>

        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl ">Upadate Password</h2>

          <Input type="e-mail" placeholder="Enter your e-mail" label="E-mail" />

          <Input
            type="password"
            placeholder="Enter your current password"
            label="Current Password"
          />

          <Input
            type="password"
            placeholder="Enter your new password"
            label="New Password"
          />

          <button
            type="submit"
            className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors mt-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
