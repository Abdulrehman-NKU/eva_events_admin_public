'use client';

import { useEffect, useState } from 'react';
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

export default function LocationEditModal({ editData }: { editData: any }) {
  let selectedUser: any[] = [];
  if (editData?.assigned_to_id) {
    let user_type = '';
    if (editData?.user_type === 'media_partners') {
      user_type = 'media partner';
    } else {
      user_type = editData?.user_type;
    }
    selectedUser = [
      {
        name: editData.assigned_to_name,
        id: editData.assigned_to_id,
        user_type,
      },
    ];
  }

  if (editData?.assigned_to_multiple_ids) {
    var assignedEditUserInfos = editData?.assigned_to_user_info;
    //console.log("assignedEditUserInfos" , assignedEditUserInfos );
    var finalAssignUserInfo: any = [];
    assignedEditUserInfos.map((assignedEditUserInfo: any) => {
      finalAssignUserInfo.push({
        name: assignedEditUserInfo.name,
        id: assignedEditUserInfo.id,
        user_type: assignedEditUserInfo.type,
      });
    });
    //console.log("finalAssignUserInfo" , finalAssignUserInfo );
    selectedUser = finalAssignUserInfo;
  }
  const initialValues = {
    locations_name: editData?.location_name,
    // locations_code: editData?.location_code,
    assignedUser: selectedUser,
  };

  const validationSchema = Yup.object({
    locations_name: Yup.string().required(messages?.locationIsRequired),
    assignedUser: Yup.array().optional(),
  });

  const dispatch = useDispatch();
  const pathname = usePathname();
  let { event_id } = getEventParamsDetails(pathname);

  const [state, setState] = useState({
    isLoading: false,
  });

  const onSubmitHandler = async (values: any) => {
    let { event_id } = getEventParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });

    let locationData = {
      location_name: values.locations_name,
      //assigned_to: values?.assignedUser[0]?.id,
      assigned_to: JSON.stringify(values?.assignedUser),
    };

    let res = await EventsApiServices.editLocation(editData?._id, locationData);

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        toast.success('Event location updated successfully.');
        formik.resetForm();
        onClose();
        dispatch(eventAction?.resetEventLocationsList());
        // setTimeout(() => {
        //   dispatch(eventAction?.resetEventLocationsList());
        // }, 1000);
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error(res?.data?.message || 'Internal server error!');
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
    dispatch(
      eventAction?.setEventLocationEditModalData({
        _id: '',
        location_name: '',
        assigned_to_id: '',
        assigned_to_name: '',
        user_type: '',
      })
    );
  };

  return (
    <>
      <Modal
        isOpen={editData?._id ? true : false}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
          <div className="flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Edit Event Location
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
        </form>
      </Modal>
    </>
  );
}
