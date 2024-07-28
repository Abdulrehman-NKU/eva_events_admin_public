'use client';
import { useState } from 'react';

import cn from '@/utils/class-names';
import FormFooter from '@/eva-components/form-footer';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import QuillEditor from '@/components/ui/quill-editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import { usePathname, useRouter } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { countries } from '../../CountriesSelecteData';
import Select from '@/components/ui/select';
import { PiCaretUpDown, PiEnvelopeSimple } from 'react-icons/pi';
import { PhoneNumber } from '@/components/ui/phone-input';
import { CompaniesApi } from 'utils/api/Companies';
import { CompaniesEditDataType } from '@/eva-components/type/propsType';
import { emailFormate } from '@/eva-components/userDetails/userDetails';
import CategoriesSelector from '@/eva-components/selectBox/CategoriesSelector';
import Constatnts from '@/eva-components/constatnt';
import UploadProfilePhoto from '@/eva-components/UploadProfilePhoto';
import EditUploadProfilePhoto from '@/eva-components/upload/EditUploadProfilePhoto';

const EditCompaniesEvent = ({
  editData,
}: {
  editData: CompaniesEditDataType;
}) => {
  const [state, setState] = useState({
    profilePhoto: null,
    isLoading: false,
    deletePhotoLoading: false,
    editProfilePhoto: editData?.company_logo || '',
  });

  const router = useRouter();

  const initialValues = {
    name: editData?.company_name,
    email: editData?.email,
    phoneNumber: `${editData?.phone_country_code}${editData.phone}`,
    country: editData?.country,
    city: editData?.city,
    dialCode: editData.phone_country_code,
    addressLineOne: editData?.address_line_1,
    zip: editData?.zip,
    description: editData?.description,
    profilePhotoErrorHandling: editData?.company_logo || '',
    bio: editData?.bio || '',
    category: {
      id: editData?.sponsor_type?._id || '',
      name: editData?.sponsor_type?.category_name || '',
    },
    url: editData?.company_URL || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Company name is required"),
    email: Yup.string().required(messages.emailIsRequired),
    phoneNumber: Yup.string().optional(),
    dialCode: Yup.string().optional(),
    country: Yup.string().required(messages.countryIsRequired),
    city: Yup.string().required(messages.cityIsRequired),
    addressLineOne: Yup.string().optional(),
    zip: Yup.string().required(messages.zipCodeRequired),
    description: Yup.string().optional(),
    profilePhotoErrorHandling: Yup.string().optional(),
    bio: Yup.string().optional(),
    url: Yup.string().optional(),
  });

  const onSubmitHandler = async (values: any) => {
    console.log('values>>', values);

    let phone_code = '';
    let phone_number = '';
    if (values?.phoneNumber) {
      let length = values?.dialCode.length;
      let phoneNumberSlice = values?.phoneNumber?.slice(length);
      phone_code = values?.dialCode;
      phone_number = phoneNumberSlice;
    }

    let formData = new FormData();
    formData.append('company_name', values?.name);
    formData.append('email', emailFormate(values?.email));
    formData.append('phone', phone_number);
    formData.append('phone_country_code', phone_code);
    formData.append('country', values?.country);
    formData.append('city', values?.city);
    formData.append('address_line_1', values?.addressLineOne);
    formData.append('zip', values?.zip);
    formData.append('description', values?.description);
    formData.append('bio', values?.bio);
    formData.append('sponsor_type_id' , values?.category?.id);
    formData.append('company_URL', values?.url);

    if (!state?.editProfilePhoto) {
      if (state?.profilePhoto !== null) {
        formData.append('company_logo', state?.profilePhoto);
      }
    }

    setState({
      ...state,
      isLoading: true,
    });

    let res = await CompaniesApi.editCompanies(
      formData,
      editData?._id
    );

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        router.back();
        toast.success(res?.data?.message);
        formik.resetForm();
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error(res?.data?.message || 'Internal server error');
    }

    setState({
      ...state,
      isLoading: false,
      profilePhoto: null
    });

    console.log('res>>>', res);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const onChangeDescription = (e: any) => {
    formik.setFieldValue('description', e as any);
  };

  const onChangeBio = (e: any) => {
    formik.setFieldValue('bio', e as any);
  }

  const onChangeNumber = (value: any, data: any) => {
    formik.setFieldValue('phoneNumber', value);
    formik.setFieldValue('dialCode', data?.dialCode);
  };

  const countriesOptions = countries.map((country) => ({
    value: country.country_name,
    name: country.country_name,
  }));

  const onChangeCountry = (selectedCountry: any) => {
    console.log('Selected country in onChange:', selectedCountry);
    formik.setFieldValue('country', selectedCountry);
  };

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        <div className="mb-5">
          <h4 className="text-base font-medium">Company Info</h4>
        </div>
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          <FormGroup title="Name" description="" className="pt-8">
            <Input
              name="name"
              placeholder="Enter company name"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik.errors.name}
              value={formik.values.name}
            />
          </FormGroup>
          <FormGroup
            title="Contact Info"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <Input
              name="email"
              prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
              type="email"
              label="Email*"
              placeholder="georgia.young@example.com"
              onChange={formik.handleChange}
              error={formik?.errors?.email}
              value={formik.values.email}
            />

            <PhoneNumber
              country="gb"
              label="Phone number"
              className="flex-grow"
              onChange={onChangeNumber}
              error={formik.errors.phoneNumber}
              value={formik.values.phoneNumber}
            />
          </FormGroup>

          <FormGroup title="Location" className="pt-7 @2xl:pt-9 @3xl:pt-11">
            <Select
              name="country"
              label="Country"
              placeholder=" Select country"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={formik.values.country}
              onChange={onChangeCountry}
              options={countriesOptions}
              getOptionValue={(option) => option.value}
              suffix={<PiCaretUpDown className="h-5 w-5" />}
              displayValue={(selected) =>
                countriesOptions.find((c) => c.value === selected)?.name ?? ''
              }
              error={formik?.errors?.country}
            />
            <Input
              name="city"
              label="City"
              placeholder="City"
              onChange={formik.handleChange}
              error={formik?.errors?.city}
              value={formik.values.city}
            />
            <Input
              name="addressLineOne"
              label="Flat, House no., Building, Company, Apartment"
              placeholder="Enter your address"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik?.errors?.addressLineOne}
              value={formik.values.addressLineOne}
            />
            <Input
              name="zip"
              label="ZIP / Postcode"
              placeholder="ZIP / postcode"
              onChange={formik.handleChange}
              error={formik?.errors?.zip}
              value={formik.values.zip}
            />
          </FormGroup>

          <FormGroup
            title="Description"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <QuillEditor
              onChange={onChangeDescription}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              value={formik?.values?.description}
            />
          </FormGroup>

          <FormGroup
            title="Upload Company Logo"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <EditUploadProfilePhoto
              state={state}
              setState={setState}
              formik={formik}
              type={Constatnts.companies}
              id={editData?._id}
            />
          </FormGroup>

          <FormGroup
            title="Company Bio"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <QuillEditor
              label="Company Bio"
              value={formik?.values?.bio}
              onChange={onChangeBio}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          </FormGroup>

          <div className="relative mb-20">
            <FormGroup
              title="Add Sponsor Type"
              description="Assign sponsor type to companies"
              className="pt-8"
            >
              <CategoriesSelector formik={formik} type={Constatnts.event} label={'Sponsor Type'} />
            </FormGroup>
          </div>

          <FormGroup
            title="Sponsors URL"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <Input
              name="url"
              placeholder="xyz.com"
              label="URL"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik?.errors?.url}
              value={formik.values.url}
            />
          </FormGroup>
        </div>

        <FormFooter isLoading={state?.isLoading} submitBtnText={'Save'} />
      </form>
    </div>
  );
};
export default EditCompaniesEvent;