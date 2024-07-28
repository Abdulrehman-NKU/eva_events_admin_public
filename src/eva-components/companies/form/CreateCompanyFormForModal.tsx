'use client';
import { useEffect, useState } from 'react';

import cn from '@/utils/class-names';
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
import { Button } from '@/components/ui/button';
import { ICompanyData } from '@/eva-components/type/api.types';
import { emailFormate } from '@/eva-components/userDetails/userDetails';

interface ICreateCompanyFormForModal {
  handleClose: () => void;
  handleSuccess: (company: ICompanyData) => void;
  companyName: string;
}

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  country: '',
  city: '',
  addressLineOne: '',
  zip: '',
  description: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required("company name is required"),
  email: Yup.string(),
  phoneNumber: Yup.string().optional(),
  country: Yup.string().optional(),
  city: Yup.string(),
  addressLineOne: Yup.string().optional(),
  zip: Yup.string(),
  description: Yup.string().optional(),
});

const CreateCompanyFormForModal: React.FC<ICreateCompanyFormForModal> = ({
  handleClose,
  handleSuccess,
  companyName = '',
}) => {
  const [state, setState] = useState({
    isLoading: false,
    userInputToggle: 'off',
  });
  const router = useRouter();
  const pathname = usePathname();

  const onSubmitHandler = async (values: any) => {
    console.log('values>>', values);

    let companiesEventData = {
      company_name: values?.name,
      email: emailFormate(values?.email),
      phone: values?.phoneNumber,
      phone_country_code: values?.dialCode,
      country: values?.country,
      city: values?.city,
      address_line_1: values?.addressLineOne,
      zip: values?.zip,
      description: values?.description,
    };
    setState({
      ...state,
      isLoading: true,
    });
    let res = await CompaniesApi.creteCompaniesEvent(companiesEventData);

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        toast.success('Company created successfully');
        formik.resetForm();
        handleSuccess(res?.data?.data as ICompanyData);
        break;
      case ResponseCodes.ALREADY_EXIST:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error('Internal server error');
    }

    setState({
      ...state,
      isLoading: false,
    });

    console.log('res>>>', res);
  };

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      name: companyName,
    },
    validationSchema,
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const onChangeDescription = (e: any) => {
    formik.setFieldValue('description', e as any);
  };

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

  useEffect(() => {
    formik.setFieldValue('name', companyName);
  }, [companyName]);

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        <div className="mb-5">
          <h4 className="text-base font-medium">Create Company</h4>
        </div>
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          <FormGroup title="Name*" description="" className="pt-8">
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
              label="Email"
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
            />
          </FormGroup>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => handleClose()}
            className="w-full @xl:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={state?.isLoading}
            className="w-full @xl:w-auto"
          >
            save
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateCompanyFormForModal;
