import TemplatesSection from "@/components/editor/TemplatesSection";
import TextSection from "@/components/editor/TextSection";
import ImagesSection from "@/components/editor/ImagesSection";
import MultimediaSection from "@/components/editor/MultimediaSection";

const Sidebar = () => {
  return (
    <aside className="z-10 flex min-h-screen w-[290px] shrink-0 flex-col gap-8 bg-white p-6 pt-8 shadow-lg">
      {/* <TemplatesSection /> */}
      <TextSection />
      <ImagesSection />
      <MultimediaSection />
    </aside>
  );
}

export default Sidebar;