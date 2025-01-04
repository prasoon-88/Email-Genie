import React, { ReactNode } from "react";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="grid gap-y-4">
      <div className="text-2xl text-stone-100 font-bold">{title}</div>
      {children}
    </div>
  );
};

const Campaigns = () => {
  return (
    <Section title="Campaigns">
      <div className="text-center text-neutral-500">
        You don’t have any campaigns yet
      </div>
    </Section>
  );
};
const Home = () => {
  return (
    <div className="px-8 py-6 grid gap-y-8">
      <Campaigns />
    </div>
  );
};

export default Home;
