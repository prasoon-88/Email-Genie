"use client";

import { Button } from "@/components/ui/button";
import { AUTH_APIS } from "@/utils/apis";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const resp = axios({
        ...AUTH_APIS["logout"],
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button variant="destructive" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default page;
