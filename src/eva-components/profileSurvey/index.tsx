'use client';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import { ProfileSurveyApi } from 'utils/api/ProfileSurveyApi';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import ProfileSurveyOptions from './ProfileSurveyOptions';
import { useSelector } from 'react-redux';

const ProfileSurvey = () => {
  const [state, setState] = useState({
    isLoading: false,
    data: [],
  });
  const resetList = useSelector(
    (state: any) => state?.profileSetting?.resetProfileSurveyOptionsList
  );

  const getSurveyTypeApi = async () => {
    setState({
      ...state,
      isLoading: true,
    });
    let res = await ProfileSurveyApi.getSurveySectionsOptions();

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
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
    getSurveyTypeApi();
  }, [resetList]);
  return (
    <>
      {state.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <>
          <ProfileSurveyOptions surveyOptions={state?.data} />
        </>
      )}
    </>
  );
};

export default ProfileSurvey;
