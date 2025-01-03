import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcryptjs from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHasedToken = async (value: string) =>
  await bcryptjs.hash(value, 10);

export const getInitial = (name?: string) => {
  if (!name?.length) return "";
  const spaceSeperatedName = name.split(" ");
  return spaceSeperatedName.reduce(
    (acc, value) => acc + (value?.[0] ?? ""),
    ""
  );
};
