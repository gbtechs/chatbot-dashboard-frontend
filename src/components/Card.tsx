interface Props {
  title?: string;
  desc?: string;
  children: React.ReactNode;
}

export const Card: React.FC<Props> = ({ title, desc, children }) => {
  return (
    <div className="flex flex-col border-1 radius-1 w-full bg-white p-4">
      <div className="font-primary mb-1">{title}</div>
      <div className="font-secondary mb-1">{desc}</div>
      {children}
    </div>
  );
};
