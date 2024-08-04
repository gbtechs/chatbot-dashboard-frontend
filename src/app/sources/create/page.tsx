"use client";

import { AddSources } from "@/components/AddSources";
import useApiRequest from "@/hooks/useApiRequest";

export default function Sources() {
  const { loading, error, makeRequest } = useApiRequest();

  return (
    <div className="main-content flex flex-col flex-grow relative p-4">
      <AddSources></AddSources>
    </div>
  );
}
