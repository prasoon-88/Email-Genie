"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/common/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import axios from "axios";
import { AUTH_APIS } from "@/utils/apis";
import { Label } from "@radix-ui/react-label";
import { Line } from "../layout";
import Link from "next/link";

export default function Signup() {
  const { toast } = useToast();

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const isDisable = useMemo(
    () => !Boolean(name && email && password?.length > 6) || btnLoading,
    [name, email, password]
  );

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await axios({
        ...AUTH_APIS["signUp"],
        data: {
          name,
          email,
          password,
        },
      });
      toast({
        title: "Sign up Success",
        description: "Please verify email",
      });
      router.push("/login");
    } catch (errorObj: any) {
      toast({
        title: "Sign up failed",
        description: errorObj?.error,
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
        <p className="whitespace-nowrap">Register with your email & password</p>
        <Line />
      </div>
      <Label htmlFor="name" className="grid gap-y-1">
        <p className="text-sm text-slate-300">Name</p>
        <Input
          id="names"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Label>
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

      <Button disabled={isDisable} onSubmit={onSignup} onClick={onSignup}>
        Login
      </Button>
      <p className="text-slate-400">
        Already have an account?{" "}
        <Link href={"/login"} className="text-blue-500">
          Login {">"}
        </Link>
      </p>
    </form>
  );
}
