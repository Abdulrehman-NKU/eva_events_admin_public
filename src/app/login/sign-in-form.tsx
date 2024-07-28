/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/config/routes';
import { LoginSchema } from '@/utils/validators/login.schema';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { AuthApi } from 'utils/api/Auth';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { LocalStorageKeys } from 'utils/common.utils';
import { LocalStorageHelpers } from '@/eva-components/helpers/localstorage.helpers';
import { AuthHelpers } from '@/helpers/auth.helpers';
import { emailFormate } from '@/eva-components/userDetails/userDetails';

const initialValues = {
  email: '',
  password: '',
  rememberMe: false,
};

const SignInForm = () => {
  //TODO: why we need to reset it here
  const [state, setState] = useState({
    isLoading: false,
  });

  const router = useRouter();

  const onSubmitHandler = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
    });

    let res = await AuthApi.Login({
      email: emailFormate(values?.email),
      password: values.password.trim(),
      remember: values?.rememberMe,
    });

    let _isLoading = false;

    switch (res.response_code) {
      case ResponseCodes.LOGIN_SUCCESS:
        _isLoading = true;

        LocalStorageHelpers.setAuthTokens({
          access_token: res?.data?.data.access_token ?? '',
          refresh_token: res?.data?.data.refresh_token ?? '',
        });

        LocalStorageHelpers.setUserData(res?.data?.data?.user);

        signIn('credentials', {
          ...values,
        });

        break;
      case ResponseCodes.INVALID_CREDENTIALS:
        toast.error(res?.data?.message);
        break;

      case ResponseCodes.ACCESS_TOKEN_CREATION_FAILED:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error(res?.data?.message);
    }
    setState({
      ...state,
      isLoading: _isLoading,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter your valid email address!')
        .required('Please enter your email!'),
      password: Yup.string().required('Please enter your password!'),
      rememberMe: Yup.string(),
    }),
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  useEffect(() => {
    const isAccessTokenValid = AuthHelpers.validateAccessToken();

    if (isAccessTokenValid) {
      router.replace(routes.dashboard);
    }
  }, []);

  // const onChange = (e: any) => {
  //   console.log('e>>>', e);
  // };

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
        <Password
          name="password"
          label="Password"
          placeholder="Enter your password"
          size="lg"
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          color="info"
          onChange={formik.handleChange}
          error={formik?.errors?.password}
          value={formik.values.password}
        />
        <div className="flex items-center justify-between pb-2">
          <Checkbox
            name="rememberMe"
            label="Remember Me"
            color="info"
            variant="flat"
            className="[&>label>span]:font-medium"
            onChange={formik.handleChange}
            defaultChecked
            // onClick={onChange}
          />
          <Link
            href={routes.forgotPassword}
            className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
          >
            Forget Password?
          </Link>
        </div>
        <Button
          className="w-full"
          type="submit"
          size="lg"
          color="info"
          isLoading={state.isLoading}
        >
          <span>Sign in</span>{' '}
          <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
        </Button>
      </div>

      {/* <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text> */}
    </form>
  );
};

export default SignInForm;
