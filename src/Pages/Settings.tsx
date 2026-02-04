import { Input } from "../Components/UI/Input";
import { SubmitButton } from "../Components/UI/SubmitButton";

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

                <SubmitButton
          text="update information"
          disabled={false}
          />


          
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

             <SubmitButton
          text="update password"
          disabled={false}
          />

        </div>
      </div>
    </div>
  );
};
