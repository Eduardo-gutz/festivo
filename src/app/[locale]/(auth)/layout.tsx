'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/modules/redux/hooks/reduxAppHooks";
import { setCredentials } from "@/modules/redux/slices/auth/auth.slice";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      dispatch(setCredentials());
      router.push(`/dashboard`);
    }
  }, []);

  return (
    <div className="bg-background">
      {children}
      <footer className="bottom-0 w-full bg-white/80 backdrop-blur-sm py-2 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Festivo - Todos los derechos reservados
      </footer>
    </div>
  );
} 