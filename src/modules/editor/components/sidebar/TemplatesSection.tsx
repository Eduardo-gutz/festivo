import Image from "next/image";

const TemplatesSection = () => {
  return (
    <section className="mb-4">
      <h2 className="mb-3 text-base font-semibold text-blue-700">Plantillas</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button className="flex flex-col items-center justify-center h-28 w-20 rounded-xl border border-gray-200 bg-white transition-all">
          <span className="text-3xl mb-2">💒</span>
          <span className="text-xs text-gray-700 font-medium">Boda</span>
        </button>
        <button className="flex flex-col items-center justify-center h-28 w-20 rounded-xl border border-gray-200 bg-white transition-all">
          <span className="text-3xl mb-2">🎉</span>
          <span className="text-xs text-gray-700 font-medium">Fiesta</span>
        </button>
        <button className="flex flex-col items-center justify-center h-28 w-20 rounded-xl border border-gray-200 bg-white transition-all">
          <span className="text-3xl mb-2">🎂</span>
          <span className="text-xs text-gray-700 font-medium">Cumple</span>
        </button>
      </div>
    </section>
  );
} 

export default TemplatesSection;