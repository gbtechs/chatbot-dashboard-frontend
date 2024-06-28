interface Props {
  children: React.ReactNode;
}

export const Tooltip: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute top-[-30px] right-[-150px] font-secondary bg-gray radius-[20px] p-2">
      {children}
    </div>
  );
};
