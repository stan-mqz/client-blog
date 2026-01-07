import { ModalPost } from "./ModalPost";
import { useNavigate, useNavigation } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const CreatePostModal = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isNavigating = navigation.state !== "idle";

  const onClose = () => {
    navigate(-1);
  };


  return (
    <>
      {isNavigating ? (
        <LoadingSpinner />
      ) : (
        <ModalPost open={true} onClose={onClose}>
          <p>Hello World</p>
        </ModalPost>
      )}
    </>
  );
};
