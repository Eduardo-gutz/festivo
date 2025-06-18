'use client';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background">
      {children}
      <footer className="bottom-0 w-full bg-white/80 backdrop-blur-sm py-2 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Festivo - Todos los derechos reservados
      </footer>
    </div>
  );
} 