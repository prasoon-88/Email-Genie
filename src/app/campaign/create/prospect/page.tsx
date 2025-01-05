"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLoading from "@/hooks/common/use-loading.hook";
import { useToast } from "@/hooks/common/use-toast";
import { useCamapignContext } from "@/providers/campaignProvider";
import { CAMPAIGN_APIS } from "@/utils/apis";
import { getFileParser } from "@/utils/parsing";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

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

interface Mapping {
  mapping: Map<string, string>;
  setMapping: any;
  firstRow: any[];
  cols: any[];
}

const Mapping = ({ mapping, setMapping, firstRow, cols }: Mapping) => {
  return <div>{JSON.stringify(firstRow)}</div>;
};

const CamapignProspect = () => {
  const { id: campaignId } = useCamapignContext();
  const { toast } = useToast();
  const { toggleLoading, isLoading } = useLoading();
  const [isUploaded, setIsUploaded] = useState<Boolean>(false);
  const [mapping, setMapping] = useState<Map<string, string>>(new Map());
  const [cols, setCols] = useState<Array<string | number>>([]);
  const [firstRow, setFirstRow] = useState<Array<string | number>>([]);

  const onRetrieveData = async (data: any[]) => {
    toggleLoading();
    try {
      const resp = await axios({
        ...CAMPAIGN_APIS["uploadCampaignProspects"],
        data: { campaignId, upload: { fileRows: data } },
      });
      if (resp.data?.upload) {
        setIsUploaded(true);
        const { firstRow, cols } = resp.data?.upload ?? {};
        setFirstRow(firstRow);
        setCols(cols);
      }
    } catch (error: any) {
      toast({ title: "Failed to upload !" });
    } finally {
      toggleLoading();
    }
  };

  const getRegisteredProspects = async () => {
    toggleLoading();
    try {
      const { url, method } = CAMPAIGN_APIS["getCampaignUploadedProspects"];
      const resp = await axios({
        method,
        url: url.replace("{id}", campaignId!),
      });
      if (resp.data?.upload) {
        const { cols, firstRow } = resp.data.upload;
        if (cols) {
          setCols(cols);
          setIsUploaded(true);
        }
        if (firstRow) {
          setFirstRow(firstRow);
        }
      }
    } catch (error) {
      toast({ title: "Failed to get registered prospects" });
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    if (campaignId) {
      getRegisteredProspects();
    }
  }, [campaignId]);

  return (
    <div className="h-screen grid p-4">
      <div className="w-full md:w-6/12 xl:w-4/12 mx-auto pt-10 flex flex-col gap-4">
        {isUploaded ? (
          <Mapping
            mapping={mapping}
            setMapping={setMapping}
            cols={cols}
            firstRow={firstRow}
          />
        ) : (
          <Uploading onRetrieveData={onRetrieveData} />
        )}
      </div>
    </div>
  );
};

export default CamapignProspect;
