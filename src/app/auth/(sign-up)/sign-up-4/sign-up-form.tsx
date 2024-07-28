'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import { PhoneNumber } from '@/components/ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '@/components/ui/select';
import FormGroup from '@/app/shared/form-group';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import { useMedia } from 'react-use';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  selectRole: '',
  confirmPassword: '',
  isAgreed: false,
};

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    console.log(data);
    setReset({ ...initialValues, isAgreed: false });
  };

  const onChange = (e: any) => {
    console.log('e>>>', e);
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({
          register,
          control,
          getValues,
          setValue,
          formState: { errors },
        }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
                size={isMedium ? 'lg' : 'xl'}
              label="First Name"
              placeholder="Enter your first name"
              className="[&>label>span]:font-medium"
              // color="info"
              inputClassName="text-sm"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
                size={isMedium ? 'lg' : 'xl'}
              label="Last Name"
              placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              // color="info"
              inputClassName="text-sm"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              type="email"
                size={isMedium ? 'lg' : 'xl'}
              label="Email"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              // color="info"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { value, onChange } }) => (
                <PhoneNumber
                  label="Phone Number"
                  country="us"
                    size={isMedium ? 'lg' : 'xl'}
                  // color="info"
                  value={value}
                  onChange={onChange}
                  className="col-span-2 rtl:[&>.selected-flag]:right-0 [&>label>span]:font-medium"
                  inputClassName="rtl:pr-12 text-sm"
                  buttonClassName="rtl:[&>.selected-flag]:right-2 rtl:[&>.selected-flag_.arrow]:-left-6"
                  error={errors.phoneNumber?.message}
                />
              )}
            />

            <Controller
              name="selectRole"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={selectRole}
                  value={value}
                    size={isMedium ? 'lg' : 'xl'}
                  onChange={onChange}
                  // color="info"
                  label="Payment Method"
                  // error={errors?.paymentMethod?.message as string}
                  getOptionValue={(option) => option.name}
                />
              )}
            />

            <Password
              label="Password"
              placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              // color="info"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            {/* <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
                size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              // color="info"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            /> */}

            <FormGroup
              title="Your Photo"
              description="This will be displayed on your profile."
              // className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11 "
              className="col-span-2 flex items-center justify-between [&>label>span]:font-medium	"
            >
              <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                <AvatarUpload
                  name="avatar"
                  setValue={setValue}
                  getValues={getValues}
                  // error={errors?.avatar?.message as string}
                  // onChange ={onChange}
                />
              </div>
            </FormGroup>
            <div className="col-span-2 flex items-start ">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    By signing up you have agreed to our{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
              />
            </div>
            <Button
                size={isMedium ? 'lg' : 'xl'}
              // color="info"
              type="submit"
              className="col-span-2 mt-2"
            >
              <span>Create your account</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signIn1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}

const selectRole = [
  {
    value: 'admin',
    name: 'Admin',
  },
  {
    value: 'masteradmin',
    name: 'Master-Admin',
  },
  {
    value: 'superadmin',
    name: 'Super-Admin',
  },
];
