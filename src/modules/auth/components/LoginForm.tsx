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
import PasswordInput from '@/modules/core/components/PasswordInput';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks/reduxAppHooks';
import { loginThunk } from '@/modules/redux/slices/auth/thunk/auth.thunk';
import { LoginData } from '@/modules/auth/types/auth.interfaces';
import { REGEX } from '@/modules/auth/utils/validation';
import SocialAuthButtons from './SocialAuthButtons';

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
  const { error } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ LoginForm.tsx:30 ~ error:", error)

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
      setError('root', { type: 'server', message: error.response.data.detail });
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
      <SocialAuthButtons type="login" />
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{t('orLoginWith')}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {error && (
          <div className="p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200">
            {t(`errors.${error}`)}
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