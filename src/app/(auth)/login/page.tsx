"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/common/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import axios from "axios";
import { AUTH_APIS } from "@/lib/api";

export default function Login() {
  const { toast } = useToast();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const isDisable = useMemo(
    () => !Boolean(email && password?.length > 6),
    [, email, password]
  );

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const data = {
        email,
        password,
      };
      await axios({
        ...AUTH_APIS["login"],
        data,
      });
      toast({
        title: "Login Successful",
      });
      router.push("/app/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.response?.data?.message,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <form className="grid gap-y-3 my-20 justify-center ">
      <h1 className="text-xl font-bold">Login</h1>
      <Input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={btnLoading || isDisable} onClick={onLogin}>
        Signup
      </Button>
    </form>
  );
}
