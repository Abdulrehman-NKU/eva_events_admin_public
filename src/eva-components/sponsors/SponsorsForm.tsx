'use client';
import { useEffect, useState } from 'react';
import { PiCaretUpDown, PiEnvelopeSimple, PiPlusBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import FormFooter from '@/eva-components/form-footer';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import { PhoneNumber } from '@/components/ui/phone-input';
import QuillEditor from '@/components/ui/quill-editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import UploadProfilePhoto from '../UploadProfilePhoto';
import CustomSelectBox from '../selectBox/CustomSelectBox';
import Constatnts from '../constatnt';
import { SponsorApi } from 'utils/api/user/Sponsor';
import ResponseCodes from 'utils/response-codes';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
import Select from '@/components/ui/select';
import { countries } from '../CountriesSelecteData';
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
  name: '',
  sponsorType: '',
  email: '',
  phoneNumber: '',

  dialCode: '',
  representativeFirstname: '',
  representativeLastname: '',
  url: '',
  country: '',
  state: '',
  city: '',
  // zip: '',
  // addressLineOne: '',
  // addressLineTwo: '',
  eventsSelectData: [],
  description: '',
  profilePhotoErrorHandling: '',
  job_title: '',
  company: {
    id: '',
    name: '',
  },
  category: {
    id: '',
    name: '',
  },
  telephone: '',

  // selectevents: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required(messages.nameIsRequired),
  sponsorType: Yup.string().optional(),
  email: Yup.string()
    .email(messages.invalidEmail)
    .required(messages.emailIsRequired),
  phoneNumber: Yup.string().optional(),
  representativeFirstname: Yup.string().required(messages.firstNameRequired),
  representativeLastname: Yup.string().required(messages.lastNameRequired),
  url: Yup.string().optional(),
  country: Yup.string().optional(),
  state: Yup.string().optional(),
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

const SponsorsForm: React.FC<IndexProps> = ({ slug, className }) => {
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
    let formData = new FormData();
    formData.append('sponsor_name', values.name);
    formData.append('sponsor_description', values.description);
    formData.append('sponsor_URL', values.url);
    formData.append('city', values.city);
    formData.append('sponsor_type', values.sponsorType);
    formData.append('country', values.country);
    formData.append('representative_firstname', values.representativeFirstname);
    formData.append('representative_lastname', values.representativeLastname);
    formData.append('email', emailFormate(values?.email));
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
      formData.append('sponsor_logo', state?.profilePhoto);
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
    let res = await SponsorApi.addSponsor(formData);

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        formik.resetForm();
        if (eventId) {
          toast.success(
            `Sponsor has been created and assigned to ${
              (state?.eventDetails as any)?.name ?? ''
            } event successfully!`
          );
          router.push(redirectUrl as string);
          return;
        }
        toast.success(res?.data?.message);
        router.push(routes.user.sponsors);
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
        toast.error(res?.data?.data?.message || 'Internal server error');
    }

    setState({
      ...state,
      isLoading: false,
      profilePhoto: null,
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

  const onChangeNumber = (value: any, data: any) => {
    formik.setFieldValue('phoneNumber', value);
    formik.setFieldValue('dialCode', data?.dialCode);
  };

  const onChange = (e: any) => {
    formik.setFieldValue('description', e as any);
  };
  const countriesOptions = countries.map((country) => ({
    value: country.country_name,
    name: country.country_name,
  }));

  const onChangeCountry = (selectedCountry: any) => {
    console.log('Selected country in onChange:', selectedCountry);
    formik.setFieldValue('country', selectedCountry);
  };

  let formSubtitle = 'Sponsor Info';

  if (eventId)
    formSubtitle = `Creating new sponsor for event ${
      (state?.eventDetails as any)?.name ?? ''
    }`;
  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          <FormGroup
            title={formSubtitle}
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          ></FormGroup>
          <FormGroup
            title="Sponsor Name"
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          >
            <Input
              name="name"
              label="Sponsor Name*"
              placeholder="Enter sponsor name"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik?.errors?.name}
              value={formik.values.name}
            />
          </FormGroup>

          <FormGroup
            title="Sponsor Type"
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          >
            <Input
              name="sponsorType"
              label="Sponsor Type"
              placeholder="Enter sponsor type"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik?.errors?.sponsorType}
              value={formik.values.sponsorType}
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
              type="text"
              label="Email*"
              placeholder="Enter your email"
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
            title="Representative"
            className={cn(
              className,
              'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
            )}
          >
            <Input
              name="representativeFirstname"
              placeholder="First Name"
              label="First Name*"
              onChange={formik.handleChange}
              error={formik?.errors?.representativeFirstname}
              value={formik.values.representativeFirstname}
            />
            <Input
              name="representativeLastname"
              placeholder="Last Name"
              label="Last Name*"
              onChange={formik.handleChange}
              error={formik?.errors?.representativeLastname}
              value={formik.values.representativeLastname}
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
            title="Sponsors URL"
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
              value={formik?.values?.description}
              onChange={onChange}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          </FormGroup>

          <FormGroup
            title="Address"
            className={(cn(className), 'pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
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

            {/* <Textarea
              name="address"
              label="Street Address"
              placeholder="Enter your address"
              textareaClassName="h-20"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik?.errors?.address}
              value={formik.values.address}
            /> */}

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
              description="Assign company to sponsors"
              className="pt-8"
            >
              <CompanySelector formik={formik} type={Constatnts.event} />
            </FormGroup>
          </div>

          <div className="relative mb-20">
            <FormGroup
              title="Add Category"
              description="Assign category to sponsors"
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
            title="Upload Sponsor Logo"
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
          submitBtnText={'Create Sponsor'}
        />
      </form>
    </div>
  );
};
export default SponsorsForm;

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
