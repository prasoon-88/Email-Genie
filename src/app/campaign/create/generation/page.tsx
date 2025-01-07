"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MAPPING_COLS } from "@/config/campaign";
import { useToast } from "@/hooks/common/use-toast";
import { useCamapignContext } from "@/providers/campaignProvider";
import { CAMPAIGN_APIS } from "@/utils/apis";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Generation = () => {
  const { id } = useCamapignContext();
  const { toast } = useToast();
  const [prospects, setProspects] = useState<any[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<string>("");

  const handleSelect = (id: string) => {
    if (selectedProspect == id) {
      setSelectedProspect("");
    } else {
      setSelectedProspect(id);
    }
  };

  const fetchRegisteredProspects = async () => {
    try {
      const { url, method } = CAMPAIGN_APIS["getCampaignRegisteredProspects"];
      const resp = await axios({
        method,
        url: url.replace("{id}", id!),
      });
      if (resp.data) {
        setProspects(resp.data?.prospects);
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to get campaign Registered prospects" });
    }
  };

  useEffect(() => {
    if (id) {
      fetchRegisteredProspects();
    }
  }, [id]);
  return (
    <div>
      {" "}
      <div className="grid gap-3 p-4">
        <div className="flex items-end justify-between">
          <div className="text-sm">
            * please select any one to generate preview sample
          </div>
          <Button>Generate Preview</Button>
        </div>
        <table className="table-auto text-center w-full">
          <thead className="bg-zinc-700">
            <tr>
              <td></td>
              {MAPPING_COLS.map((col, index) => (
                <td key={index} className="text-md px-2 py-1">
                  {col.label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect, index) => (
              <tr key={prospect?._id || index}>
                <td className="p-4 grid items-center ellispis">
                  <Checkbox
                    checked={prospect?._id == selectedProspect}
                    onClick={() => handleSelect(prospect?._id!)}
                  />
                </td>
                {MAPPING_COLS.map(({ value }, index) => (
                  <td key={index} className="p-4 ellispis">
                    {prospect[value] ?? "NA"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Button className="w-full" onClick={onSaveMapping} disabled={isLoading}>
          Save Mapping
        </Button> */}
      </div>
    </div>
  );
};

export default Generation;
