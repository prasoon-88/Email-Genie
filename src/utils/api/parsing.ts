import { SupportedFile } from "@/types";
import * as xlsx from "xlsx";

export const parseFile = (type: SupportedFile) => {
  switch (type) {
    case "csv":
    case "ods":
    case "xls":
    case "xlsm":
    case "xlsx":
      return parseXlsx;
  }
};

export const parseXlsx = (file: File, callBack: (data: any) => void) => {
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = e.target?.result;

    if (!data) {
      console.error("No Data while parsing xlsx");
      return;
    }
    const workBook = xlsx.read(data, {
      type: "array",
    });
    const sheetName = workBook.SheetNames[0];
    const sheet = workBook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    callBack(jsonData);
  };

  reader.onerror = () => {
    console.error("error while parsing xlsx");
  };

  reader.readAsArrayBuffer(file);
};
