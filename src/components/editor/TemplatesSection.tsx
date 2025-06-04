import Image from "next/image";

const TemplatesSection = () => {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[#2d3a4a]">Plantillas</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button className="flex h-28 w-20 items-center justify-center rounded-xl border-2 border-transparent bg-[#fff6f6] transition-all hover:border-[#f2555c]">
          <Image src="/plantilla1.png" alt="Plantilla 1" width={80} height={112} className="rounded-xl" />
        </button>
        <button className="flex h-28 w-20 items-center justify-center rounded-xl border-2 border-transparent bg-[#f6fcff] transition-all hover:border-[#f2555c]">
          <Image src="/plantilla2.png" alt="Plantilla 2" width={80} height={112} className="rounded-xl" />
        </button>
        <button className="flex h-28 w-20 items-center justify-center rounded-xl border-2 border-transparent bg-white transition-all hover:border-[#f2555c]">
          <Image src="/plantilla3.png" alt="Plantilla 3" width={80} height={112} className="rounded-xl" />
        </button>
      </div>
    </section>
  );
} 

export default TemplatesSection;