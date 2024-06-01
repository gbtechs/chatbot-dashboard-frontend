"use client";

import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { Card } from "./Card";

export const AddSources: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow">
      <h2>Add new sources</h2>
      <h5>Add new sources to train your chatbot</h5>
      <div className="flex flex-col flex-grow mt-4">
        <Card hFull={true}>
          <div className="flex flex-col items-center m-auto w-full p-8">
            <DocumentArrowUpIcon className="w-[50px] h-[50px]" />
            <h5 className="mt-8">
              Drag & Drop files here, or click select files.
            </h5>
            <div className="max-w-[350px] mt-4 font-primary text-center">
              We currently support docs., txt. and tex. file types. Our system
              automatically filters out any invalid file types, ensuring a
              smooth and efficient process.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
