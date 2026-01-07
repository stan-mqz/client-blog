import { Modal, Box } from "@mui/material";
import type { ReactNode } from "react";

const boxStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "0.75rem",
  overflow: "auto",
  width: "100%",
  maxWidth: "1100px",
  maxHeight: "95vh",
  border: "1px solid #334155",
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
};

type ModalPostProps = {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  onClose?: () => void
};

export const ModalPost = ({ open, setOpen, children, onClose }: ModalPostProps) => {
  return (
    <Modal
      open={open}
      onClose={
        onClose
          ? onClose
          : setOpen
          ? () => setOpen(false)
          : undefined
      }
      className="flex justify-center items-center px-4"
    >
      <Box sx={boxStyle}>{children}</Box>
    </Modal>
  );
};
