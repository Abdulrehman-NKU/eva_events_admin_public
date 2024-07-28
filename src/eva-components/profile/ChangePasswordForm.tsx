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
import { cn } from 'rizzui';
import FormFooter from '../form-footer';
import FormGroup from '@/app/shared/form-group';
import ProfileFormFooter from './ProfileFormFooter';

const initialValues = {
  current_password: '',
  new_password: '',
  confirm_password: '',
};

const ChangePasswordForm = () => {
  const [state, setState] = useState({
    isLoading: false,
    passwordMatch: false,
  });

  const changePasswordApi = async (values: any) => {
    let userData = LocalStorageHelpers.getUserData();
    setState({
      ...state,
      isLoading: true,
    });

    let res = await AuthApi.changePassword({
      admin_id: userData?._id,
      data: {
        new_password: values?.new_password,
        confirm_new_password: values?.confirm_password,
        old_password: values?.current_password,
      },
    });

    switch (res.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        toast.success('Password update successfully');
        formik.resetForm();

        break;

      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.CONFIRM_PASSWORD_NOT_MATCH:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.PASSWORD_CHANGE_FAILED:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.WRONG_PASSWORD:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.INVALID_CREDENTIALS:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error(res?.data?.message || 'Internal server error!');
    }
    setState({
      ...state,
      isLoading: false,
    });
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
      current_password: Yup.string().required('Please enter your password!'),
      new_password: Yup.string().required('Please enter your password!'),
      confirm_password: Yup.string().required('Please enter your password!'),
    }),
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  // console.log('stae,>>', state);

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        <div className="mb-10  grid gap-7 divide-y divide-dashed  bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          <FormGroup title="Current Password" className="mt-10 pt-8">
            <Password
              name="current_password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              onChange={formik.handleChange}
              error={formik?.errors?.current_password}
              value={formik.values.current_password}
            />
          </FormGroup>
          <FormGroup title="New Password" className="pt-8">
            <Password
              name="new_password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              onChange={formik.handleChange}
              error={formik?.errors?.new_password}
              value={formik.values.new_password}
            />
          </FormGroup>
          <FormGroup title="Confirm New Password" className="mb-10 pt-8">
            <Password
              name="confirm_password"
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
          </FormGroup>
        </div>

        <ProfileFormFooter
          isLoading={state?.isLoading}
          submitBtnText={'Update Password'}
          formik={formik}
        />
      </form>
    </div>
  );
};

export default ChangePasswordForm;
