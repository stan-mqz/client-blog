// layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";


export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <h2>This is MainLayout</h2>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
