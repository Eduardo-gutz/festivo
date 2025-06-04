import IconButton from "../ui/IconButton";

export default function MultimediaSection() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[#2d3a4a]">
        Multimedia <span className='ml-2 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700'>Premium</span>
      </h2>
      <div className="flex gap-3">
        <IconButton icon="🎵" label="Música" />
        <IconButton icon="🎬" label="Video" />
      </div>
    </section>
  );
} 