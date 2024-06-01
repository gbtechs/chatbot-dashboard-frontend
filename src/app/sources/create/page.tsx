"use client";

import { AddSources } from "@/components/AddSources";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function Sources() {
  const { loading, error, makeRequest } = useApiRequest();
  const [search, setSearch] = useState("");

  useEffect(() => {
    createSource();
  }, []);

  const createSource = async () => {
    // const result = await makeRequest("/sources", "POST");
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      <AddSources></AddSources>
    </div>
  );
}
