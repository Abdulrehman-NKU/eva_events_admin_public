'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title } from '@/components/ui/text';
import { Textarea } from 'rizzui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { getEventParamsDetails } from '../all/getData';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import UsersListSelect from '../../allUserListSelector/UsersListSelect';

const initialValues = {
  locations_name: '',
  // locations_code: '',
  assignedUser: [],
};

const validationSchema = Yup.object({
  locations_name: Yup.string().required(messages?.locationIsRequired),
  // locations_code: Yup.string().required(messages?.locationCodeIsRequired),
  // assignedUser: Yup.array().required().min(1, 'Please assign user!'),
  assignedUser: Yup.array().optional(),
});
export default function LocationCreate() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  let createLocationModal = useSelector(
    (state: any) => state?.event?.createLocationModal
  );

  let { event_id } = getEventParamsDetails(pathname);

  const [state, setState] = useState({
    isLoading: false,
  });

  const onSubmitHandler = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
    });
	//console.log("values" , values );
	//return false;
    let locationData = {
      event_id: event_id,
      locations: [
        {
          location_name: values.locations_name,
          //assigned_to: values?.assignedUser[0]?.id,
          assigned_to:  JSON.stringify( values?.assignedUser ),
        },
      ],
    };

    let res = await EventsApiServices.createLocation(locationData);

    if (res?.response_code === ResponseCodes.CREATE_SUCCESS) {
      formik.resetForm();
      toast.success('Event locations created successfully');
      // toast.success('FAQs list reload in 1 sec.');
      // closeModal();
      dispatch(eventAction?.resetEventLocationsList());
      onClose();
      // setTimeout(() => {
      //   dispatch(eventAction?.resetEventLocationsList());
      // }, 1000);
    } else {
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

  const onClose = () => {
    dispatch(eventAction?.setCreateLocationModal());
    formik.resetForm();
  };

  console.log('createLocationModal>>>', createLocationModal);

  return (
    <>
      <Modal
        isOpen={createLocationModal}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-grow flex-col gap-6 p-6 pb-10 pt-10 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
          <div className="flex items-center justify-between ">
            <Title as="h4" className="font-semibold">
              Create Event Location
            </Title>
            <ActionIcon size="sm" variant="text" onClick={onClose}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
          {/* <Textarea
            label="Question"
            placeholder="Enter your question"
            name="question"
            error={formik?.errors?.question}
            value={formik?.values?.question}
            onChange={formik.handleChange}
          />

          <Textarea
            label="Answere"
            placeholder="Enter your answere"
            name="answere"
            error={formik?.errors?.answere}
            value={formik?.values?.answere}
            onChange={formik.handleChange}
          /> */}

          <Input
            label="Locations Name*"
            placeholder="Enter location name"
            name="locations_name"
            error={formik?.errors?.locations_name as string}
            value={formik?.values?.locations_name}
            onChange={formik.handleChange}
          />
          {/* <Input
            label="Location Code*"
            placeholder="Enter location code"
            name="locations_code"
            error={formik?.errors?.locations_code as string}
            value={formik?.values?.locations_code}
            onChange={formik.handleChange}
          /> */}

          <UsersListSelect formik={formik as any} event_id={event_id} />
          
          

          <div className="h-48"></div>

          <div className=" flex items-center  gap-4">
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
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
