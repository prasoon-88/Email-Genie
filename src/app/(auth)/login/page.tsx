"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/common/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import axios from "axios";
import { AUTH_APIS } from "@/utils/api";
import { Line } from "../layout";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export default function Login() {
  const { toast } = useToast();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const isDisable = useMemo(
    () => !Boolean(email && password?.length > 6) || btnLoading,
    [, email, password, btnLoading]
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
    <form className="grid gap-y-6">
      <div className="text-center grid justify-centet gap-y-2">
        <p className="text-3xl font-semibold">Welcome to EmailGenie</p>
        <p className="text-lg text-slate-400">Write Cold Emails in no time</p>
      </div>
      <div className="flex items-center gap-x-2">
        <Line />
        <p className="whitespace-nowrap">Login with your email & password</p>
        <Line />
      </div>
      <Label htmlFor="email" className="grid gap-y-1">
        <p className="text-sm text-slate-300">Email</p>
        <Input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Label>
      <Label htmlFor="password" className="grid gap-y-1">
        <p className="text-sm text-slate-300">Password</p>
        <Input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Label>

      <Button disabled={isDisable} onSubmit={onLogin} onClick={onLogin}>
        Login
      </Button>
      <p className="text-slate-400">
        Need an account{" "}
        <Link href={"/signup"} className="text-blue-500">
          Signup {">"}
        </Link>
      </p>
    </form>
  );
}
