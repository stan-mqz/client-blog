import { ModalPost } from "./ModalPost";

type CreatePostModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatePostModal = ({open, setOpen}: CreatePostModalProps) => {

  return (
    <ModalPost open={open} setOpen={setOpen}>
      <p>Hello World</p>
    </ModalPost>
  );
};
