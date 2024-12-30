"use client";

import { useToast } from "@/hooks/common/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { AUTH_APIS } from "@/utils/api";

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
      toast({
        title: "Your Email is Verified!",
        description:
          "Thank you for verifying your email. Your account is now active and ready to use.",
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
    <form className="flex flex-col gap-y-4 text-center justify-center">
      <p className="text-2xl">Press continue to Veirfy yourself</p>
      <Button onClick={onVerify}>Continue</Button>
    </form>
  );
}
