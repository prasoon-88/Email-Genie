import { SupportedFile } from "@/types";

export const SupportedFilesSet = new Set<SupportedFile>([
  "xlsx",
  "xls",
  "xlsm",
  "csv",
  "ods",
]);

export const getURLSearchParams = (url: string) => {
  const newUrl = new URL(url);
  return new URLSearchParams(newUrl.searchParams);
};
