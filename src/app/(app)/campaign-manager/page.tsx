"use client";

import { useToast } from "@/hooks/common/use-toast";
import { CAMPAIGN_APIS } from "@/utils/apis";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";

const CAMPAIGN_HEADERS = ["Name", "Category", "Created At", "Last Modified At"];

const CamapaignManager = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const fetchAllCamapigns = useCallback(async () => {
    try {
      const resp = await axios({
        ...CAMPAIGN_APIS["getAllCampaigns"],
        data: {
          page: 1,
          limit: 10,
        },
      });
      if (resp.data) {
        setCampaigns(resp.data?.campaigns ?? []);
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title:
          error?.response?.data?.message ||
          "Somethins wen wrong while fetching campaigns",
      });
    }
  }, []);

  useEffect(() => {
    fetchAllCamapigns();
  }, []);
  return (
    <div className="grid gap-y-2 px-6 py-4">
      <div className="text-xl font-semibold">Campaign Manager</div>
      <table className="table-auto text-center">
        <thead className="bg-zinc-700">
          <tr>
            {CAMPAIGN_HEADERS.map((col) => (
              <td key={col} className="px-1 py-2">
                {col}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => {
            return (
              <tr key={campaign?._id}>
                <td className="px-1 py-2">
                  <Link
                    className="hover:text-blue-300 hover:underline active:text-blue-400"
                    href={`/campaign/create/settings/?id=${campaign?._id}`}
                  >
                    {campaign?.name}
                  </Link>
                </td>
                <td className="px-1 py-2">{campaign?.category}</td>
                <td className="px-1 py-2">
                  {moment(campaign?.createdAt).format("DD MMM, YYYY hh:mm A")}
                </td>
                <td className="px-1 py-2">
                  {moment(campaign?.updatedAt).format("DD MMM, YYYY hh:mm A")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CamapaignManager;
