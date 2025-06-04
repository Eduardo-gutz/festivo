const Canvas = () => {
  return (
    <div className="flex h-[520px] w-full max-w-xl flex-col items-center justify-center rounded-3xl bg-white text-center shadow-xl">
      <div className="flex flex-col items-center gap-4">
        <span className="mb-2 rounded-full bg-page p-4">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path stroke="#b0b8c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
        </span>
        <h1 className="text-2xl font-semibold text-primary">Crea tu invitación</h1>
        <p className="max-w-xs text-base text-black">Selecciona una plantilla o comienza desde cero para crear tu invitación perfecta</p>
      </div>
    </div>
  );
} 

export default Canvas;