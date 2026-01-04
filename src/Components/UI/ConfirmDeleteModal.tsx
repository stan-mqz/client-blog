import { Box, Modal, Typography } from "@mui/material";

type ConfirmDeleteModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const boxStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "0.75rem",
  width: "100%",
  maxWidth: "420px",
  border: "1px solid #334155",
  boxShadow:
    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
};

export const ConfirmDeleteModal = ({
  open,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      className="flex justify-center items-center px-4"
    >
      <Box sx={boxStyle}>
        <div className="bg-slate-800 p-10 rounded-lg">
          <Typography
            component="h2"
            className="text-white text-xl font-bold"
          >
            Are you sure you wanna delete this?
          </Typography>

          <div className="flex justify-end gap-3 mt-10">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md bg-slate-600 text-white hover:bg-slate-500 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition cursor-pointer"
            >
              Yes
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
