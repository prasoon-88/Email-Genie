"use client";

import { useToast } from "@/hooks/common/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { AUTH_APIS } from "@/lib/api";

export default function Verify() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast({
        title: "Verification failed",
        description: "Something went wrong",
      });
      return;
    }
    try {
      await axios({
        ...AUTH_APIS["verify"],
        data: { token },
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error?.response?.data?.error,
      });
    }
  };
  return (
    <form className="flex items-center justify-center mt-40">
      <Button onClick={onVerify}>Verify</Button>
    </form>
  );
}
