"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Card } from "./Card";
import DragAndDrop from "./DragAndDrop";
import { useRouter, useSearchParams } from "next/navigation";

export const AddSources: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const onClose = () => {
    router.push("/sources");
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center justify-between">
        <div>
          <h2>Add new sources</h2>
          <h5>Add new sources to train your chatbot</h5>
        </div>
        {ref !== "nosource" && (
          <button
            className="font-primary-1 h-[40px] bg-white border-dark rounded-full px-8"
            onClick={onClose}
          >
            Back to sources
          </button>
        )}
      </div>

      <div className="flex flex-col flex-grow relative mt-4">
        {ref !== "nosource" && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            title="Close"
          >
            {/* <XMarkIcon className="w-8 h-8"></XMarkIcon> */}
          </button>
        )}

        <Card hFull={true}>
          <DragAndDrop onFileSave={() => router.push(`/sources`)} />
        </Card>
      </div>
    </div>
  );
};
