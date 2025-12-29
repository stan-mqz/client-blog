import { Modal, Box } from "@mui/material";
import type { ReactNode } from "react";

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
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalPost = ({ modal, setModal, children }: ModalPostProps) => {
  return (
    <Modal
      open={modal}
      onClose={() => setModal(false)}
      className="flex justify-center items-center px-4"
    >
      <Box sx={boxStyle}>{children}</Box>
    </Modal>
  );
};
