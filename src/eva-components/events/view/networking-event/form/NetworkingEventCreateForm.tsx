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
import { DatePicker } from '@/components/ui/datepicker';
import { Switch } from 'rizzui';
import { NetworkingEventApi } from 'utils/api/event/NetworkingEvent';
import { EventParamsdata } from '@/eva-components/other/event/getEventdata';
import EventDateSelect from '../EventDateSelect';

const initialValues = {
  name: '',
  theme: '',
  location: '',
  description: '',
  notes: '',
  // date: new Date(),
  selectDate: '',
  start_time: new Date(),
  end_time: null,
  switch: 'off',
  input_field: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required(messages?.networkingEventIsRequired),
  selectDate: Yup.string().required(messages.dateIsRequired),
  theme: Yup.string().optional(),
  location: Yup.string().optional(),
  description: Yup.string().optional(),
  notes: Yup.string().optional(),
  switch: Yup.string().optional(),
  input_field: Yup.string().optional(),
});

const NetworkingEventCreateForm = () => {
  const [state, setState] = useState({
    isLoading: false,
    userInputToggle: 'off',
  });
  const router = useRouter();
  const pathname = usePathname();

  const onSubmitHandler = async (values: any) => {
    if (values?.end_time === null) {
      toast.error('End time is required!');
      return;
    }
    console.log('values>>', values);
    let { event_id } = EventParamsdata?.getEventView(pathname);
    let switch_update;

    if (values?.switch === 'off') {
      switch_update = false;
    } else {
      switch_update = true;
    }

    let networkingEventData = {
      event_name: values?.name,
      label_for_input_field: values?.input_field || '',
      date: values?.selectDate,
      start_time: values?.start_time?.toISOString(),
      end_time: values?.end_time?.toISOString(),
      description: values?.description || '',
      notes: values?.notes || '',
      location: values?.location || '',
      theme: values?.theme || '',
      user_input_field: switch_update,
      events: [event_id],
    };
    setState({
      ...state,
      isLoading: true,
    });
    let res =
      await NetworkingEventApi.creteNetworkingEvent(networkingEventData);

      console.log("res>>>",res);
      

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        router.back();
        toast.success('Networking event created successfully');
        formik.resetForm();
        break;

      case ResponseCodes.CREATE_FAILED:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error(res?.data?.data?.error || 'Internal server error');
    }

    setState({
      ...state,
      isLoading: false,
    });

    // console.log('res>>>', res);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  // const handleDateChange = (date: any) => {
  //   formik.setFieldValue('date', date);
  // };

  const handleStartTimeChange = (time: any) => {
    formik.setFieldValue('start_time', time);
    formik.setFieldValue('end_time', null);
  };
  const handleEndTimeChange = (time: any) => {
    formik.setFieldValue('end_time', time);
  };

  const onChangeDescription = (e: any) => {
    formik.setFieldValue('description', e as any);
  };
  const onChangeNote = (e: any) => {
    formik.setFieldValue('notes', e as any);
  };
  const onChangeInputField = (e: any) => {
    formik.setFieldValue('input_field', e as any);
  };

  const onChangeSwitch = (e: any) => {
    if (formik.values.switch === 'on') {
      formik.setFieldValue('switch', 'off');
    } else {
      formik.setFieldValue('switch', 'on');
    }
  };

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        {/* <div className="mb-5">
          <h4 className="text-base font-medium">Networking event Info</h4>
          <p className="mt-2">Update photos and hotel details here</p>
        </div> */}
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          <FormGroup title="Name" description="" className="pt-8">
            <Input
              name="name"
              placeholder="Networking event name"
              label="Networking event name*"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik.errors.name}
              value={formik.values.name}
            />
          </FormGroup>

          <FormGroup title="Date & Time" description="" className="pt-8">
            {/* <div className="col-span-2">
              <DatePicker
                selected={formik.values.date}
                label="Select date*"
                placeholderText="Select event dates"
                // value={formik.values.event_date}
                onChange={handleDateChange}
                selectsStart
                // startDate={value}
                // endDate={endDate}
                minDate={new Date()}
                // showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                // selectsRange = {true}
              />
            </div> */}

            <EventDateSelect formik={formik} />

            <DatePicker
              label="Start time*"
              selected={formik.values.start_time}
              onChange={handleStartTimeChange}
              placeholderText="Select start time"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Time"
              dateFormat="h:mm aa"

              // selectsStart
            />
            <DatePicker
              label="End time*"
              placeholderText="Select end time"
              selected={formik?.values?.end_time}
              onChange={handleEndTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Time"
              dateFormat="h:mm aa"
              // minTime={formik?.values?.start_time}
              // maxTime={}
            />
          </FormGroup>

          <FormGroup title="Location" className="pt-7 @2xl:pt-9 @3xl:pt-11">
            <Input
              name="location"
              label="Enter location"
              className="col-span-2"
              placeholder="Enter location"
              onChange={formik.handleChange}
              error={formik?.errors?.location}
              value={formik.values.location}
            />
          </FormGroup>

          <FormGroup title="Theme" className="pt-7 @2xl:pt-9 @3xl:pt-11">
            <Input
              name="theme"
              label="Enter theme"
              placeholder="Enter theme name"
              className="col-span-2"
              onChange={formik.handleChange}
              error={formik?.errors?.theme}
              value={formik.values.theme}
            />
          </FormGroup>

          <FormGroup
            title="Description"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <QuillEditor
              // label="Description"
              onChange={onChangeDescription}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          </FormGroup>

          <FormGroup
            title="Additional Notes"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <QuillEditor
              // label="Description"
              onChange={onChangeNote}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          </FormGroup>

          <FormGroup
            title="User Input"
            className={cn('whitespace-pre-line pt-7 @2xl:pt-9 @3xl:pt-11')}
          >
            <div>
              <Switch
                label="Show user input"
                className="col-span-full"
                name="switch"
                value={formik?.values?.switch}
                onChange={onChangeSwitch}
                switchClassName="dark:border-gray-400 "
                handlerClassName="dark:bg-gray-400"
              />
            </div>
            {formik?.values?.switch === 'on' && (
              <QuillEditor
                label="Question for User for the input field"
                onChange={onChangeInputField}
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              />
            )}
          </FormGroup>
        </div>

        <FormFooter
          isLoading={state?.isLoading}
          submitBtnText={'Create Networking Event'}
        />
      </form>
    </div>
  );
};
export default NetworkingEventCreateForm;
