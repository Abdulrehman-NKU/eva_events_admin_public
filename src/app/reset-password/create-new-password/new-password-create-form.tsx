/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/config/routes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthApi } from 'utils/api/Auth';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { AuthHelpers } from '@/helpers/auth.helpers';
import { Password, Text } from 'rizzui';
import { LocalStorageHelpers } from '@/eva-components/helpers/localstorage.helpers';

const initialValues = {
  new_password: '',
  confirm_password: '',
};

const NewPasswordCreateForm = () => {
  //TODO: why we need to reset it here
  const [state, setState] = useState({
    isLoading: false,
    resetSuccessfully: false,
    passwordMatch: false,
  });
  const searchParams = useSearchParams();
  let reset_token = searchParams.get('reset_token');
  const router = useRouter();

  const changePasswordApi = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
      resetSuccessfully: false,
    });

    let res = await AuthApi.createNewPassword({
      password: values?.new_password,
      reset_password_token: reset_token,
    });

    switch (res.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
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

  const onSubmitHandler = async (values: any) => {
    if (values?.new_password === values?.confirm_password) {
      changePasswordApi(values);
    } else {
      setState({
        ...state,
        passwordMatch: true,
      });

      setTimeout(() => {
        setState({
          ...state,
          passwordMatch: false,
        });
      }, 3000);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      new_password: Yup.string().required('Please enter your password!'),
      confirm_password: Yup.string().required('Please enter your password!'),
    }),
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  useEffect(() => {
    if (!reset_token) {
      router?.replace(routes.login);
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-5">
        <Password
          name="new_password"
          label="New Password"
          placeholder="Enter your password"
          size="lg"
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          color="info"
          onChange={formik.handleChange}
          error={formik?.errors?.new_password}
          value={formik.values.new_password}
        />

        <Password
          name="confirm_password"
          label="Confirm Password"
          placeholder="Enter your password"
          size="lg"
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          color="info"
          onChange={formik.handleChange}
          error={
            (state?.passwordMatch ? "Passwords don't match" : '') ||
            formik?.errors?.confirm_password
          }
          value={formik.values.confirm_password}
        />

        <Button
          className="w-full"
          type="submit"
          size="lg"
          color="info"
          isLoading={state.isLoading}
        >
          <span> Create New Password</span>
        </Button>
      </div>

      {state?.resetSuccessfully && (
        <Link href={routes?.login}>
          <div className="mt-5 flex w-full flex-grow items-center justify-between rounded border px-3 py-3 text-black dark:bg-red-50">
            <Text className="text-center text-[15px] leading-loose  text-green hover:text-sky-700 ">
              Your password change successfully. Sign in ? Please click hear!
            </Text>
          </div>
        </Link>
      )}

      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base ">
        Don’t want to reset your password?
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

export default NewPasswordCreateForm;
