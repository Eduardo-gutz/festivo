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
import { useAppDispatch } from '@/modules/redux/hooks/reduxAppHooks';
import { signupThunk } from '@/modules/redux/slices/auth/thunk/auth.thunk';
import { REGEX, MIN_LENGTH } from '@/modules/auth/utils/validation';
import SocialAuthButtons from './SocialAuthButtons';

type FormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  newsSubscription: boolean;
};

const RegisterForm: React.FC = () => {
  const t = useTranslations('RegisterForm');
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError
  } = useForm<FormData>();

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      const registerData = {
        full_name: `${data.name} ${data.lastName}`,
        email: data.email,
        username: data.email,
        password: data.password,
        provider: "password",
        token: "",
        verify_email: false
      };

      await dispatch(signupThunk(registerData)).unwrap();

      router.push(`/dashboard`);
    } catch (error: any) {
      if (error.message) {
        if (error.message.toLowerCase().includes('email')) {
          setError('email', { type: 'server', message: t('errors.emailExists') });
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
            alt="Logo Invitify"
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
      <SocialAuthButtons type="signup" />
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{t('orRegisterWith')}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {errors.root && (
          <div className="p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200">
            {errors.root.message}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('name')}
            error={errors.name?.message}
            {...register('name', {
              required: t('errors.nameRequired'),
              minLength: {
                value: MIN_LENGTH.NAME,
                message: t('errors.nameMinLength')
              }
            })}
            placeholder="Juan"
          />
          <Input
            label={t('lastName')}
            error={errors.lastName?.message}
            {...register('lastName', {
              required: t('errors.lastNameRequired'),
              minLength: {
                value: MIN_LENGTH.LAST_NAME,
                message: t('errors.lastNameMinLength')
              }
            })}
            placeholder="Pérez"
          />
        </div>

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
            helperText={t('passwordHelperText')}
            {...register('password', {
              required: t('errors.passwordRequired'),
              minLength: {
                value: MIN_LENGTH.PASSWORD,
                message: t('errors.passwordMinLength')
              },
              pattern: {
                value: REGEX.PASSWORD,
                message: t('errors.passwordPattern')
              }
            })}
          />
        </div>

        <div>
          <PasswordInput
            label={t('confirmPassword')}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: t('errors.confirmPasswordRequired'),
              validate: value => value === password || t('errors.passwordsDoNotMatch')
            })}
          />
        </div>

        <div className="space-y-3 pt-2">
          <div>
            <Checkbox
              error={errors.termsAccepted?.message}
              label={
                <span className="text-sm text-gray-700">
                  {t.rich('termsAccepted', {
                    terms: (children) => (
                      <Link href={`/${locale}/terms`} className="text-blue-700 hover:underline">
                        {children}
                      </Link>
                    ),
                    privacy: (children) => (
                      <Link href={`/${locale}/privacy`} className="text-blue-700 hover:underline">
                        {children}
                      </Link>
                    )
                  })}
                </span>
              }
              {...register('termsAccepted', {
                required: t('errors.termsRequired')
              })}
            />
          </div>
          <div>
            <Checkbox
              label={
                <span className="text-sm text-gray-700">
                  {t('newsSubscription')}
                </span>
              }
              {...register('newsSubscription')}
            />
          </div>
        </div>

        <Button type="submit" fullWidth className="mt-6" disabled={isSubmitting}>
          {isSubmitting ? t('creatingAccount') : t('createAccount')}
        </Button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t('alreadyHaveAccount')} <Link href={`/${locale}/login`} className="text-blue-700 hover:underline font-medium">{t('loginHere')}</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 