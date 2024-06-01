import { formatDate } from "@/utils";

interface Props {
  id: string;
  title: string;
  desc: string;
  number: number;
  selected: boolean;
  onSelect?: () => void;
}

export const ConversationListItem: React.FC<Props> = ({
  id,
  title,
  desc,
  number,
  selected,
  onSelect,
}) => {
  return (
    <div
      key={id}
      className={`flex justify-between items-center radius-1 w-full cursor-pointer hover:bg-gray-100 p-4 ${
        selected && "bg-gray"
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col pr-4">
        <h5 className="line-clamp-1">{title}</h5>
        <span className="font-secondary">{formatDate(desc)}</span>
      </div>

      <div
        className={`min-h-[30px] min-w-[30px] flex justify-center items-center font-secondary !text-white rounded-full ${
          selected ? "bg-orange" : "bg-gray-30"
        }`}
      >
        {number}
      </div>
    </div>
  );
};
