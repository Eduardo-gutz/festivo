'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => { 
    const mode = searchParams.get('mode');
    const oobCode = searchParams.get('oobCode');
    
    if (!mode || !oobCode) {
      router.push(`/`);
      return;
    }
    
    switch (mode) {
      case 'resetPassword':
        router.push(`/update-password?oobCode=${oobCode}`);
        break;
      default:
        router.push(`/`);
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
        <div className="animate-pulse">
          <h2 className="text-xl font-semibold mb-4">Redirigiendo...</h2>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
