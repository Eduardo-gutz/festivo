import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import PasswordInput from '@/modules/core/components/PasswordInput';
import Button from '@/modules/core/components/Button';
import { REGEX, MIN_LENGTH } from '@/modules/auth/utils/validation';
import { auth } from '@/modules/core/services/firebase';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';

type FormData = {
  password: string;
  confirmPassword: string;
};

enum Status {
  LOADING,
  READY,
  ERROR,
  SUCCESS
}

const UpdatePasswordForm: React.FC = () => {
  const t = useTranslations('UpdatePasswordForm');
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode') || '';

  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError
  } = useForm<FormData>();

  const password = watch('password', '');

  useEffect(() => {
    const validateCode = async () => {
      if (!oobCode) {
        setStatus(Status.ERROR);
        setErrorMessage(t('errors.missingCode'));
        return;
      }

      try {
        const emailFromCode = await verifyPasswordResetCode(auth, oobCode);
        setEmail(emailFromCode);
        setStatus(Status.READY);
      } catch (error: any) {
        setStatus(Status.ERROR);

        if (error.code === 'auth/invalid-action-code' || error.code === 'auth/invalid-action-code') {
          setErrorMessage(t('errors.invalidCode'));
          return;
        }

        setErrorMessage(t('errors.generalError'));
      }
    };

    validateCode();
  }, [oobCode, t]);

  const onSubmit = async (data: FormData) => {
    try {
      await confirmPasswordReset(auth, oobCode, data.password);
      setStatus(Status.SUCCESS);
    } catch (error: any) {
      if (error.code === 'auth/weak-password') {
        setError('password', {
          type: 'manual',
          message: t('errors.weakPassword')
        });
        return;
      }
      
      if (error.code === 'auth/invalid-action-code' || error.code === 'auth/expired-action-code') {
        setStatus(Status.ERROR);
        setErrorMessage(t('errors.expiredActionCode'));
        return;
      }

      setError('root', {
        type: 'server',
        message: t('errors.generalError')
      });
    }
  };

  const renderContent = () => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>{t('validatingCode')}</p>
          </div>
        );

      case Status.ERROR:
        return (
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
            <Button
              onClick={() => router.push(`/reset-password`)}
              fullWidth
            >
              {t('tryAgain')}
            </Button>
          </div>
        );

      case Status.SUCCESS:
        return (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <p className="text-green-700 text-sm">
                {t('passwordChanged')}
              </p>
            </div>
            <Button
              onClick={() => router.push(`/login`)}
              fullWidth
            >
              {t('goToLogin')}
            </Button>
          </div>
        );

      case Status.READY:
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <div className="p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200">
                {errors.root.message}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-2">
              <p className="text-blue-700 text-sm">
                {t('changingPasswordFor')} <span className="font-semibold">{email}</span>
              </p>
            </div>

            <PasswordInput
              label={t('newPassword')}
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

            <PasswordInput
              label={t('confirmPassword')}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: t('errors.confirmPasswordRequired'),
                validate: value =>
                  value === password || t('errors.passwordsDoNotMatch')
              })}
            />

            <Button type="submit" fullWidth className="mt-6" disabled={isSubmitting}>
              {isSubmitting ? t('changing') : t('changePassword')}
            </Button>
          </form>
        );
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

      {renderContent()}
    </div>
  );
};

export default UpdatePasswordForm; 