'use client';

import React, { useEffect, useState } from 'react';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { Checkbox } from '@/components/ui/checkbox';
import { profileSurveyOptionData } from '@/eva-components/type/propsInitialValue';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import { AllUsersApi } from 'utils/api/user/AllUsers';
import { usePathname } from 'next/navigation';
import { getParamsDetails } from '../getData';
import { paramsUserDetails } from '@/eva-components/type/propsType';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';

const AllUserMeetingManagement = () => {
  const [state, setState] = useState<any>({
    isLoading: false,
    data: null,
  });
  const pathname = usePathname();

  const getDataApi = async () => {
    let { user_id, users_type }: paramsUserDetails = getParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });
    let res = await AllUsersApi.getMeetingsManagements(user_id);
    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.SUCCESS:
        setState({
          ...state,
          isLoading: false,
          data: res?.data?.data,
        });
        break;

      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <>
      {state?.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <>
          <div className="mt-16  md:w-9/12">
            <div>
              <div className="font-inter text-xl font-semibold text-black ">
                <p>Availability</p>
              </div>
              <div className="mt-1 text-gray-500">
                <p>
                  If there are times which you would like us to block your
                  schedule, please advise so we can schedule your meetings
                  accordingly
                </p>
              </div>
              <div className="mt-5 flex flex-grow items-center justify-between rounded border border-black bg-slate-200 px-3 py-6 text-black	">
                {state?.data?.availability || '-'}
              </div>
            </div>

            <div className="mt-10">
              <div className="font-inter text-xl font-semibold text-black ">
                <p>1-1 Meetings Coordination</p>
              </div>
              <div className="mt-1 text-gray-500">
                <p>
                  You can appoint a 1-1 meeting coordinator to manage your group
                  company schedule. This person will manage the meetings for the
                  group and you can also select that only the coordinator will
                  receive the emails or enterie team
                </p>
              </div>
              <div>
                <div className="mt-5">
                  <label htmlFor="" className="text-black">
                    Coordinator Name
                  </label>
                  <div className="mt-1 flex flex-grow items-center justify-between rounded border border-black bg-slate-200 px-3 py-4 text-black	">
                    {state?.data?.one_to_one_meeting_coordinator_name || '-'}
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="text-black">
                    Email Address
                  </label>
                  <div className="mt-1 flex flex-grow items-center justify-between rounded border border-black bg-slate-200 px-3 py-4 text-black	">
                    {state?.data?.one_to_one_meeting_coordinator_email || '-'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="font-inter text-xl font-semibold text-black ">
                <p>Suggestions</p>
              </div>
              <div className="mt-1 text-gray-500">
                <p>
                  We’re eager to expand the scope and relevance of the
                  conference attendees. If there are any companies who you wish
                  to meet with, that do not appear on the current delegate list,
                  please add the names here
                </p>
              </div>
              <div className="mt-5 flex flex-grow items-center justify-between rounded border border-black bg-slate-200 px-3 py-6 text-black	">
                {state?.data?.suggestions || '-'}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllUserMeetingManagement;
