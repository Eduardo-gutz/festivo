import IconButton from '../ui/IconButton';

export default function ImagesSection() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-primary">Imágenes</h2>
      <div className="mb-2 flex gap-3">
        <IconButton icon="⬆️" label="Subir" />
        <IconButton icon="🖼️" label="Galería" />
      </div>
    </section>
  );
} 