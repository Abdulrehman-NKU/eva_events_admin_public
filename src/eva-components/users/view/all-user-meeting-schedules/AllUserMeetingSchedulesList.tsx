import Spinner from '@/components/ui/spinner';
import { paramsUserDetails } from '@/eva-components/type/propsType';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Empty, Text, Title } from 'rizzui';
import { AllUsersApi } from 'utils/api/user/AllUsers';
import ResponseCodes from 'utils/response-codes';
import { getParamsDetails } from '../getData';
import ViewScheduleTable from './ViewScheduleTable';

const AllUserMeetingSchedulesList = () => {
  const [state, setState] = useState({
    isLoading: false,
    listsData: [],
  });
  const pathname = usePathname();

  let resetList = useSelector(
    (state: RootState) => state?.meeting?.resetScheduleMeetingsList
  );

  const getListData = async () => {
    let { user_id, users_type }: paramsUserDetails = getParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });

    let res = await AllUsersApi?.getMeetingsScheduled(user_id);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          listsData: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error(res?.data?.error || 'Internal server error');
    }
  };

  useEffect(() => {
    getListData();
  }, [resetList]);
  
  return (
    <div>
      <>
        {state?.isLoading ? (
          <div className="mt-36 grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />
            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Loading...
            </Title>
          </div>
        ) : state?.listsData?.length === 0 ? (
          <div className="mt-28 py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Data</Text>
          </div>
        ) : (
          <>
            {' '}
            <ViewScheduleTable listsData={state?.listsData as any} />{' '}
          </>
        )}
      </>
    </div>
  );
};

export default AllUserMeetingSchedulesList;

const resData = [
  {
    date: '2024-12-30T00:00:00.000Z',
    meetings: [
      {
        _id: '65d5c997fd77a41a75fbda21',
        requestor: '65ccccd65f5f6a3fb980ac51',
        requestor_user_type: 'exhibitor',
        requestor_first_name: 'Eva',
        requestor_last_name: 'Exhibitor',
        requestor_email: 'exhibitor.eva@mailinator.com',
        requestor_company_name: '',
        requestor_company_id: null,
        requested_users: [
          '65ccccd65f5f6a3fb980ac51',
          '65c8b61602f07a5b5171616c',
        ],
        requested_users_details: [
          {
            first_name: 'Eva',
            last_name: 'Exhibitor',
            avatar: '',
            email: 'exhibitor.eva@mailinator.com',
            company_name: '',
            company_id: '',
            user_id: '65ccccd65f5f6a3fb980ac51',
            user_type: 'exhibitor',
            meeting_status: 'accepted',
            _id: '65d5c997fd77a41a75fbda22',
          },
          {
            first_name: 'Niten',
            last_name: 'Solanki',
            avatar: '',
            email: 'nitensolanki02@gmail.com',
            company_name: '',
            company_id: '',
            user_id: '65c8b61602f07a5b5171616c',
            user_type: 'exhibitor',
            meeting_status: 'pending',
            _id: '65d5c997fd77a41a75fbda23',
          },
        ],
        group_meetings: [],
        event: '65c358a0521dc5a4c4bb3e59',
        meeting_notes: 'Meeting notes',
        meeting_location: 'This is the second meeting requested by the user',
        meeting_date: '2024-12-30T00:00:00.000Z',
        meeting_start_time: '2023-12-31T00:00:00.000Z',
        meeting_end_time: '2023-12-31T00:00:00.000Z',
        meeting_status: 'pending',
        createdAt: '2024-02-21T09:59:52.003Z',
        updatedAt: '2024-02-21T09:59:52.003Z',
        __v: 0,
        id: '65d5c997fd77a41a75fbda21',
      },
    ],
  },
  {
    date: '2024-03-01T00:00:00.000Z',
    meetings: [
      {
        _id: '65d5c9a4fd77a41a75fbda62',
        requestor: '65ccccd65f5f6a3fb980ac51',
        requestor_user_type: 'exhibitor',
        requestor_first_name: 'Eva',
        requestor_last_name: 'Exhibitor',
        requestor_email: 'exhibitor.eva@mailinator.com',
        requestor_company_name: '',
        requestor_company_id: null,
        requested_users: [
          '65ccccd65f5f6a3fb980ac51',
          '65c8b61602f07a5b5171616c',
        ],
        requested_users_details: [
          {
            first_name: 'Eva',
            last_name: 'Exhibitor',
            avatar: '',
            email: 'exhibitor.eva@mailinator.com',
            company_name: '',
            company_id: '',
            user_id: '65ccccd65f5f6a3fb980ac51',
            user_type: 'exhibitor',
            meeting_status: 'accepted',
            _id: '65d5c9a4fd77a41a75fbda63',
          },
          {
            first_name: 'Niten',
            last_name: 'Solanki',
            avatar: '',
            email: 'nitensolanki02@gmail.com',
            company_name: '',
            company_id: '',
            user_id: '65c8b61602f07a5b5171616c',
            user_type: 'exhibitor',
            meeting_status: 'pending',
            _id: '65d5c9a4fd77a41a75fbda64',
          },
        ],
        group_meetings: [],
        event: '65c358a0521dc5a4c4bb3e59',
        meeting_notes: 'Meeting notes',
        meeting_location: 'This is the second meeting requested by the user',
        meeting_date: '2024-03-01T00:00:00.000Z',
        meeting_start_time: '2023-12-31T08:00:00.000Z',
        meeting_end_time: '2023-12-31T08:30:00.000Z',
        meeting_status: 'pending',
        createdAt: '2024-02-21T10:00:04.721Z',
        updatedAt: '2024-02-21T10:00:04.721Z',
        __v: 0,
        id: '65d5c9a4fd77a41a75fbda62',
      },
      {
        _id: '65d5c9a0fd77a41a75fbda40',
        requestor: '65ccccd65f5f6a3fb980ac51',
        requestor_user_type: 'exhibitor',
        requestor_first_name: 'Eva',
        requestor_last_name: 'Exhibitor',
        requestor_email: 'exhibitor.eva@mailinator.com',
        requestor_company_name: '',
        requestor_company_id: null,
        requested_users: [
          '65ccccd65f5f6a3fb980ac51',
          '65c8b61602f07a5b5171616c',
        ],
        requested_users_details: [
          {
            first_name: 'Eva',
            last_name: 'Exhibitor',
            avatar: '',
            email: 'exhibitor.eva@mailinator.com',
            company_name: '',
            company_id: '',
            user_id: '65ccccd65f5f6a3fb980ac51',
            user_type: 'exhibitor',
            meeting_status: 'accepted',
            _id: '65d5c9a0fd77a41a75fbda41',
          },
          {
            first_name: 'Niten',
            last_name: 'Solanki',
            avatar: '',
            email: 'nitensolanki02@gmail.com',
            company_name: '',
            company_id: '',
            user_id: '65c8b61602f07a5b5171616c',
            user_type: 'exhibitor',
            meeting_status: 'pending',
            _id: '65d5c9a0fd77a41a75fbda42',
          },
        ],
        group_meetings: [],
        event: '65c358a0521dc5a4c4bb3e59',
        meeting_notes: 'Meeting notes',
        meeting_location: 'This is the second meeting requested by the user',
        meeting_date: '2024-03-01T00:00:00.000Z',
        meeting_start_time: '2023-12-31T10:00:00.000Z',
        meeting_end_time: '2023-12-31T11:00:00.000Z',
        meeting_status: 'pending',
        createdAt: '2024-02-21T10:00:00.281Z',
        updatedAt: '2024-02-21T10:00:00.281Z',
        __v: 0,
        id: '65d5c9a0fd77a41a75fbda40',
      },
      {
        _id: '65d5c9a8fd77a41a75fbda81',
        requestor: '65ccccd65f5f6a3fb980ac51',
        requestor_user_type: 'exhibitor',
        requestor_first_name: 'Eva',
        requestor_last_name: 'Exhibitor',
        requestor_email: 'exhibitor.eva@mailinator.com',
        requestor_company_name: '',
        requestor_company_id: null,
        requested_users: [
          '65ccccd65f5f6a3fb980ac51',
          '65c8b61602f07a5b5171616c',
        ],
        requested_users_details: [
          {
            first_name: 'Eva',
            last_name: 'Exhibitor',
            avatar: '',
            email: 'exhibitor.eva@mailinator.com',
            company_name: '',
            company_id: '',
            user_id: '65ccccd65f5f6a3fb980ac51',
            user_type: 'exhibitor',
            meeting_status: 'accepted',
            _id: '65d5c9a8fd77a41a75fbda82',
          },
          {
            first_name: 'Niten',
            last_name: 'Solanki',
            avatar: '',
            email: 'nitensolanki02@gmail.com',
            company_name: '',
            company_id: '',
            user_id: '65c8b61602f07a5b5171616c',
            user_type: 'exhibitor',
            meeting_status: 'pending',
            _id: '65d5c9a8fd77a41a75fbda83',
          },
        ],
        group_meetings: [],
        event: '65c358a0521dc5a4c4bb3e59',
        meeting_notes: 'Meeting notes',
        meeting_location: 'This is the second meeting requested by the user',
        meeting_date: '2024-03-01T00:00:00.000Z',
        meeting_start_time: '2023-12-31T12:00:00.000Z',
        meeting_end_time: '2023-12-31T01:30:00.000Z',
        meeting_status: 'pending',
        createdAt: '2024-02-21T10:00:08.766Z',
        updatedAt: '2024-02-21T10:00:08.766Z',
        __v: 0,
        id: '65d5c9a8fd77a41a75fbda81',
      },
    ],
  },
  {
    date: '2024-02-28T00:00:00.000Z',
    meetings: [
      {
        _id: '65d5c9b0fd77a41a75fbdaa3',
        requestor: '65ccccd65f5f6a3fb980ac51',
        requestor_user_type: 'exhibitor',
        requestor_first_name: 'Eva',
        requestor_last_name: 'Exhibitor',
        requestor_email: 'exhibitor.eva@mailinator.com',
        requestor_company_name: '',
        requestor_company_id: null,
        requested_users: [
          '65ccccd65f5f6a3fb980ac51',
          '65c8b61602f07a5b5171616c',
        ],
        requested_users_details: [
          {
            first_name: 'Eva',
            last_name: 'Exhibitor',
            avatar: '',
            email: 'exhibitor.eva@mailinator.com',
            company_name: '',
            company_id: '',
            user_id: '65ccccd65f5f6a3fb980ac51',
            user_type: 'exhibitor',
            meeting_status: 'accepted',
            _id: '65d5c9b0fd77a41a75fbdaa4',
          },
          {
            first_name: 'Niten',
            last_name: 'Solanki',
            avatar: '',
            email: 'nitensolanki02@gmail.com',
            company_name: '',
            company_id: '',
            user_id: '65c8b61602f07a5b5171616c',
            user_type: 'exhibitor',
            meeting_status: 'pending',
            _id: '65d5c9b0fd77a41a75fbdaa5',
          },
        ],
        group_meetings: [],
        event: '65c358a0521dc5a4c4bb3e59',
        meeting_notes: 'Meeting notes',
        meeting_location: 'This is the second meeting requested by the user',
        meeting_date: '2024-02-28T00:00:00.000Z',
        meeting_start_time: '2023-12-31T00:00:00.000Z',
        meeting_end_time: '2023-12-31T00:00:00.000Z',
        meeting_status: 'pending',
        createdAt: '2024-02-21T10:00:16.321Z',
        updatedAt: '2024-02-21T10:00:16.321Z',
        __v: 0,
        id: '65d5c9b0fd77a41a75fbdaa3',
      },
    ],
  },
  {
    date: '2023-12-31T00:00:00.000Z',
    meetings: [
      {
        _id: '65d28d0d14029037d3f4ff25',
        requestor: '65cb56b344eec155229e74b7',
        requestor_user_type: 'delegate',
        requestor_first_name: 'Niten',
        requestor_last_name: 'Solanki',
        requestor_email: 'nitensolanki02@gmail.com',
        requested_users: [
          '65cb56b344eec155229e74b7',
          '65ccccd65f5f6a3fb980ac51',
        ],
        requested_users_details: [
          {
            first_name: 'Niten',
            last_name: 'Solanki',
            avatar:
              'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//207a11e88d2bb781b1c360b7a5aae081-dccc8875-4a5f-4ba6-ac62-3b02bfd22060',
            email: 'nitensolanki02@gmail.com',
            company_name: '',
            company_id: '',
            user_id: '65cb56b344eec155229e74b7',
            user_type: 'delegate',
            meeting_status: 'accepted',
            _id: '65d28d0d14029037d3f4ff26',
          },
          {
            first_name: 'Eva',
            last_name: 'Exhibitor',
            avatar: '',
            email: 'exhibitor.eva@mailinator.com',
            company_name: '',
            company_id: '',
            user_id: '65ccccd65f5f6a3fb980ac51',
            user_type: 'exhibitor',
            meeting_status: 'accepted',
            _id: '65d28d0d14029037d3f4ff27',
          },
        ],
        group_meetings: [],
        event: '65c358a0521dc5a4c4bb3e59',
        meeting_notes: 'Meeting notes',
        meeting_location: 'Meeting location',
        meeting_date: '2023-12-31T00:00:00.000Z',
        meeting_start_time: '2023-12-31T00:00:00.000Z',
        meeting_end_time: '2023-12-31T00:00:00.000Z',
        meeting_status: 'accepted',
        __v: 3,
        requestor_company_name: '',
        id: '65d28d0d14029037d3f4ff25',
      },
      {
        _id: '65d3325fd60266c98174194c',
        requestor: '65cccb9a5f5f6a3fb980ac1a',
        requestor_user_type: 'delegate',
        requestor_first_name: 'Eva',
        requestor_last_name: 'Delegate',
        requestor_email: 'delegate.eva@mailinator.com',
        requestor_company_name: '',
        requestor_company_id: null,
        requested_users: [
          '65ccccd65f5f6a3fb980ac51',
          '65c8b61602f07a5b5171616c',
        ],
        requested_users_details: [
          {
            first_name: 'Eva',
            last_name: 'Exhibitor',
            avatar: '',
            email: 'exhibitor.eva@mailinator.com',
            company_name: '',
            company_id: '',
            user_id: '65ccccd65f5f6a3fb980ac51',
            user_type: 'exhibitor',
            meeting_status: 'accepted',
            _id: '65d3325fd60266c98174194d',
          },
          {
            first_name: 'Niten',
            last_name: 'Solanki',
            avatar: '',
            email: 'nitensolanki02@gmail.com',
            company_name: '',
            company_id: '',
            user_id: '65c8b61602f07a5b5171616c',
            user_type: 'exhibitor',
            meeting_status: 'pending',
            _id: '65d3325fd60266c98174194e',
          },
        ],
        group_meetings: [],
        event: '65c358a0521dc5a4c4bb3e59',
        meeting_notes: 'Meeting notes',
        meeting_location: 'This is the second meeting requested by the user',
        meeting_date: '2023-12-31T00:00:00.000Z',
        meeting_start_time: '2023-12-31T00:00:00.000Z',
        meeting_end_time: '2023-12-31T00:00:00.000Z',
        meeting_status: 'pending',
        __v: 0,
        id: '65d3325fd60266c98174194c',
      },
    ],
  },
];
