export const storage = {
  setRegistered: (id: string) => {
    localStorage.setItem(`seen-${id}`, "true");
  },
  getRegistered: (id: string): boolean => {
    const seen = localStorage.getItem(`seen-${id}`);
    if (!seen) return false;
    return seen === "true";
  },
};
