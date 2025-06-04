export default function TextSection() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[#2d3a4a]">Texto</h2>
      <div className="mb-3 flex items-center gap-2">
        <input type="text" className="flex-1 rounded border border-[#ececec] px-2 py-1 text-sm" placeholder="Agrega texto" />
        <span className="rounded bg-[#f2555c] px-2 py-1 font-mono text-xs text-white">#f2555c</span>
      </div>
      <div className="mb-2 flex gap-2">
        <button className="rounded bg-[#f7f9fb] px-2 py-1 text-base font-bold">B</button>
        <button className="rounded bg-[#f7f9fb] px-2 py-1 text-base italic">I</button>
        <button className="rounded bg-[#f7f9fb] px-2 py-1 text-base underline">U</button>
        <button className="rounded bg-[#f7f9fb] px-2 py-1 text-base">
          <span className="inline-block size-4 align-middle">≡</span>
        </button>
      </div>
    </section>
  );
} 