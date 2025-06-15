import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="mb-2 text-2xl font-bold">404 - Página no encontrada</h2>
      <p className="mb-4 text-center">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Volver al inicio
      </Link>
    </div>
  );
} 