import styles from "./auth.module.scss";
import clsx from "clsx";
import Image from "next/image";
import React, { memo, ReactNode } from "react";

export const Line = memo(() => {
  return <div className={styles["line"]}></div>;
});

const Rectangle = memo(() => {
  return <div className={clsx(styles["rectangle"])} />;
});

const RectangleContainer = memo(({ count }: { count: number }) => {
  return (
    <div className={clsx(styles["rectanglesContainer"])}>
      {Array.from({ length: count }).map((_, index) => (
        <Rectangle key={index} />
      ))}
    </div>
  );
});

const AuthLayout = memo(({ children }: { children?: ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1 h-dvh">
      <div className="lg:col-span-2 md:col-span-2 col-12 p-10 grid items-center">
        {children}
      </div>
      <div
        className={clsx(
          "lg:col-span-4 md:col-span-2 md:flex hidden",
          styles["right-part"]
        )}
      >
        <RectangleContainer count={20} />
        <RectangleContainer count={20} />
        <Image
          src="/images/chatbotHead.png"
          alt="Chatbot"
          width={220}
          height={220}
        />
        <h2 className="text-3xl font-semibold text-center opacity-80">
          Revolutionize your cold email <br /> game with EmailGenie
        </h2>
      </div>
    </div>
  );
});

export default AuthLayout;
