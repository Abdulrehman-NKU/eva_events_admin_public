// @ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import Select from '@/components/ui/select';
import { PiCaretUpDown } from 'react-icons/pi';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { getEventParamsDetails } from '../all/getData';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { Loader } from 'rizzui';
import { usePathname } from 'next/navigation';

const EventDateSelect = ({
  formik,
  eventId,
}: {
  formik: any;
  eventId?: string;
}) => {
  const [state, setState] = useState({
    fetchDateIsLoading: false,
    selectDateOptions: [],
  });

  const pathname = usePathname();
  let { event_id } = getEventParamsDetails(pathname);

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

  const onChangeDateSelect = (e: any) => {
    formik.setFieldValue('selectDate', e);
  };

  const getDateSelectValuesApi = async () => {
    setState({
      ...state,
      fetchDateIsLoading: true,
    });

    let res = await EventsApiServices.getEventSelectdates(eventId || event_id);

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
    <>
      <Select
        name="selectEvent"
        label="Select Event Day*"
        className="col-span-2"
        placeholder="Select event date"
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
    </>
  );
};

export default EventDateSelect;
