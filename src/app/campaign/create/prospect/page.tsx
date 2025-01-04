"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/ui/select";
import useLoading from "@/hooks/common/use-loading.hook";
import { useToast } from "@/hooks/common/use-toast";
import { useCamapignContext } from "@/providers/campaignProvider";
import { CAMPAIGN_APIS } from "@/utils/apis";
import { convertArrayToJSON, getFileParser } from "@/utils/parsing";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
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
  prospectData: ProspectData;
}

const Mapping = ({ mapping, setMapping, prospectData }: Mapping) => {
  return <div></div>;
};

interface ProspectData {
  firstRow?: any[];
  cols?: string[];
}

const CamapignProspect = () => {
  const { id: campaignId } = useCamapignContext();
  const { toast } = useToast();
  const { toggleLoading, isLoading } = useLoading();
  const [isUploaded, setIsUploaded] = useState<Boolean>(false);
  const [mapping, setMapping] = useState<Map<string, string>>(new Map());
  const [data, setData] = useState<ProspectData>({});

  const onRetrieveData = async (data: any[]) => {
    toggleLoading();
    const { rows, cols } = convertArrayToJSON(data);
    try {
      await axios({
        ...CAMPAIGN_APIS["registerProspects"],
        data: { campaignId, prospects: { rows, cols } },
      });
      setIsUploaded(true);
    } catch (error: any) {
      toast({ title: "Failed to upload !" });
    } finally {
      toggleLoading();
    }
  };

  const getRegisteredProspects = async () => {
    toggleLoading();
    try {
      const { url, method } = CAMPAIGN_APIS["getRegisteredProspects"];
      const resp = await axios({
        method,
        url: url.replace("{id}", campaignId!),
      });
      if (resp.data?.prospects) {
        const { firstRow, cols, mapping } = resp.data.prospects;
        if (mapping) {
          setMapping(mapping);
        }
        setData({ firstRow, cols });
        if (firstRow) {
          setIsUploaded(true);
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
            prospectData={data}
          />
        ) : (
          <Uploading onRetrieveData={onRetrieveData} />
        )}
      </div>
    </div>
  );
};

export default CamapignProspect;
