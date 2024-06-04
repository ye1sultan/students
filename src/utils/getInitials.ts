export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((name) => name[0])
    .join("");
};
