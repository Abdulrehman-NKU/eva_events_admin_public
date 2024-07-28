/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/config/routes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { AuthApi } from 'utils/api/Auth';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { AuthHelpers } from '@/helpers/auth.helpers';
import { Text } from 'rizzui';
import { emailFormate } from '@/eva-components/userDetails/userDetails';

const initialValues = {
  email: '',
};

const ForgotPasswordForm = () => {
  //TODO: why we need to reset it here
  const [state, setState] = useState({
    isLoading: false,
    resetSuccessfully: false,
  });

  const router = useRouter();

  const onSubmitHandler = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
      resetSuccessfully: false,
    });

    let res = await AuthApi.resetPassword({
      email: emailFormate(values?.email),
    });

    switch (res.response_code) {
      case ResponseCodes.SUCCESS:
        setState({
          ...state,
          isLoading: false,
          resetSuccessfully: true,
        });
        formik.resetForm();
        break;

      case ResponseCodes.NOT_FOUND:
        setState({
          ...state,
          isLoading: false,
          resetSuccessfully: false,
        });
        toast.error(res?.data?.message);
        break;

      default:
        setState({
          ...state,
          isLoading: false,
          resetSuccessfully: false,
        });
        toast.error(res?.data?.message || 'Internal server error!');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter your valid email address!')
        .required('Please enter your email!'),
    }),
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-5">
        <Input
          name="email"
          type="text"
          size="lg"
          label="Email"
          placeholder="Enter your email"
          color="info"
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          onChange={formik.handleChange}
          error={formik?.errors?.email}
          value={formik.values.email}
        />

        <Button
          className="w-full"
          type="submit"
          size="lg"
          color="info"
          isLoading={state.isLoading}
        >
          <span> Reset Link Send</span>
        </Button>
      </div>

      {state?.resetSuccessfully && (
        <div className="mt-5 flex w-full flex-grow items-center justify-between rounded border px-3 py-3 text-black dark:bg-red-50">
          <Text className="text-center text-[15px] leading-loose  text-green">
            Reset password link send your email successfully.
          </Text>
        </div>
      )}

      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base ">
        Don’t want to reset your password?{' '}
        <Link
          href={routes?.login}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </form>
  );
};

export default ForgotPasswordForm;
