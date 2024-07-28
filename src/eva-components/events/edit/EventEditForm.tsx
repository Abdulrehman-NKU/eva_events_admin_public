'use client';

import { useState, useEffect } from 'react';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@/components/ui/datepicker';
import QuillEditor from '@/components/ui/quill-editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PiCaretUpDown } from 'react-icons/pi';
import { messages } from '@/config/messages';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import toast from 'react-hot-toast';
import Select from '@/components/ui/select';
import ResponseCodes from 'utils/response-codes';
import { useRouter } from 'next/navigation';
import { UploadApi } from 'utils/api/Upload';
import { Input } from 'rizzui';
import Constatnts from '@/eva-components/constatnt';
import { EventListType } from '@/eva-components/type/userListType';
import EditUploadMultiFiles from '@/eva-components/upload/EditUploadMultiFiles';
import EditUploadProfilePhoto from '@/eva-components/upload/EditUploadProfilePhoto';
import CountrySelectBox from '@/eva-components/selectBox/CountrySelectBox';
import FormFooter from '@/eva-components/form-footer';
import EditEventLogo from '../EditEventLogo';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { timezones } from '../../TimezoneSelectData';
import moment from 'moment';

import { Modal, Title } from 'rizzui';
import Spinner from '@/components/ui/spinner';
import { FieldError } from '@/components/ui/field-error';
import { formHelperTextClasses } from '@mui/material';

let uploadedEventLogo: string = '';
let timePickerColorCode = "#110f0e";

const EventEditForm = ({ editData }: { editData: EventListType }) => {
  const router = useRouter();
  const [state, setState] = useState<any>({
    profilePhoto: null,
    isLoading: false,
    selectedImages: [],
    editProfilePhoto: editData?.featured_image || '',
    eventLogo: editData?.event_logo || '',
    updatedEventLogo: null,
    deletePhotoLoading: false,
    isDeletingLogo: false,
    editSelectedImages: editData?.poster_images,
    drag: false,
    isLoadingText: '',
  });
  //console.log("editData" , editData );
  var eventStartTime = '';
  var eventEndTime = '';
  if( editData?.start_time ){
  	eventStartTime = moment(editData?.start_time, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  }
  if( editData?.end_time ){
  	eventEndTime = moment(editData?.end_time, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  }	
  const initialValues = {
    name: editData?.name || '',
    time_zone: editData?.time_zone || '',
    start_time: eventStartTime || null,
    end_time: eventEndTime || null,
    start_date: new Date(editData?.start_date),
    end_date: new Date(editData?.end_date),
    description: editData?.description || '',
    country: editData?.venue_country || '',
    city: editData?.venue_city || '',
    zip: editData?.venue_zip || '',
    addressLineOne: editData?.venue_address_line_1 || '',
    // delegatesSelectData: getUserSelectedData(
    //   editData?.delegates,
    //   Constatnts?.delegate
    // ),
    // exhibitorsSelectData: getUserSelectedData(
    //   editData?.exhibitors,
    //   Constatnts?.exhibitor
    // ),
    // speakersSelectData: getUserSelectedData(
    //   editData?.speakers,
    //   Constatnts?.speaker
    // ),
    // sponsorsSelectData: getUserSelectedData(
    //   editData?.sponsors,
    //   Constatnts?.sponsor
    // ),
    // mediaPartnersSelectData: getUserSelectedData(
    //   editData?.media_partners,
    //   Constatnts?.mediaPartner
    // ),
    profilePhotoErrorHandling: editData?.featured_image || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(messages.nameIsRequired),
    start_date: Yup.date().required(messages.startDateIsRequired),
    start_time: Yup.string().required(messages.startTimeIsRequired),
    end_time: Yup.string().required(messages.endTimeIsRequired),
    country: Yup.string().required(messages.countryIsRequired),
    city: Yup.string().required(messages.cityIsRequired),
    zip: Yup.string().required(messages.zipCodeRequired),
    addressLineOne: Yup.string().required(messages.addressLineOneRequired),
    // delegatesSelectData: Yup.array().optional(),
    // exhibitorsSelectData: Yup.array().optional(),
    // speakersSelectData: Yup.array().optional(),
    // sponsorsSelectData: Yup.array().optional(),
    // mediaPartnersSelectData: Yup.array().optional(),
    profilePhotoErrorHandling: Yup.string().required(messages.imageRequired),
  });

  const uploadLogo = async () => {
    if (!state?.updatedEventLogo) {
      uploadedEventLogo = '';
      return true;
    }

    setState({
      ...state,
      isLoading: true,
      isLoadingText: 'Uploading files...',
    });

    let formData = new FormData();

    formData.append(`file`, state?.updatedEventLogo);

    let res = await UploadApi.uploadPosterImage(formData);

    if (res?.data?.response_code !== ResponseCodes.UPLOAD_SUCCESS) {
      toast.error('Upload failed for event logo, please try again!');
      return false;
    }

    uploadedEventLogo = res?.data?.data[0]?.file_url;

    return true;
  };

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

    return poster_Id_Array;
  };

  const onSubmitHandler = async (values: any) => {
    // console.log('values>>>');
    setState({
      ...state,
      isLoading: true,
    });

    if (state.selectedImages.length > 0) {
      let [poster_id_array, uploadLogoRes] = await Promise.all([
        posterImageHandler(),
        uploadLogo(),
      ]);

      if (!uploadLogoRes) {
        setState({
          ...state,
          isLoading: false,
          isLoadingText: '',
        });

        return;
      }

      eventFormApi(values, poster_id_array);
    } else {
      const uploadLogoRes = await uploadLogo();

      if (!uploadLogoRes) {
        setState({
          ...state,
          isLoading: false,
          isLoadingText: '',
        });

        return;
      }

      eventFormApi(values, []);
    }
  };

  const eventFormApi = async (values: any, poster_id_array: string[]) => {
    
    if( values?.end_date ) {
    	const momentStartDate = moment(values?.start_date).format('YYYY-MM-DD');
		const momentEndDate = moment(values?.end_date).format('YYYY-MM-DD');
		
		if( moment(momentStartDate).isSame(moment(momentEndDate)) ){
			//console.log("sss");
			//console.log("start time" , values?.start_time );
			//console.log("end_time time" , values?.end_time );
			
			if( values?.start_time &&  values?.end_time ){
				
				const momentStartTime = moment(values?.start_time, 'YYYY-MM-DD HH:mm:ss');
				const momentEndTime = moment(values?.end_time, 'YYYY-MM-DD HH:mm:ss');
				
				if( momentEndTime.isBefore(momentStartTime) ){
					toast.error('Event Start time Should be Before End Time');
				    return false;
				}
			}
			
		}
    }
    
    setState({
      ...state,
      isLoading: true,
      isLoadingText: 'Updating event details please wait...',
    });

    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('venue_city', values.city);
    formData.append('venue_zip', values.zip);

    // formData.append('venue_state', values.state);
    formData.append('venue_country', values.country);
    formData.append('venue_address_line_1', values.addressLineOne);
    // formData.append('venue_address_line_2', values.addressLineTwo);
    formData.append('start_date', values?.start_date?.toISOString());
    formData.append('end_date', values?.end_date?.toISOString());
    
    if(values?.start_time){
    	const isFullStartDateTime = moment(values?.start_time, 'YYYY-MM-DD HH:mm:ss', true).isValid();
    	const isStartTimeOnly = moment(values?.start_time, 'HH:mm:ss', true).isValid();
    	
    	if( isFullStartDateTime ){
    		formData.append('start_time', moment(values?.start_time).format("HH:mm:ss"));
    	}
    	if( isStartTimeOnly ){
    		formData.append('start_time', values?.start_time);
    	}
    } else {
    	formData.append('start_time', values?.start_time);
    }
    
    if(values?.end_time){
    	const isFullEndDateTime = moment(values?.end_time, 'YYYY-MM-DD HH:mm:ss', true).isValid();
    	const isEndTimeOnly = moment(values?.end_time, 'HH:mm:ss', true).isValid();
    	
    	if( isFullEndDateTime ){
    		formData.append('end_time', moment(values?.end_time).format("HH:mm:ss"));
    	}
    	if( isEndTimeOnly ){
    		formData.append('end_time', values?.end_time);
    	}
    	
    } else {
    	formData.append('end_time', values?.end_time);
    }
    
    
    formData.append('time_zone', values?.time_zone);
    
    var selectedTimeZoneValue = '';
    timezones.map(timezone => {
      if( timezone.timezone_name == values?.time_zone ){
        selectedTimeZoneValue = timezone.timezone_value;
      } 
    });

   
   // console.log(selectedTimeZoneValue)
    formData.append('time_zone_value', selectedTimeZoneValue);

    if (!state?.editProfilePhoto) {
      if (state?.profilePhoto !== null) {
        formData.append('featured_image', state?.profilePhoto);
      }
    }

    if (poster_id_array?.length > 0) {
      for (let i = 0; i < poster_id_array.length; i++) {
        formData.append(`poster_images[]`, poster_id_array[i]);
      }
    }

    if (state?.editSelectedImages?.length > 0) {
      for (let i = 0; i < state?.editSelectedImages?.length; i++) {
        formData.append(`poster_images[]`, state?.editSelectedImages[i]?._id);
      }
    }

    if (uploadedEventLogo) {
      formData.append('event_logo', uploadedEventLogo);
    } else formData.append('event_logo', state?.eventLogo ?? '');

    // if (values.delegatesSelectData.length > 0) {
    //   for (let i = 0; i < values.delegatesSelectData.length; i++) {
    //     formData.append(`delegates[]`, values?.delegatesSelectData[i]?.id);
    //   }
    // }
    // if (values.exhibitorsSelectData.length > 0) {
    //   for (let i = 0; i < values.exhibitorsSelectData.length; i++) {
    //     formData.append(`exhibitors[]`, values?.exhibitorsSelectData[i]?.id);
    //   }
    // }
    // if (values.speakersSelectData.length > 0) {
    //   for (let i = 0; i < values.speakersSelectData.length; i++) {
    //     formData.append(`speakers[]`, values?.speakersSelectData[i]?.id);
    //   }
    // }
    // if (values.sponsorsSelectData.length > 0) {
    //   for (let i = 0; i < values.sponsorsSelectData.length; i++) {
    //     formData.append(`sponsors[]`, values?.sponsorsSelectData[i]?.id);
    //   }
    // }
    // if (values.mediaPartnersSelectData.length > 0) {
    //   for (let i = 0; i < values.mediaPartnersSelectData.length; i++) {
    //     formData.append(
    //       `media_partners[]`,
    //       values?.mediaPartnersSelectData[i]?.id
    //     );
    //   }
    // }

    const res = await EventsApiServices.editEvent(formData, editData?._id);

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        formik.resetForm();
        // router.push('/events');
        router.back();
        break;
      case ResponseCodes.UPLOAD_FAILED:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error('Internal server error please reload!');
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

  const onChange = (e: any) => {
    formik.setFieldValue('description', e as any);
  };

  const startDateChange = (date: any, event: any) => {
    formik.setFieldValue('start_date', date);
    formik.setFieldValue('end_date', null);
  };

  const endDateChange = (date: any, event: any) => {
    formik.setFieldValue('end_date', date);
  };
  
  const timezonesOptions = timezones.map((timezone) => ({
    value: timezone.timezone_name,
    name: timezone.timezone_name,
  }));
  
  const onChangeTimezone = (selectedTimezone: any) => {
   /// console.log('Selected timezone in onChange:', selectedTimezone);
    formik.setFieldValue('time_zone', selectedTimezone);
  };
  
  const onChangeStartTime = (e: any) => {

    //console.log("onChangeStartTime" , e, JSON.stringify(e));
  	//console.log("onChangeStartTime" , e);
  	//console.log("onChangeStartTime123" , moment( new Date(e) ) );
  	const selectedStartValue =  e ? moment( new Date(e) ).format('YYYY-MM-DD HH:mm:ss') : '';
  	//console.log("selectedValue" , selectedStartValue );
    //formik.setFieldValue("start_time", JSON.stringify(e));
    formik.setFieldValue("start_time", selectedStartValue);
    
    formik.setFieldValue("end_time", null);
    setState({
      ...state,
      start_time: e,
    });
  };
  const onChangeEndTime = (e: any) => {
  	const selectedEndValue = e ? moment( new Date(e) ).format('YYYY-MM-DD HH:mm:ss') : '';
    //formik.setFieldValue("end_time", JSON.stringify(e));
    formik.setFieldValue("end_time", selectedEndValue);
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
    <>
      <Modal
        isOpen={state?.isLoading}
        onClose={() => {}}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg h-100"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6 h-100  text-black shadow-none	"
        // customSize="800px"
      >
        <div className="flex flex-col	items-center	">
          {/* <Title className="text-2xl"> Uploading images</Title> */}
          <Title className="text-center text-2xl">
            {' '}
            {state?.isLoadingText}
          </Title>
          <div className="mt-5 grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />
            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Please wait...
            </Title>
          </div>
        </div>
      </Modal>
      <div className="pt-7 @container @2xl:pt-9 @3xl:pt-11">
        <form
          onSubmit={formik.handleSubmit}
          className={cn('[&_label.block>span]:font-medium')}
          onDrop={onDropfileUploadHandler}
          onDragOver={onDragOverfileUploadHandler}
          onDragEnter={onDragEnterfileUploadHandler}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11 ">
            <FormGroup title="Event Name">
              <Input
                name="name"
                label="Event Name*"
                placeholder="Event name here"
                className="col-span-2"
                onChange={formik.handleChange}
                error={formik?.errors?.name}
                value={formik.values.name}
              />
            </FormGroup>

            <FormGroup
              title="Event Date & Time"
              className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11 ')}
            >
            <Select
                name="time_zone"
                label="TimeZone*"
                placeholder="TimeZone"
                className="col-span-full"
                labelClassName="text-gray-900"
                dropdownClassName="p-2 gap-1 grid"
                value={formik.values.time_zone}
                onChange={onChangeTimezone}
                options={timezonesOptions}
                getOptionValue={(option) => option.value}
                suffix={<PiCaretUpDown className="h-5 w-5" />}
                displayValue={(selected) =>
                  timezonesOptions.find((c) => c.value === selected)?.name ?? ''
                }
                error={formik?.errors?.time_zone as any}
              />	
              <DatePicker
                selected={formik?.values?.start_date}
                label="Start date*"
                // value={formik.values.event_date}
                placeholderText="Select date"
                onChange={startDateChange}
                selectsStart
                startDate={formik?.values?.start_date}
                endDate={formik?.values?.end_date}
                // minDate={new Date()}
                // showTimeSelect
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                // selectsRange = {true}
              />

              <DatePicker
                selected={formik?.values?.end_date}
                label="End date"
                // value={formik.values.event_date}
                placeholderText="Select date"
                onChange={endDateChange}
                selectsEnd
                // startDate={value}
                // endDate={endDate}
                // minDate={new Date()}
                // showTimeSelect
                dateFormat="MMMM d, yyyy "
                // selectsRange = {true}
                startDate={formik?.values?.start_date}
                endDate={formik?.values?.end_date}
                minDate={formik?.values?.start_date}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        onChange={onChangeStartTime}
                        label="Start Time"
                        sx={{
                          '& .MuiFormLabel-root': {
                            color: timePickerColorCode,
                          },
                          '& .MuiOutlinedInput-input': {
                            borderColor: '#f00',
                            boxShadow:'none',
                          },
                          '& .MuiInputBase-root': {
                            borderColor: '#dfdfdf!important',
                            "&:focus-visible": {
                              outline: '#000000 !important'
                            }
                            
                          },
                          '& .MuiTextField-root': {
                            borderColor: timePickerColorCode ,
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: timePickerColorCode ,
                          },
                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#dfdfdf',
                                "&:hover": {
                                  borderColor: '#000000'
                                },
                              },
                          },
                          "& .Mui-focused": {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#000000 !important'
                            },
                          }
                        }}
                        value={ ( formik?.values?.start_time !== null ? dayjs(formik.values.start_time) : null ) }
                        slotProps={{
                          textField: {
                            onClick: () =>{
                              setState({
                                ...state,
                                startTimeOpen: true,
                              });
                            },
                            helperText: (formik?.errors?.start_time ? <FieldError size={'DEFAULT'} error={formik?.errors?.start_time} /> : ''),
                            FormHelperTextProps: {
                              filled: false,
                              variant: 'standard'
                            }
                          },
                        }}
                        // onAccept={true}

                        onClose={() =>
                          setState({
                            ...state,
                            startTimeOpen: false,
                          })
                        }
                        onOpen = {() =>
                          formik.setFieldValue("start_time", ( formik.values.start_time ? formik.values.start_time : '' )  )
                        }
                        open={state?.startTimeOpen}
                      />
                    </DemoContainer>
			  </LocalizationProvider>
			  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    
                    <DemoContainer components={["TimePicker"]}>
                    
                      <TimePicker
                        onChange={onChangeEndTime}
                        label="End Time"
                        sx={{
                          '& .MuiFormLabel-root': {
                            color: timePickerColorCode,
                          },
                          '& .MuiOutlinedInput-input': {
                            borderColor: '#f00',
                            boxShadow:'none',
                          },
                          '& .MuiInputBase-root': {
                            borderColor: '#dfdfdf!important',
                            "&:focus-visible": {
                              outline: '#000000 !important'
                            }
                            
                          },
                          '& .MuiTextField-root': {
                            borderColor: timePickerColorCode ,
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: timePickerColorCode ,
                          },
                          '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#dfdfdf',
                                "&:hover": {
                                  borderColor: '#000000'
                                },
                              },
                          },
                          "& .Mui-focused": {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#000000 !important'
                            },
                          }
                        }}
                        value={ ( formik?.values?.end_time !== null ? dayjs(formik.values.end_time) : (null) ) }
                        slotProps={{
                          textField: {
                            onClick: () => {
                              setState({
                                ...state,
                                endTimeOpen: true,
                              })
                            },
                            helperText: (formik?.errors?.end_time ? <FieldError size={'DEFAULT'} error={formik?.errors?.end_time} /> : ''),
                            FormHelperTextProps: {
                              filled: false,
                              variant: 'standard',
                            }
                          },
                        }}
                        // onAccept={true}

                        onClose={() =>
                          setState({
                            ...state,
                            endTimeOpen: false,
                          })
                        }
                        onOpen = {() =>
                          formik.setFieldValue("end_time", ( formik.values.end_time ? formik.values.end_time : '' ) )
                        }
                        open={state?.endTimeOpen}
                      />
                    </DemoContainer>
			  </LocalizationProvider>
            </FormGroup>
            <FormGroup
              title="Description"
              className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
            >
              <QuillEditor
                onChange={onChange}
                label="Description"
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                value={formik?.values?.description}
              />
            </FormGroup>

            <FormGroup
              title="Upload Featured Image"
              className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
            >
              <EditUploadProfilePhoto
                state={state}
                setState={setState}
                formik={formik}
                type={Constatnts.events}
                id={editData?._id}
              />
            </FormGroup>

            <FormGroup
              title="Upload Event Logo"
              className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
            >
              <EditEventLogo
                state={state}
                setState={setState}
                formik={formik}
              />
            </FormGroup>

            <FormGroup
              title="Upload More Images"
              description={`You can upload multiple images for the event,\nAlso add subtitles for the images as well if required`}
              className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
            >
              <EditUploadMultiFiles state={state} setState={setState} />
            </FormGroup>
            <FormGroup
              title="Venue Address"
              description="Add the venue address here"
              className={'pt-7 @2xl:pt-9 @3xl:pt-11'}
            >
              <CountrySelectBox formik={formik} label="Country*" />
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
                label="City*"
                placeholder="City"
                onChange={formik.handleChange}
                error={formik?.errors?.city}
                value={formik.values.city}
              />
              <Input
                name="addressLineOne"
                label="Flat, House no., Building, Company, Apartment*"
                placeholder="Enter your address"
                className="col-span-2"
                onChange={formik.handleChange}
                error={formik?.errors?.addressLineOne}
                value={formik.values.addressLineOne}
              />
              <Input
                name="zip"
                label="ZIP / Postcode*"
                placeholder="ZIP / postcode"
                onChange={formik.handleChange}
                error={formik?.errors?.zip}
                value={formik.values.zip}
              />

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

            {/* <div className=" relative">
            <FormGroup
              title="Add Delegates"
              description="Assign delegates to the event"
              className="pt-8"
            >
              <CustomSelectBox formik={formik} type={Constatnts?.delegate} />
            </FormGroup>
          </div>

          <div className="relative mt-10">
            <FormGroup
              title="Add Sponsors "
              description="Assign Sponsors to the event"
              className="pt-8"
            >
              <CustomSelectBox formik={formik} type={Constatnts?.sponsor} />
            </FormGroup>
          </div>

          <div className="relative mt-10 pb-10">
            <FormGroup
              title="Add Exhibitors "
              description="Assign Exhibitors to the event"
              className="pt-8"
            >
              <CustomSelectBox formik={formik} type={Constatnts?.exhibitor} />
            </FormGroup>
          </div>

          <div className="relative mt-10 pb-10">
            <FormGroup
              title="Add Speakers "
              description="Assign Speakers to the event"
              className="pt-8"
            >
              <CustomSelectBox formik={formik} type={Constatnts?.speaker} />
            </FormGroup>
          </div>

          <div className="relative mt-10 pb-10">
            <FormGroup
              title="Add Media Partners "
              description="Assign Media Partners to the event "
              className="relative pt-8"
            >
              <CustomSelectBox
                formik={formik}
                type={Constatnts?.mediaPartner}
              />
            </FormGroup>
          </div> */}
          </div>
          <FormFooter
            isLoading={state?.isLoading}
            submitBtnText={'Update Event'}
          />
        </form>
      </div>
    </>
  );
};

export default EventEditForm;
