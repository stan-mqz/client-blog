// layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "../Components/UI/NavBar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
};
