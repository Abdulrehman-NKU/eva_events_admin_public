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
import { ExhibitorApi } from 'utils/api/ExhibitorApi';
import ResponseCodes from 'utils/response-codes';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
import CustomSelectBox from '@/eva-components/selectBox/CustomSelectBox';
import Constatnts from '@/eva-components/constatnt';
import UploadProfilePhoto from '@/eva-components/UploadProfilePhoto';
import CountrySelectBox from '@/eva-components/selectBox/CountrySelectBox';
import UploadMultiFiles from '@/eva-components/upload/UploadMultiFiles';
import { UploadApi } from 'utils/api/Upload';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { PiAlignCenterHorizontalSimpleDuotone } from 'react-icons/pi';
import { HotelApi } from 'utils/api/Hotel';
import { emailFormate } from '@/eva-components/userDetails/userDetails';

const initialValues = {
  hotelName: '',
  email: '',
  phoneNumber: '',
  dialCode: '',
  url: '',
  country: '',
  city: '',
  zip: '',
  addressLineOne: '',
  eventsSelectData: [],
  description: '',
  profilePhotoErrorHandling: '',
};

const validationSchema = Yup.object({
  hotelName: Yup.string().required(messages.firstNameRequired),
  email: Yup.string().email(messages.invalidEmail).optional(),
  phoneNumber: Yup.string().optional(),
  dialCode: Yup.string().optional(),
  url: Yup.string().optional(),
  country: Yup.string().required(messages.countryIsRequired),
  city: Yup.string().optional(),
  zip: Yup.string().optional(),
  addressLineOne: Yup.string().optional(),
  description: Yup.string().optional(),
  eventsSelectData: Yup.array().optional(),
  profilePhotoErrorHandling: Yup.string().optional(),
});

const HotelCreateForm = () => {
  const [state, setState] = useState<any>({
    profilePhoto: null,
    isLoading: false,
    selectedImages: [],
    drag: false,
  });
  const router = useRouter();

  const posterImageHandler = async () => {
    let poster_Id_Array: string[] = [];
    let formData = new FormData();
    for (let i = 0; i < state?.selectedImages?.length; i++) {
      formData.append(`file`, state?.selectedImages[i]);
    }
    let res = await UploadApi.uploadPosterImage(formData);

    console.log('res>>>', res);

    if (res.response_code === ResponseCodes.UPLOAD_SUCCESS) {
      poster_Id_Array = res.data.data.map((data: any) => {
        return data?._id;
      });
    } else {
      toast.error('Image upload failed please reload!');
    }

    console.log('values>>>', res, poster_Id_Array);
    return poster_Id_Array;
  };

  const onSubmitHandler = async (values: any) => {
    // console.log('values>>>');
    setState({
      ...state,
      isLoading: true,
    });

    if (state.selectedImages.length > 0) {
      let poster_id_array = await posterImageHandler();
      hotelFormApi(values, poster_id_array);
    } else {
      hotelFormApi(values, []);
    }
  };

  const hotelFormApi = async (values: any, poster_id_array: string[]) => {
    let phone_country_code_update = '';
    let dial_code_update = '';
    let event_id_array = [];
    if (values?.phoneNumber) {
      let length = values?.dialCode.length;
      let phoneNumberSlice = values?.phoneNumber?.slice(length);
      phone_country_code_update = phoneNumberSlice;
      dial_code_update = values.dialCode;
    }

    if (values?.eventsSelectData.length > 0) {
      event_id_array = values?.eventsSelectData?.map(
        ({ id }: { id: string }) => {
          return id;
        }
      );
    }
    let formData = {
      hotel_name: values?.hotelName,
      description: values?.description,
      hotel_url: values?.url,
      hotel_email: emailFormate(values?.email),
      phone: phone_country_code_update,
      phone_country_code: dial_code_update,
      country: values?.country,
      city: values?.city,
      zip: values?.zip,
      address_line_1: values?.addressLineOne,
      events: event_id_array,
      hotel_images: poster_id_array,
    };

    let res = await HotelApi.createHotel(formData);

    console.log('res>>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        router.back();
        toast.success('Hotel created successfully');
        formik.resetForm();
        break;
      case ResponseCodes.ALREADY_EXIST:
        toast.error(res?.data?.message);
        break;

      case ResponseCodes.FAILED:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.CREATE_FAILED:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error('Internal server error');
    }

    setState({
      ...state,
      isLoading: false,
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

  const onDropfileUploadHandler = (e: any) => {
    e.preventDefault();
    let dropFiles = e?.dataTransfer?.files;

    if (state?.selectedImages === null) {
      setState({
        ...state,
        selectedImages: [...dropFiles],
        drag: false,
      });
    } else {
      setState({
        ...state,
        selectedImages: [...state?.selectedImages, ...dropFiles],
        drag: false,
      });
    }
    (e.target as HTMLInputElement).value = '';
  };
  const onDragOverfileUploadHandler = (e: any) => {
    e.preventDefault();
  };

  const onDragEnterfileUploadHandler = () => {
    setState({
      ...state,
      drag: true,
    });
  };

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
        onDrop={onDropfileUploadHandler}
        onDragOver={onDragOverfileUploadHandler}
        onDragEnter={onDragEnterfileUploadHandler}
      >
        <div className="mb-5">
          <h4 className="text-base font-medium">Hotel Info</h4>
          <p className="mt-2">Update photos and hotel details here</p>
        </div>
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          <FormGroup title="Hotel Name*" description="" className="pt-8">
            <Input
              name="hotelName"
              placeholder="Hotel name"
              // label="First Name"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik.errors.hotelName}
              value={formik.values.hotelName}
            />
          </FormGroup>

          <FormGroup title="Contact info" description="" className="pt-8">
            <Input
              name="email"
              placeholder="Email"
              // label="Email"
              className="flex-grow"
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
            />

            <PhoneNumber
              country="gb"
              // label="Phone number"
              className="flex-grow"
              onChange={onChangeNumber}
              error={formik.errors.phoneNumber}
              value={formik.values.phoneNumber}
            />
          </FormGroup>

          <FormGroup
            title="Hotel website"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <Input
              name="url"
              placeholder="xyz.com"
              // label="URL"
              className="col-span-2"
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
              // label="Description"
              onChange={onChange}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          </FormGroup>

          <FormGroup
            title="Hotel Address"
            className={'pt-7 @2xl:pt-9 @3xl:pt-11'}
          >
            <CountrySelectBox formik={formik} />

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
          <div className=" relative mb-20">
            <FormGroup
              title="This hotel is currently listed on selected events"
              description="Whereby it will show a list of events the hotel is currently listed on"
              className="pt-8"
            >
              <CustomSelectBox formik={formik} type={Constatnts?.event} />
            </FormGroup>
          </div>
          <FormGroup
            title="Upload hotel images"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <UploadMultiFiles state={state} setState={setState} />
          </FormGroup>
        </div>

        <FormFooter
          isLoading={state?.isLoading}
          submitBtnText={'Create Hotel'}
        />
      </form>
    </div>
  );
};
export default HotelCreateForm;
