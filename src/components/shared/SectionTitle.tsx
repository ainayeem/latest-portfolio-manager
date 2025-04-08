interface SectionTitleProps {
  title: string;
  className?: string;
}

const sectionTitle = ({ title, className }: SectionTitleProps) => {
  return (
    <div className={`text-2xl font-semibold ${className}`}>
      <p className="">{title}</p>
    </div>
  );
};

export default sectionTitle;
