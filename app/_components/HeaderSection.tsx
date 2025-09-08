import SortSelect from "@/app/_components/SortSelect";

interface HeaderSectionProps {
  selectedTag: string;
}

const HeaderSection = ({ selectedTag }: HeaderSectionProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">
        {selectedTag === "전체" ? "블로그 목록" : `${selectedTag} 관련글`}
      </h2>
      <SortSelect />
    </div>
  );
};

export default HeaderSection;
