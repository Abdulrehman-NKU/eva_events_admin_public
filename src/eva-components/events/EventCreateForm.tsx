'use client';
import { useState, useEffect } from 'react';
import cn from '@/utils/class-names';
import { Input } from '../../components/ui/input';
import { CreateProductInput } from '@/utils/validators/create-product.schema';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@/components/ui/datepicker';
import QuillEditor from '@/components/ui/quill-editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PiCaretUpDown } from 'react-icons/pi';
import { messages } from '@/config/messages';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import toast from 'react-hot-toast';
import UploadMultiFiles from '../upload/UploadMultiFiles';
import UploadProfilePhoto from '../UploadProfilePhoto';
import ResponseCodes from 'utils/response-codes';
import { useRouter } from 'next/navigation';
import { UploadApi } from 'utils/api/Upload';
import { countries } from '../CountriesSelecteData';
import Select from '@/components/ui/select';
import { useLayout } from '@/hooks/use-layout';
import FormFooter from '../form-footer';
import CustomFields, { eventLocation } from './custom-fields';
import { Modal, Title } from 'rizzui';
import Spinner from '@/components/ui/spinner';
import { useSelector } from 'react-redux';
import { StoreServices } from '../../../redux/storeServices/storeServices';
import UploadEventLogo from './UploadEventLogo';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { timezones } from '../TimezoneSelectData';
import moment from 'moment';
import { FieldError } from '@/components/ui/field-error';
import { formHelperTextClasses } from '@mui/material';

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
}

const initialValues = {
  name: '',
  time_zone: '',
  start_date: new Date(),
  end_date: null,
  start_time: null,
  end_time: null,
  description: '',
  country: '',
  city: '',
  zip: '',
  addressLineOne: '',
  profilePhotoErrorHandling: '',
  event_logo: '',
  // delegatesSelectData: [],
  // exhibitorsSelectData: [],
  // speakersSelectData: [],
  // sponsorsSelectData: [],
  // mediaPartnersSelectData: [],
  // locations: [
  //   {
  //     location_name: '',
  //     location_code: '',
  //   },
  // ],
};



const validationSchema = Yup.object({
  name: Yup.string().required(messages.nameIsRequired),
  time_zone: Yup.string().required(messages.timeZoneIsRequired),
  start_date: Yup.date().required(messages.startDateIsRequired),
  // end_date: Yup.date().optional(),
  //start_time: Yup.date().required(messages.startTimeIsRequired),
  //end_time: Yup.date().required(messages.endTimeIsRequired),
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
  // location_name: Yup.string().optional(),
  // location_code: Yup.string().optional(),
});

let uploadedEventLogo: string = '';

const EventCreateForm: React.FC<IndexProps> = ({ slug, className }) => {
  const { layout } = useLayout();
  const router = useRouter();
  const [state, setState] = useState<any>({
    profilePhoto: null,
    eventLogo: null,
    isLoading: false,
    selectedImages: [],
    isLoadingText: '',
    drag: false,
  });

  const [datePicker, setDatePicker] = useState({
    startDate: new Date(),
    endDate: null,
  });

  let eventLocationArray = useSelector(
    (state: any) => state?.eventLocation?.eventLocationArray
  );

  const posterImageHandler = async () => {
    setState({
      ...state,
      isLoading: true,
      isLoadingText: 'Uploading images',
    });

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

  const uploadLogo = async () => {
    if (!state?.eventLogo) {
      return true;
    }

    setState({
      ...state,
      isLoading: true,
      isLoadingText: 'Uploading files...',
    });

    let formData = new FormData();

    formData.append(`file`, state?.eventLogo);

    let res = await UploadApi.uploadPosterImage(formData);

    if (res?.data?.response_code !== ResponseCodes.UPLOAD_SUCCESS) {
      toast.error('Upload failed for event logo, please try again!');
      return false;
    }

    uploadedEventLogo = res?.data?.data[0]?.file_url;

    return true;
  };

  const onSubmitHandler = async (values: any) => {
    //console.log('values>>>');
    //console.log(values);
	
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

  const createLocationApi = async (
    event_id: string,
    locationData: eventLocation[]
  ) => {
    setState({
      ...state,
      isLoading: true,
      isLoadingText: 'Creating your event locations',
    });

    let updateData = locationData?.map(({ location_name, location_code }) => {
      if (location_name) {
        return {
          location_name,
          location_code,
        };
      }
    });
    let locationApiData = {
      event_id: event_id,
      locations: updateData,
    };

    let res = await EventsApiServices.createEventLocations(locationApiData);

    console.log('res>>>', res);

    if (res.response_code === ResponseCodes.CREATE_SUCCESS) {
      toast.success('Event is created successfully');
    } else {
      toast.error(res.data?.message || 'Event locations are added faild!');
    }

    router.back();
    setState({
      ...state,
      isLoading: false,
      profilePhoto: null,
      selectedImages: [],
    });
    formik.resetForm();
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
				
				const momentStartTime = moment(values?.start_time, 'HH:mm:ss');
				const momentEndTime = moment(values?.end_time, 'HH:mm:ss');
				
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
      isLoadingText: 'Creating your event',
    });
    
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('venue_city', values.city);
    formData.append('venue_zip', values.zip);
    formData.append('venue_country', values.country);
    formData.append('venue_address_line_1', values.addressLineOne);
    formData.append('start_date', values?.start_date?.toISOString());
    formData.append('end_date', values?.end_date?.toISOString());
    
    formData.append('start_time', values?.start_time);
    formData.append('end_time', values?.end_time);
    formData.append('time_zone', values?.time_zone);
    
    
    
    var selectedTimeZoneValue = '';
    timezones.map(timezone => {
      if( timezone.timezone_name == values?.time_zone ){
        selectedTimeZoneValue = timezone.timezone_value;
      } 
    });

   
    //console.log(selectedTimeZoneValue)
    formData.append('time_zone_value', selectedTimeZoneValue);
    
    
    /*
    let eventDate = new Date(values?.start_date);
    let event_day = eventDate.getDate();
    let event_month = eventDate.getMonth();
    let event_year = eventDate.getFullYear();
     let startFilterTime;
    let endFilterTime;
    let startTime = new Date(JSON.parse(values?.start_time));
      startTime.setDate(event_day);
      startTime.setMonth(event_month);
      startTime.setFullYear(event_year);
      startFilterTime = startTime?.toISOString();
      
      formData.append('start_time', startFilterTime);
      
      let endTime = new Date(JSON.parse(values?.end_time));
      endTime.setDate(event_day);
      endTime.setMonth(event_month);
      endTime.setFullYear(event_year);
      endFilterTime = endTime?.toISOString();
      
       formData.append('end_time', endFilterTime);
    
    */
    //console.log("formData");
    //console.log(formData);
    //return false;
    // formData.append('location_name', values.location_name);
    // formData.append('location_code', values.location_code);

    if (state?.profilePhoto !== null) {
      formData.append('featured_image', state?.profilePhoto);
    }

    if (poster_id_array.length > 0) {
      for (let i = 0; i < poster_id_array.length; i++) {
        formData.append(`poster_images[]`, poster_id_array[i]);
      }
    }

    if (uploadedEventLogo) {
      formData.append('event_logo', uploadedEventLogo);
    } else formData.append('event_logo', '');

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

    const res = await EventsApiServices.createEvent(formData);
    console.log('res-event>>>', res);

    if (res?.success) {
      const eventLocationArrayData = StoreServices.getEventLocationArray();
      if (eventLocationArrayData[0]?.location_name) {
        createLocationApi(res?.data?.data?._id, eventLocationArrayData);
      } else {
        toast.success('Event is created successfully');
        router.back();
        setState({
          ...state,
          isLoading: false,
          isLoadingText: '',
          profilePhoto: null,
          selectedImages: [],
        });
        formik.resetForm();
      }
    } else {
      toast.error(res?.message ?? 'Something went wrong when creating event!');
      setState({
        ...state,
        isLoading: false,
      });
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

  const countriesOptions = countries.map((country) => ({
    value: country.country_name,
    name: country.country_name,
  }));
  
  const timezonesOptions = timezones.map((timezone) => ({
    value: timezone.timezone_name,
    name: timezone.timezone_name,
  }));

  const onChangeCountry = (selectedCountry: any) => {
    console.log('Selected country in onChange:', selectedCountry);
    formik.setFieldValue('country', selectedCountry);
  };
  
  const onChangeTimezone = (selectedTimezone: any) => {
    console.log('Selected timezone in onChange:', selectedTimezone);
    formik.setFieldValue('time_zone', selectedTimezone);
  };
  
  const onChangeStartTime = (e: any) => {
  //console.log("onChangeStartTime" , JSON.stringify(e));
  	//console.log("onChangeStartTime" , e);
  	//console.log("onChangeStartTime123" , moment( new Date(e) ) );
  	const selectedStartValue =  e ? moment( new Date(e) ).format('HH:mm:ss') : '';
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
  	const selectedEndValue = e ? moment( new Date(e) ).format('HH:mm:ss') : '';
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
  let timePickerColorCode = "#110f0e";
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
          <Title className="text-2xl"> {state?.isLoadingText}</Title>
          <div className="mt-5 grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />
            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Please wait...
            </Title>
          </div>
        </div>
      </Modal>

      <div className=" @container ">
        {/* <FormNav
          className={cn(
            layout === LAYOUT_OPTIONS.BERYLLIUM && '2xl:top-[72px]'
          )}
        /> */}
        <form
          onSubmit={formik.handleSubmit}
          className={cn('[&_label.block>span]:font-medium', className)}
          onDrop={onDropfileUploadHandler}
          onDragOver={onDragOverfileUploadHandler}
          onDragEnter={onDragEnterfileUploadHandler}
        >
          <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
            <FormGroup
              title="Event Name"
              className={cn(
                className,
                'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
              )}
            >
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
              className={cn(
                className,
                'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11 '
              )}
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
                error={formik?.errors?.time_zone}
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
              className={cn(
                className,
                'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
              )}
            >
              <QuillEditor
                onChange={onChange}
                label="Description"
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              />
            </FormGroup>

            <FormGroup
              title="Upload Featured Image"
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

            <FormGroup
              title="Upload Event Logo"
              className={cn(
                className,
                'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
              )}
            >
              <UploadEventLogo
                state={state}
                setState={setState}
                formik={formik}
              />
            </FormGroup>

            <FormGroup
              title="Upload More Images"
              description={`You can upload multiple images for the event,\nAlso add subtitles for the images as well if required`}
              className={cn(
                className,
                'whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11'
              )}
            >
              <UploadMultiFiles state={state} setState={setState} />
            </FormGroup>
            <FormGroup
              title="Venue Address"
              description="Add the venue address here"
              className={(cn(className), 'pt-7 @2xl:pt-9 @3xl:pt-11')}
            >
              {/* <Input
              name="country"
              label="Country"
              placeholder="Country"
              onChange={formik.handleChange}
              error={formik?.errors?.country}
              value={formik.values.country}
            /> */}
              {/* <Input
              name="state"
              label="State"
              placeholder="State"
              onChange={formik.handleChange}
              error={formik?.errors?.state}
              value={formik.values.state}
            /> */}
              <Select
                name="country"
                label="Country*"
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

            {/* <FormGroup
              title="Event Locations"
              description="Add locations for the event"
              className={(cn(className), 'pt-7 @2xl:pt-9 @3xl:pt-11')}
            >
             
              <CustomFields />
            </FormGroup> */}

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
            submitBtnText={'Create Event'}
          />
        </form>
      </div>
    </>
  );
};

export default EventCreateForm;
