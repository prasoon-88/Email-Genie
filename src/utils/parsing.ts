import * as xlsx from "xlsx";

export const getFileExtention = (fileName?: string) => {
  if (!fileName) return;
  return fileName.split(".")?.at(-1);
};

export const getFileParser = (fileName?: string) => {
  if (!fileName) return;
  const type = getFileExtention(fileName);
  switch (type) {
    case "csv":
    case "ods":
    case "xls":
    case "xlsm":
    case "xlsx":
      return parseXlsx;
  }
};

export const convertArrayToJSON = (data: any[]) => {
  const rows: any[] = [];
  let cols: string[] = [];
  if (data?.length) {
    cols = data?.at(0) ?? [];
    const body: string[][] = data.slice(1);

    const rowData: any = {};
    body.forEach((row) => {
      cols.forEach((col, index) => {
        rowData[col] = row[index];
      });
      rows.push(rowData);
      Object.assign(rowData, {});
    });
  }
  return {
    cols,
    rows,
  };
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
