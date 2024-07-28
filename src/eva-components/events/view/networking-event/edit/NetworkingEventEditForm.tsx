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
import { NetworkingEventType } from '@/eva-components/type/propsType';
import EventDateSelect from '../EventDateSelect';

const NetworkingEventEditForm = ({
  editData,
}: {
  editData: NetworkingEventType;
}) => {
  const [state, setState] = useState({
    isLoading: false,
    userInputToggle: 'off',
  });
  const router = useRouter();
  const pathname = usePathname();

  const initialValues = {
    name: editData?.event_name || '',
    theme: editData?.theme || '',
    location: editData?.location || '',
    description: editData?.description || '',
    notes: editData?.notes || '',
    // date: new Date(editData?.date),
    selectDate: editData?.date || '',
    start_time: new Date(editData?.start_time),
    end_time: new Date(editData?.end_time),
    switch: editData?.user_input_field,
    input_field: editData?.label_for_input_field || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(messages?.networkingEventIsRequired),
    theme: Yup.string().optional(),
    location: Yup.string().optional(),
    description: Yup.string().optional(),
    notes: Yup.string().optional(),
    switch: Yup.string().optional(),
    input_field: Yup.string().optional(),
  });

  const onSubmitHandler = async (values: any) => {
    let networkingEventData = {
      event_name: values?.name,
      label_for_input_field: values?.input_field || '',
      // date: values?.date?.toISOString(),
      date: values?.selectDate,
      start_time: values?.start_time?.toISOString(),
      end_time: values?.end_time?.toISOString(),
      description: values?.description || '',
      notes: values?.notes || '',
      location: values?.location || '',
      theme: values?.theme || '',
      user_input_field: values?.switch,
    };
    setState({
      ...state,
      isLoading: true,
    });
    let res = await NetworkingEventApi.editNetworkingEvent(
      networkingEventData,
      editData?._id
    );

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        router.back();
        toast.success('Networking event edit successfully');
        formik.resetForm();
        break;

      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error('Internal server error');
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

  const handleDateChange = (date: any) => {
    formik.setFieldValue('date', date);
  };

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
    if (formik?.values?.switch) {
      formik.setFieldValue('switch', false);
    } else {
      formik.setFieldValue('switch', true);
    }
  };

  console.log('editData>>', editData);

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
            <EventDateSelect
              formik={formik}
              eventId={editData?.events[0]?._id}
            />

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
              placeholder="Enter location"
              onChange={formik.handleChange}
              error={formik?.errors?.location}
              value={formik.values.location}
              className="col-span-2"
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
              value={formik?.values?.description}
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
              value={formik?.values?.notes}
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
                // value={formik?.values?.switch ? 'on' : 'off'}
                value={'on'}
                onChange={onChangeSwitch}
                switchClassName="dark:border-gray-400 "
                handlerClassName="dark:bg-gray-400"
                defaultChecked={formik?.values?.switch}
              />
            </div>
            {formik?.values?.switch && (
              <QuillEditor
                label="Question for User for the input field"
                onChange={onChangeInputField}
                value={formik?.values?.input_field}
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              />
            )}
          </FormGroup>
        </div>

        <FormFooter
          isLoading={state?.isLoading}
          submitBtnText={'Edit Networking Event'}
        />
      </form>
    </div>
  );
};
export default NetworkingEventEditForm;
