// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { PiCaretUpDown } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import QuillEditor from '@/components/ui/quill-editor';
import { DatePicker } from '@/components/ui/datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@/components/ui/modal';
import { eventAction } from '../../../../../redux/slice/event';
import Select from '@/components/ui/select';
import { Checkbox, Loader } from 'rizzui';
import CustomSelectBox from '@/eva-components/selectBox/CustomSelectBox';
import Constatnts from '@/eva-components/constatnt';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname } from 'next/navigation';
import { getEventParamsDetails } from '../all/getData';
import { ConferenceProgramEditDataType } from '@/eva-components/type/propsType';
import { getUserSelectedData } from '../../edit/getSelectedData';

export default function ConferenceProgramEdit({
  editData,
}: {
  editData: ConferenceProgramEditDataType;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    fetchDateIsLoading: false,
    selectDateOptions: [],
  });
  let { event_id } = getEventParamsDetails(pathname);

  const initialValues = {
    programName: editData?.title,
    description: editData?.description,
    selectDate: editData?.date,
    start_time: new Date(editData?.time_from),
    end_time: new Date(editData?.time_to),
    sponsorsSelectData: getUserSelectedData(
      editData?.sponsors,
      Constatnts?.sponsor
    ),
    checkbox: editData?.add_to_calender,
  };

  const validationSchema = Yup.object({
    programName: Yup.string().required(messages?.questionIsRequired),
    description: Yup.string().optional(),
    selectDate: Yup.string().required(messages?.dateIsRequired),
    sponsorsSelectData: Yup.array().optional(),
    start_time: Yup.date().required(messages.startDateIsRequired),
    end_time: Yup.date().required(messages.startDateIsRequired),
    checkbox: Yup.boolean(),
  });

  const onSubmitHandler = async (values: any) => {
    console.log('values>>', values);
    setState({
      ...state,
      isLoading: true,
    });
    let sponsorsArray = values.sponsorsSelectData.map(
      ({ id }: { id: string }) => {
        return id;
      }
    );

    let programsData = {
      title: values?.programName,
      subtitle: '',
      date: values?.selectDate,
      time_from: values?.start_time?.toISOString(),
      time_to: values?.end_time?.toISOString(),
      description: values?.description,
      add_to_calender: values?.checkbox,
      events: editData?.events,
      sponsors: sponsorsArray,
    };

    let res = await EventsApiServices.editEventConferenceProgram(
      programsData,
      editData?._id
    );
    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        onClose();
        formik.resetForm();
        toast.success('Conference Program edit successfully.');
        toast.success('Conference Programs list reload in 1 sec.');
        setTimeout(() => {
          dispatch(eventAction?.setResetConferenceProgramList());
        }, 1000);
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
  };

  const onChangeDescription = (e: any) => {
    formik.setFieldValue('description', e as any);
  };

  const handleStartTimeChange = (time: any) => {
    formik.setFieldValue('start_time', time);
  };
  const handleEndTimeChange = (time: any) => {
    formik.setFieldValue('end_time', time);
  };
  const onChangeDateSelect = (e: any) => {
    formik.setFieldValue('selectDate', e);
  };
  const onChangeCheckbox = (e: any) => {
    formik.setFieldValue('checkbox', e?.target?.checked);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const onClose = () => {
    dispatch(eventAction?.setConferenceProgramEditId({ id: '' }));
  };

  const getDate = (dateString: string) => {
    let dateFilterArrayStartDate = new Date(dateString).toString().split(' ');
    let weekdayStartDate = new Date(dateString).getDay();
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let startDay = weekdays[weekdayStartDate];
    let startDate = `${dateFilterArrayStartDate[2]}`;
    let startMonth = `${dateFilterArrayStartDate[1]}`;
    let startYear = `${dateFilterArrayStartDate[3]}`;
    let filterDate = `${startDay}, ${startDate} ${startMonth} ${startYear}`;
    return `${filterDate}`;
  };

  const getDateSelectValuesApi = async () => {
    setState({
      ...state,
      fetchDateIsLoading: true,
    });

    let res = await EventsApiServices.getEventSelectdates(event_id);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      let dateArray = res?.data?.data?.event_dates.map((dateString: string) => {
        return {
          value: dateString,
          name: getDate(dateString),
        };
      });
      setState({
        ...state,
        fetchDateIsLoading: false,
        selectDateOptions: dateArray,
      });
    } else {
      toast.error('Internal server error!');
    }

    console.log('res-event>>>>', res);
  };

  useEffect(() => {
    getDateSelectValuesApi();
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-grow flex-col gap-6 p-4 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      <>
        <Input
          label="Program Name*"
          placeholder="Enter Program Name "
          name="programName"
          error={formik?.errors?.programName}
          value={formik?.values?.programName}
          onChange={formik.handleChange}
        />

        <QuillEditor
          label="Program Description"
          onChange={onChangeDescription}
          className="col-span-full [&_.ql-editor]:min-h-[100px]"
          labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          value={formik?.values?.description}
        />

        <Select
          name="selectEvent"
          label="Select Event Day*"
          placeholder="Select Day"
          labelClassName="text-gray-900"
          dropdownClassName="p-2 gap-1 grid h-44"
          value={formik?.values?.selectDate}
          onChange={onChangeDateSelect}
          options={state?.selectDateOptions}
          getOptionValue={(option) => option.value}
          disabled={state?.fetchDateIsLoading}
          suffix={
            state?.fetchDateIsLoading ? (
              <Loader variant="threeDot" size="sm" />
            ) : (
              <PiCaretUpDown className="h-5 w-5" />
            )
          }
          displayValue={(selected) =>
            state?.selectDateOptions.find((c: any) => c.value === selected)
              ?.name ?? ''
          }
          error={formik?.errors?.selectDate}
        />

        <div className="flex gap-5 max-md:flex-col">
          <div style={{ width: '50%' }}>
            <DatePicker
              label="Start time*"
              selected={formik?.values?.start_time}
              onChange={handleStartTimeChange}
              placeholderText="Select time"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            {formik.errors.start_time ? (
              <div
                role="alert"
                className="rizzui-input-error-text mt-0.5 text-xs text-red"
              >
                Start Time is required
              </div>
            ) : (
              ''
            )}
          </div>
          <div style={{ width: '50%' }}>
            <DatePicker
              label="End time*"
              placeholderText="Select time"
              selected={formik?.values?.end_time}
              onChange={handleEndTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            {formik.errors.end_time ? (
              <div
                role="alert"
                className="rizzui-input-error-text mt-0.5 text-xs text-red"
              >
                End Time is required
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <CustomSelectBox formik={formik} type={Constatnts?.sponsor} />
        <Checkbox
          label="Allow Users to add to calendar?"
          onChange={onChangeCheckbox}
          defaultChecked={formik?.values?.checkbox}
        />

        <div className="flex items-center justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full @xl:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={state?.isLoading}
            className="w-full @xl:w-auto"
          >
            Edit
          </Button>
        </div>
      </>
    </form>
  );
}
