import { Box, Modal, Typography } from "@mui/material";
import type { Post } from "../types/postsTypes";

type ModalPostProps = {
  post: Post;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

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

export const ModalPost = ({ post, modal, setModal }: ModalPostProps) => {
  return (
    <Modal
      open={modal}
      onClose={() => setModal(false)}
      className="flex justify-center items-center px-4"
    >
      <Box sx={boxStyle}>
        <div className="p-6 pb-4">
          {/* USER */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-600">
              <img
                className="w-full h-full object-cover"
                src={post.user.avatar}
                alt={`${post.user.username} avatar`}
              />
            </div>

            <div>
              <p className="text-white font-semibold text-lg">
                {post.user.username}
              </p>
            </div>
          </div>

          {/* TITLE */}
          <Typography
            component="h2"
            className="text-2xl font-bold text-white mb-3 leading-tight"
          >
            {post.title}
          </Typography>

          {/* CONTENT */}
          <Typography className="text-slate-300 leading-relaxed mb-4">
            {post.content}
          </Typography>
        </div>

        {/* IMAGE */}
        {post.image && (
          <div className="px-6 pb-6">
            <img
              src={post.image}
              alt="Post"
              className="w-full max-h-[70vh] object-contain rounded-lg bg-black"
            />
          </div>
        )}
      </Box>
    </Modal>
  );
};
