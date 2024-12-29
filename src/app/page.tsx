import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/ui/themeToggler";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-x-2 items-center justify-center min-h-screen">
      <Link href={"/login"}>
        <Button variant="secondary">Go To Login</Button>
      </Link>
      <Link href={"/signup"}>
        <Button variant="ghost">Go To Signup</Button>
      </Link>
      <ThemeToggler />
    </div>
  );
}
