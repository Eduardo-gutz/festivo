'use client';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {children}
      <footer className="bottom-0 w-full bg-white/80 backdrop-blur-sm py-2 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Festivo - Todos los derechos reservados
      </footer>
    </div>
  );
} 