import { Card } from "./Card";

interface Props {
  image: string;
  title: string;
  desc: string;
}

export const NoDataCard: React.FC<Props> = ({ image, title, desc }) => {
  return (
    <Card>
      <div className="flex flex-col items-center w-full p-8">
        <img src={image} alt="no data" className="max-w-[150px]" />
        <h2 className="mt-8">{title}</h2>
        <h5 className="max-w-[350px] mt-4">{desc}</h5>
      </div>
    </Card>
  );
};
