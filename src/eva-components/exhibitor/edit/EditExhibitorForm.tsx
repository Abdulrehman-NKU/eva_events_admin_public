'use client';
import { useState } from 'react';
import cn from '@/utils/class-names';
import FormFooter from '@/eva-components/form-footer';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import { PhoneNumber } from '@/components/ui/phone-input';
import QuillEditor from '@/components/ui/quill-editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import { useRouter } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import CustomSelectBox from '@/eva-components/selectBox/CustomSelectBox';
import Constatnts from '@/eva-components/constatnt';
import { ExhibitorDetailType } from '@/eva-components/type/propsType';
import { geteventsSelectedDataFilter } from '@/eva-components/other/getData';
import EditUploadProfilePhoto from '@/eva-components/upload/EditUploadProfilePhoto';
import { ExhibitorApi } from 'utils/api/user/Exhibitor';
import CountrySelectBox from '@/eva-components/selectBox/CountrySelectBox';
import CompanySelector from '@/eva-components/selectBox/CompanySelector';
import CategoriesSelector from '@/eva-components/selectBox/CategoriesSelector';

const EditExhibitorForm = ({ editData }: { editData: ExhibitorDetailType }) => {
  const [state, setState] = useState({
    profilePhoto: null,
    isLoading: false,
    deletePhotoLoading: false,
    editProfilePhoto: editData?.exhibitor_logo || '',
  });
  const router = useRouter();

  const initialValues = {
    exhibitorName: editData?.exhibitor_name,
    firstName: editData?.first_name || '',
    lastName: editData?.last_name || '',
    email: editData?.email || '',
    phoneNumber: `${editData?.phone_country_code}${editData?.phone}` || '',
    dialCode: editData?.phone_country_code || '',
    url: editData?.exhibitor_URL || '',
    country: editData?.country || '',
    // state: '',
    city: editData?.city || '',
    // zip: editData?.zip || '',
    // addressLineOne: editData?.address_line_1 || '',
    // addressLineTwo: '',
    eventsSelectData: geteventsSelectedDataFilter(editData?.events),
    description: editData?.description || '',
    profilePhotoErrorHandling: editData?.exhibitor_logo || '',
    job_title: editData?.job_title || '',
    company: {
      id: editData?.company?._id || '',
      name: editData?.company?.company_name || '',
    },
    category: {
      id: editData?.category?._id || '',
      name: editData?.category?.category_name || '',
    },
    telephone: editData?.telephone ?? '',
  };

  const validationSchema = Yup.object({
    exhibitorName: Yup.string().required(messages.nameIsRequired),
    firstName: Yup.string().required(messages.firstNameRequired),
    lastName: Yup.string().required(messages.lastNameRequired),
    email: Yup.string()
      .email(messages.invalidEmail)
      .required(messages.emailIsRequired),
    phoneNumber: Yup.string().optional(),
    url: Yup.string().optional(),
    country: Yup.string().optional(),
    city: Yup.string().optional(),
    // zip: Yup.string().optional(),
    // addressLineOne: Yup.string().optional(),
    // addressLineTwo: Yup.string().optional(),
    description: Yup.string().optional(),
    // selectevents: Yup.string().optional(''),
    eventsSelectData: Yup.array().optional(),
    dialCode: Yup.string().optional(),
    profilePhotoErrorHandling: Yup.string().optional(),
    job_title: Yup.string().optional(),
  });

  const onSubmitHandler = async (values: any) => {
    console.log('values>>', values);

    // if (!values?.company?.id) {
    //   toast.error('Company is required!');
    //   return;
    // }

    // if (!values?.category?.id) {
    //   toast.error('Category is required!');
    //   return;
    // }

    let formData = new FormData();
    formData.append('exhibitor_name', values.exhibitorName);
    formData.append('first_name', values.firstName);
    formData.append('last_name', values.lastName);
    formData.append('description', values.description);
    // formData.append('sponsor_URL', values.url);
    formData.append('city', values.city);
    // formData.append('zip', values.zip);
    // formData.append('state', values.state);
    formData.append('exhibitor_URL', values.url);
    formData.append('country', values.country);
    // formData.append('address_line_1', values.addressLineOne);
    // formData.append('address_line_2', values.addressLineTwo);
    formData.append('email', values.email);
    formData.append('company_id', values?.company?.id);
    formData.append('category_id', values?.category?.id);
    formData.append('job_title', values?.job_title);
    formData.append('telephone', values?.telephone);

    if (values?.phoneNumber) {
      let length = values?.dialCode.length;
      let phoneNumberSlice = values?.phoneNumber?.slice(length);
      formData.append('phone_country_code', values.dialCode);
      formData.append('phone', phoneNumberSlice);
    }

    if (!state?.editProfilePhoto) {
      if (state?.profilePhoto !== null) {
        formData.append('exhibitor_logo', state?.profilePhoto);
      }
    }

    if (values.eventsSelectData.length > 0) {
      for (let i = 0; i < values.eventsSelectData.length; i++) {
        formData.append(`events[${i}]`, values?.eventsSelectData[i]?.id);
      }
    }

    setState({
      ...state,
      isLoading: true,
    });
    let res = await ExhibitorApi?.editExhibitor(formData, editData?._id);

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        // router.push(routes.user.exhibitors);
        router.back();
        formik.resetForm();
        setState({
          ...state,
          isLoading: false,
          profilePhoto: null,
        });
        break;

      case ResponseCodes.UPLOAD_FAILED:
        toast.error(res?.data?.message);
        setState({
          ...state,
          isLoading: false,
        });
        break;

      default:
        setState({
          ...state,
          isLoading: false,
        });
        toast.error('Internal server error');
    }

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

  const onChangeNumber = (value: any, data: any) => {
    formik.setFieldValue('phoneNumber', value);
    formik.setFieldValue('dialCode', data?.dialCode);
  };
  const onChange = (e: any) => {
    formik.setFieldValue('description', e as any);
  };

  console.log('formik-ehibitor', formik.values.eventsSelectData);

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        {/* <div className="mb-5">
          <h4 className="text-base font-medium">Exhibitor Info</h4>
          <p className="mt-2">Update your photo and personal details here</p>
        </div> */}

       
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
        <FormGroup title="Exhibitor Name" className="pt-8">
          <Input
            name="exhibitorName"
            placeholder="Exhibitor Name"
            label="Exhibitor Name*"
            className="col-span-full"
            onChange={formik.handleChange}
            error={formik.errors.exhibitorName}
            value={formik.values.exhibitorName}
          />
        </FormGroup>
          <FormGroup
            title="Representative Info"
            description="Add representative info here"
            className="pt-8"
          >
            <Input
              name="firstName"
              placeholder="First Name"
              label="First Name*"
              className="flex-grow"
              onChange={formik.handleChange}
              error={formik.errors.firstName}
              value={formik.values.firstName}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              label="Last Name*"
              className="flex-grow"
              onChange={formik.handleChange}
              error={formik.errors.lastName}
              value={formik.values.lastName}
            />

            <Input
              name="email"
              placeholder="Email"
              label="Email*"
              className="flex-grow"
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
            />

            <PhoneNumber
              country="gb"
              label="Phone number"
              // className="flex-grow"
              // className="col-span-full"
              onChange={onChangeNumber}
              error={formik.errors.phoneNumber}
              value={formik.values.phoneNumber}
            />

            <Input
              name="telephone"
              placeholder="Enter telephone number"
              label="Telephone Number"
              onChange={formik.handleChange}
              error={formik?.errors?.telephone}
              value={formik.values.telephone}
              type="number"
            />
          </FormGroup>

          {/* <FormGroup
            title="Exhibitor  URL"
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
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
          </FormGroup> */}

          <FormGroup
            title="Job Title"
            // description=""
            className="pt-8"
          >
            <Input
              name="job_title"
              placeholder="Enter job title"
              label="Job Title"
              className="col-span-full"
              onChange={formik.handleChange}
              error={formik?.errors?.job_title}
              value={formik.values.job_title}
            />
          </FormGroup>

          <FormGroup
            title="Exhibitor Link"
            description="Add social link here"
            className="pt-8"
          >
            <Input
              name="url"
              placeholder="xyz.com"
              label="URL"
              className="col-span-full"
              onChange={formik.handleChange}
              error={formik?.errors?.url}
              value={formik.values.url}
            />
          </FormGroup>

          <FormGroup
            title="Description"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <QuillEditor
              label="Description"
              onChange={onChange}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              value={formik?.values?.description}
            />
          </FormGroup>

          <FormGroup title="Address" className={'pt-7 @2xl:pt-9 @3xl:pt-11'}>
            {/* <Input
              name="country"
              label="Country"
              placeholder="Country"
              onChange={formik.handleChange}
              error={formik?.errors?.country}
              value={formik.values.country}
            /> */}
            <CountrySelectBox formik={formik} />
            {/* <Input
              name="state"
              label="State"
              placeholder="State"
              onChange={formik.handleChange}
              error={formik?.errors?.state}
              value={formik.values.state}
            /> */}
            <Input
              name="city"
              label="City"
              placeholder="City"
              onChange={formik.handleChange}
              error={formik?.errors?.city}
              value={formik.values.city}
            />

            {/* <Input
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
            /> */}

            {/* <Input
              name="addressLineTwo"
              label="Nearest Area, Street"
              placeholder="Enter your address"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik?.errors?.addressLineTwo}
              value={formik.values.addressLineTwo}
            /> */}
          </FormGroup>

          <div className="relative mb-20">
            <FormGroup
              title="Add Company"
              description="Assign company to exhibitor"
              className="pt-8"
            >
              <CompanySelector formik={formik} type={Constatnts.event} />
            </FormGroup>
          </div>

          <div className="relative mb-20">
            <FormGroup
              title="Add Category"
              description="Assign category to exhibitor"
              className="pt-8"
            >
              <CategoriesSelector formik={formik} type={Constatnts.event} />
            </FormGroup>
          </div>

          <div className=" relative mb-20">
            <FormGroup
              title="Invite to an event"
              description="Choose an event to invite them to"
              className="pt-8"
            >
              <CustomSelectBox formik={formik} type={Constatnts?.event} />
            </FormGroup>

            {/* <div className=" absolute left-0 mt-3">
              <Button
                variant="outline"
                className="col-span-full ml-auto w-auto"
              >
                <PiPlusBold className="me-2 h-4 w-4" />
                Add New Event
              </Button>
            </div> */}
          </div>
          <FormGroup
            title="Exhibitor Logo"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <EditUploadProfilePhoto
              state={state}
              setState={setState}
              formik={formik}
              type={Constatnts.exhibitors}
              id={editData?._id}
            />
          </FormGroup>
        </div>

        <FormFooter isLoading={state?.isLoading} submitBtnText={'Edit'} />
      </form>
    </div>
  );
};
export default EditExhibitorForm;
