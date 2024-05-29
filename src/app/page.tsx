"use client";

import withAuth from "@/components/hoc/withAuth";
import React from "react";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-between h-full p-24">
      <div>dashboard</div>
    </main>
  );
};

export default withAuth(Home);
