"use client";

import { Card } from "./Card";
import DragAndDrop from "./DragAndDrop";

export const AddSources: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow">
      <h2>Add new sources</h2>
      <h5>Add new sources to train your chatbot</h5>

      <div className="flex flex-col flex-grow mt-4">
        <Card hFull={true}>
          <DragAndDrop />
        </Card>
      </div>
    </div>
  );
};
