import TemplatesSection from "./TemplatesSection";
import TextSection from "./TextSection";
import ImagesSection from "./ImagesSection";
import MultimediaSection from "./MultimediaSection";
import ShapesSection from "./ShapesSection";

const Sidebar = () => {
  return (
    <aside className="w-[320px] h-screen bg-gray-50 border-r border-gray-200 p-6 pt-8 flex flex-col gap-4 overflow-y-auto shadow-lg scroll-bar-small">
      {/* <TemplatesSection /> */}
      <TextSection />
      <ShapesSection />
      <ImagesSection />
      <MultimediaSection />
    </aside>
  );
}

export default Sidebar;