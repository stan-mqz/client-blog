import { logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../store/store";
import { LoadingSpinner } from "../Components/LoadingSpinner";

export const Home = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();
    navigate("/auth/login");
  };

  const isLoading = useGlobalStore((state) => state.isLoading);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button className="cursor-pointer text-white" onClick={handleLogOut}>
          Logout
        </button>
      )}
    </>
  );
};
