"use client";
import { useToast } from "@/hooks/common/use-toast";
import { useCamapignContext } from "@/providers/campaignProvider";
import { CAMPAIGN_APIS } from "@/utils/apis";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Generation = () => {
  const { id } = useCamapignContext();
  const { toast } = useToast();
  const [prospects, setProspects] = useState<any[]>([]);

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
  return <div>{JSON.stringify(prospects)}</div>;
};

export default Generation;
