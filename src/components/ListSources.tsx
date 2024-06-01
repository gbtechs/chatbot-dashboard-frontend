import { Card } from "./Card";

interface Props {
  title?: string;
  desc?: string;
  children: React.ReactNode;
}

export const AddSources: React.FC<Props> = ({ title, desc, children }) => {
  return (
    <div>
      <h2>Add new sources</h2>
      <h5>Add new sources to train your chatbot</h5>
      <div>
        <Card>
          <div className="flex flex-col flex-grow items-center w-full p-8">
            aaa
          </div>
        </Card>
      </div>
    </div>
  );
};
