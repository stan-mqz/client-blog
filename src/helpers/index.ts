type Intent =
  | "like"
  | "unlike"
  | "comment:create"
  | "comment:edit"
  | "comment:delete";

export const isIntent = (value: unknown): value is Intent => {
  return (
    value === "like" ||
    value === "unlike" ||
    value === "comment:create" ||
    value === "comment:edit" ||
    value === "comment:delete"
  );
};
