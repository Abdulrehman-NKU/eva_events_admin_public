'use client';
import { useEffect, useState } from 'react';
import { PiEnvelopeSimple, PiPlusBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import FormFooter from '@/eva-components/form-footer';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import { PhoneNumber } from '@/components/ui/phone-input';
import QuillEditor from '@/components/ui/quill-editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import Constatnts from '../constatnt';
import CustomSelectBox from '../selectBox/CustomSelectBox';
import UploadProfilePhoto from '../UploadProfilePhoto';
import { MediaPartnerApi } from 'utils/api/user/MediaPartners';
import ResponseCodes from 'utils/response-codes';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import CompanySelector from '../selectBox/CompanySelector';
import CategoriesSelector from '../selectBox/CategoriesSelector';
import { CommonEnums } from '@/enums/common.enums';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { emailFormate } from '../userDetails/userDetails';

interface IndexProps {
  slug?: string;
  className?: string;
}
const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  job_title: '',
  dialCode: '',
  url: '',
  description: '',
  eventsSelectData: [],
  profilePhotoErrorHandling: '',
  company: {
    id: '',
    name: '',
  },
  category: {
    id: '',
    name: '',
  },
  telephone: '',
};

const validationSchema = Yup.object({
  firstname: Yup.string().required(messages.firstNameRequired),
  lastname: Yup.string().required(messages.lastNameRequired),
  email: Yup.string()
    .email(messages.invalidEmail)
    .required(messages.emailIsRequired),
  phoneNumber: Yup.string().optional(),
  job_title: Yup.string().optional(),
  dialCode: Yup.string().optional(),
  url: Yup.string().optional(),
  description: Yup.string().optional(),
  eventsSelectData: Yup.array().optional(),
  profilePhotoErrorHandling: Yup.string().optional(),
});

const MediaPartnersForm: React.FC<IndexProps> = ({ slug, className }) => {
  const [state, setState] = useState({
    profilePhoto: null,
    isLoading: false,
    eventDetails: null,
  });

  const router = useRouter();

  const searchParams = useSearchParams();

  const eventId = searchParams.get(CommonEnums.path.event_id);
  const redirectUrl = searchParams.get(CommonEnums.path.redirect_url);

  const getEventDetails = async () => {
    if (!eventId) return;

    let res = await EventsApiServices.getEventsById(eventId);

    console.log('event res >>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          eventDetails: res?.data?.data,
        });

        formik.setFieldValue('eventsSelectData', [
          {
            id: res?.data?.data?._id,
            name: res?.data?.data?.name,
          },
        ]);

        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Event not found!');
        router.push(redirectUrl as string);

        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getEventDetails();
  }, [eventId]);

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
    formData.append('email', emailFormate(values?.email));
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
    if (state?.profilePhoto !== null) {
      formData.append('logo', state?.profilePhoto);
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
    let res = await MediaPartnerApi.addMediaPartner(formData);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        // toast.success(res?.data?.message);
        formik.resetForm();
        if (eventId) {
          toast.success(
            `Media Partner has been created and assigned to ${
              (state?.eventDetails as any)?.name ?? ''
            } event successfully!`
          );
          router.push(redirectUrl as string);
          return;
        }
        toast.success(res?.data?.message);
        router.back();
        break;
      case ResponseCodes.ALREADY_EXIST:
        toast.error(res?.data?.message);
        break;

      case ResponseCodes.UPLOAD_FAILED:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.CREATE_FAILED:
        toast.error(res?.data?.message);
        break;

      case ResponseCodes.REGISTRATION_CONFORMATION_MAIL_NOT_SENT:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error('Internal server error');
    }

    setState({
      ...state,
      isLoading: false,
      profilePhoto: null,
    });
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

  let formSubtitle = 'Media Partner Info';

  if (eventId)
    formSubtitle = `Creating new media partner for event ${
      (state?.eventDetails as any)?.name ?? ''
    }`;

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
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          ></FormGroup> */}

          <FormGroup
            title={formSubtitle}
            // description="Update your photo and personal details here"
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          ></FormGroup>

          <FormGroup
            title="Name"
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
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
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
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
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          >
            <QuillEditor
              label="Description"
              onChange={onChange}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
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
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          >
            <UploadProfilePhoto
              state={state}
              setState={setState}
              formik={formik}
            />
          </FormGroup>
        </div>

        <FormFooter
          isLoading={state?.isLoading}
          submitBtnText={'Create Media Partner'}
        />
      </form>
    </div>
  );
};
export default MediaPartnersForm;

let roles = [
  {
    name: 'Admin',
    value: 'admin',
  },
  {
    name: 'Exhibitor',
    value: 'exhibitor',
  },
  {
    name: 'Delegate',
    value: 'delegate',
  },
  {
    name: 'Sponsor',
    value: 'sponsor',
  },
  {
    name: 'Speaker',
    value: 'speaker',
  },
  {
    name: 'Media Partner',
    value: 'media_partner',
  },
];
