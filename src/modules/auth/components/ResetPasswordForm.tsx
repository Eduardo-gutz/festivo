import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/modules/core/components/Input';
import Button from '@/modules/core/components/Button';
import { REGEX } from '@/modules/auth/utils/validation';
import { auth } from '@/modules/core/services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

type FormData = {
  email: string;
};

const ResetPasswordForm: React.FC = () => {
  const t = useTranslations('ResetPasswordForm');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('email', {
          type: 'manual',
          message: t('errors.emailNotFound')
        });
        return;
      }
      
      setError('root', {
        type: 'server',
        message: t('errors.generalError')
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <div className="flex flex-col items-center mb-6">
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

      {isSubmitSuccessful ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <p className="text-green-700 text-sm">
            {t('emailSent')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" fullWidth className="mt-6" disabled={isSubmitting}>
            {isSubmitting ? t('sending') : t('resetPassword')}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {t('backToLogin')} <Link href={`/login`} className="text-blue-700 hover:underline font-medium">{t('loginHere')}</Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm; 