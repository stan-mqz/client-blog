type Intent =
  | "like"
  | "unlike"
  | "comment-create"
  | "comment-update"
  | "comment-delete"
  | 'post-delete'

export const isIntent = (value: unknown): value is Intent => {
  return (
    value === "like" ||
    value === "unlike" ||
    value === "comment-create" ||
    value === "comment-update" ||
    value === "comment-delete" ||
    value === 'post-delete'
  );
};
