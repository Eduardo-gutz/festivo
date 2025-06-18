import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Input from '@/modules/core/components/Input';
import Button from '@/modules/core/components/Button';
import Checkbox from '@/modules/core/components/Checkbox';
import SocialButton from '@/modules/core/components/SocialButton';
import PasswordInput from '@/modules/core/components/PasswordInput';
import { useAppDispatch } from '@/modules/redux/hooks/reduxAppHooks';
import { loginThunk } from '@/modules/redux/slices/auth/thunk/auth.thunk';
import { LoginData } from '@/modules/auth/types/auth.interfaces';
import { REGEX } from '@/modules/auth/utils/validation';

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const t = useTranslations('LoginForm');
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const loginData: LoginData = {
        username: data.email,
        password: data.password
      };
      
      await dispatch(loginThunk(loginData)).unwrap();
      
      router.push(`/dashboard`);
    } catch (error: any) {
      if (error.message) {
        if (error.message.toLowerCase().includes('contraseña')) {
          setError('root', { type: 'server', message: t('errors.invalidCredentials') });
        } else {
          setError('root', { type: 'server', message: t('errors.generalError') });
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          <Image 
            src="/logo.png"
            alt="Logo Festivo"
            width={64}
            height={64}
            priority
            unoptimized
          />
        </div>
        <h1 className="text-2xl font-bold text-primary">{t('title')}</h1>
        <p className="text-sm text-gray-600 mt-1 text-center">
          {t('subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {errors.root && (
          <div className="p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200">
            {errors.root.message}
          </div>
        )}
        
        <Input
          label={t('email')}
          error={errors.email?.message}
          {...register('email', {
            required: t('errors.emailRequired'),
            pattern: {
              value: REGEX.EMAIL,
              message: t('errors.emailInvalid')
            }
          })}
          type="email"
          placeholder="tu@email.com"
          icon={<Mail className="w-5 h-5 text-gray-500" />}
        />

        <div>
          <PasswordInput
            label={t('password')}
            error={errors.password?.message}
            {...register('password', {
              required: t('errors.passwordRequired')
            })}
          />
          <div className="flex justify-end mt-1">
            <Link href={`/${locale}/reset-password`} className="text-sm text-blue-700 hover:underline">
              {t('forgotPassword')}
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Checkbox 
            label={
              <span className="text-sm text-gray-700">
                {t('rememberMe')}
              </span>
            }
            {...register('rememberMe')}
          />
        </div>

        <Button type="submit" fullWidth className="mt-6" disabled={isSubmitting}>
          {isSubmitting ? t('loggingIn') : t('login')}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t('orLoginWith')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton
            icon={
              <svg className="w-5 h-5 text-[#4285F4]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            }
            provider={t('google')}
          />
          <SocialButton
            icon={
              <svg className="w-5 h-5 text-[#1877F2]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            }
            provider={t('facebook')}
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t('noAccountYet')} <Link href={`/${locale}/signup`} className="text-blue-700 hover:underline font-medium">{t('signupHere')}</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 