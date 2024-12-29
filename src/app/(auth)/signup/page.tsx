"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/common/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import axios from "axios";
import { AUTH_APIS } from "@/lib/api";

export default function Signup() {
  const { toast } = useToast();

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const isDisable = useMemo(
    () => !Boolean(name && email && password?.length > 6),
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
    <form className="grid gap-y-3 my-20 justify-center ">
      <h1 className="text-xl font-bold">Signup</h1>
      <Input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <Button disabled={btnLoading || isDisable} onClick={onSignup}>
        Signup
      </Button>
    </form>
  );
}
