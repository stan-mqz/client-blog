type Intent =
  | "like"
  | "unlike"
  | "comment-create"
  | "comment-update"
  | "comment-delete";

export const isIntent = (value: unknown): value is Intent => {
  return (
    value === "like" ||
    value === "unlike" ||
    value === "comment-create" ||
    value === "comment-update" ||
    value === "comment-delete"
  );
};
