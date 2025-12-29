import { Modal, Box } from "@mui/material";
import type { ReactNode } from "react";
import { useBlogStore } from "../store/store";

const boxStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "0.75rem",
  overflow: "scroll",
  width: "100%",
  maxWidth: "1100px",
  maxHeight: "95vh",
  border: "1px solid #334155",
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
};

type ModalPostProps = {
  children: ReactNode;
};

export const ModalPost = ({children }: ModalPostProps) => {

    const modalPost = useBlogStore(state => state.modalPost)
    const setModalPost = useBlogStore(state => state.setModalPost)
  

  return (
    <Modal
      open={modalPost}
      onClose={() => setModalPost(false)}
      className="flex justify-center items-center px-4"
    >
      <Box sx={boxStyle}>{children}</Box>
    </Modal>
  );
};
