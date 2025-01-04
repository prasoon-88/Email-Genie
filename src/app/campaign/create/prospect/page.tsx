"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/common/use-toast";
import { convertArrayToJSON, getFileParser } from "@/utils/parsing";
import { Label } from "@radix-ui/react-label";
import React, { ChangeEvent, useState } from "react";

const Uploading = ({
  onRetrieveData,
}: {
  onRetrieveData: (data: any[]) => void;
}) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File>();

  const onUpload = () => {
    if (!file) return;
    const fileName = file?.name;
    const parser = getFileParser(fileName);
    if (!parser) {
      toast({ title: "File Not Supported" });
      return;
    }
    parser(file, onRetrieveData);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    if (!file) {
      toast({ title: "File Not Found" });
      return;
    }
    setFile(file);
  };

  return (
    <>
      <Label htmlFor="chooseFile" className="grid gap-y-1">
        <p className="text-sm text-slate-300">Camapign Name</p>
        <Input
          required
          autoFocus
          type="file"
          id="chooseFile"
          onChange={onChange}
        />
      </Label>
      <Button disabled={!Boolean(file)} onClick={onUpload}>
        Upload
      </Button>
    </>
  );
};

const CamapignProspect = () => {
  const onRetrieveData = (data: any[]) => {
    const jsonData = convertArrayToJSON(data);
    console.log(jsonData);
  };

  return (
    <div className="h-screen grid p-4">
      <div className="w-full md:w-6/12 xl:w-4/12 mx-auto pt-10 flex flex-col gap-4">
        <Uploading onRetrieveData={onRetrieveData} />
      </div>
    </div>
  );
};

export default CamapignProspect;
