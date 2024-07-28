'use client';
import { useState } from 'react';
import { PiEnvelopeSimple } from 'react-icons/pi';
import cn from '@/utils/class-names';
import FormFooter from '@/eva-components/form-footer';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import { PhoneNumber } from '@/components/ui/phone-input';
import QuillEditor from '@/components/ui/quill-editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import { MediaPartnerApi } from 'utils/api/user/MediaPartners';
import ResponseCodes from 'utils/response-codes';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MediaPartnersDetailType } from '@/eva-components/type/propsType';
import Constatnts from '@/eva-components/constatnt';
import CustomSelectBox from '@/eva-components/selectBox/CustomSelectBox';
import { geteventsSelectedDataFilter } from '@/eva-components/other/getData';
import EditUploadProfilePhoto from '@/eva-components/upload/EditUploadProfilePhoto';
import CompanySelector from '@/eva-components/selectBox/CompanySelector';
import CategoriesSelector from '@/eva-components/selectBox/CategoriesSelector';

const EditMediaPartnerForm = ({
  editData,
}: {
  editData: MediaPartnersDetailType;
}) => {
  const [state, setState] = useState({
    profilePhoto: null,
    isLoading: false,
    deletePhotoLoading: false,
    editProfilePhoto: editData?.logo || '',
  });

  const router = useRouter();

  const initialValues = {
    firstname: editData?.first_name || '',
    lastname: editData?.last_name || '',
    email: editData?.email || '',
    phoneNumber: `${editData?.phone_country_code}${editData?.phone}` || '',
    dialCode: editData?.phone_country_code || '',
    url: editData?.mediapartner_URL || '',
    description: editData?.description || '',
    eventsSelectData: geteventsSelectedDataFilter(editData?.events),
    profilePhotoErrorHandling: editData?.logo || '',
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
    firstname: Yup.string().required(messages.firstNameRequired),
    lastname: Yup.string().required(messages.lastNameRequired),
    email: Yup.string()
      .email(messages.invalidEmail)
      .required(messages.emailIsRequired),
    phoneNumber: Yup.string().optional(),
    dialCode: Yup.string().optional(),
    url: Yup.string().optional(),
    description: Yup.string().optional(),
    eventsSelectData: Yup.array().optional(),
    profilePhotoErrorHandling: Yup.string().optional(),
    job_title: Yup.string().optional(),
  });

  const onSubmitHandler = async (values: any) => {
    console.log('values>>', values, state);

    // if (!values?.company?.id) {
    //   toast.error('Company is required!');
    //   return;
    // }

    // if (!values?.category?.id) {
    //   toast.error('Category is required!');
    //   return;
    // }

    let formData = new FormData();
    formData.append('first_name', values.firstname);
    formData.append('last_name', values.lastname);
    formData.append('email', values.email);
    formData.append('description', values.description);
    formData.append('mediapartner_URL', values.url);
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
        formData.append('logo', state?.profilePhoto);
      }
    }

    if (values.eventsSelectData.length > 0) {
      for (let i = 0; i < values.eventsSelectData.length; i++) {
        formData.append(`events[]`, values?.eventsSelectData[i]?.id);
      }
    }

    setState({
      ...state,
      isLoading: true,
    });
    let res = await MediaPartnerApi.editMediaPartner(formData, editData?._id);

    console.log('res>>>', res);

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
  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          {/* <FormGroup
            title="Media Partner Info"
            className={cn(
              
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          ></FormGroup> */}

          <FormGroup
            title="Name"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <Input
              name="firstname"
              placeholder="First Name"
              label="First Name*"
              onChange={formik.handleChange}
              error={formik?.errors?.firstname}
              value={formik.values.firstname}
            />
            <Input
              name="lastname"
              placeholder="Last Name"
              label="Last Name*"
              onChange={formik.handleChange}
              error={formik?.errors?.lastname}
              value={formik.values.lastname}
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
            title="Media Partner Link"
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

          <div className="relative mb-20">
            <FormGroup
              title="Add Company"
              description="Assign company to media partners"
              className="pt-8"
            >
              <CompanySelector formik={formik} type={Constatnts.event} />
            </FormGroup>
          </div>

          <div className="relative mb-20">
            <FormGroup
              title="Add Category"
              description="Assign category to media partners"
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
              <CustomSelectBox formik={formik} type={Constatnts.event} />
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
            title="Upload Logo"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <EditUploadProfilePhoto
              state={state}
              setState={setState}
              formik={formik}
              type={Constatnts.mediaPartners}
              id={editData?._id}
            />
          </FormGroup>
        </div>

        <FormFooter isLoading={state?.isLoading} submitBtnText={'Edit'} />
      </form>
    </div>
  );
};
export default EditMediaPartnerForm;
