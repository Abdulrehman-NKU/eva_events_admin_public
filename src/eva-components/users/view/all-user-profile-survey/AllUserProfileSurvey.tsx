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
const AllUserProfileSurvey = () => {
  const onChange = (e: any) => {
    console.log('e>>>', e);
  };

  const [state, setState] = useState({
    isLoading: false,
    data: [],
  });
  const pathname = usePathname();

  const getClass = (title: string) => {
    let classString;
    switch (title) {
      case 'Conference Aims':
        classString = ' grid  gap-10 lg:grid-cols-2';
        break;
      case 'Which region are you responsible for?':
        classString = ' grid  grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5';
        break;
      case 'What are of handling are you involved in?':
        classString = ' grid  grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-4';
        break;
      case 'What are your responsibilities?':
        classString = ' grid  grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3';
        break;
      default:
        classString = 'mt-14 grid  gap-10 lg:grid-cols-2';
    }
    return classString;
  };

  const getSurveyOptionsApi = async () => {
    let { user_id, users_type }: paramsUserDetails = getParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });
    let res = await AllUsersApi.getProfileSurvey(users_type, user_id);
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

  const getClassCheckboxCheck = (survey_options: any[]) => {
    let marginClass;
    const checkboxCheck = survey_options.filter(
      (survey_option) => survey_option?.option_type === 'checkbox'
    );

    if (checkboxCheck.length === 0) {
      marginClass = '';
    } else {
      marginClass = 'mt-10';
    }

    return marginClass;
  };

  useEffect(() => {
    getSurveyOptionsApi();
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
          {state?.data?.map((operationsData: any) => {
            if (operationsData?.survey_options?.length > 0)
              return (
                <div className=" mt-16" key={operationsData?._id}>
                  <div className="font-inter text-xl font-semibold text-black">
                    <p>{operationsData?.section_title}</p>
                  </div>

                  <div className="col-span-2">
                    <div
                      className={`${getClass(
                        operationsData?.section_title
                      )} ${getClassCheckboxCheck(
                        operationsData?.survey_options
                      )}`}
                    >
                      {operationsData?.survey_options.map(
                        (survey_option: any) => {
                          if (survey_option?.option_type === 'checkbox')
                            return (
                              <Checkbox
                                // name="app_notification"
                                label={survey_option?.option_title}
                                // value="news_updates"
                                variant="active"
                                inputClassName="checked:!bg-gray-900 border-gray-300"
                                labelClassName="pl-2 text-sm font-medium !text-gray-900"
                                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                                defaultValue={'on'}
                                disabled
                                defaultChecked={survey_option?.selected}
                              />
                            );
                        }
                      )}
                    </div>
                    <div className="mt-10 grid  gap-10">
                      {operationsData?.survey_options.map(
                        (survey_option: any) => {
                          if (survey_option?.option_type === 'input')
                            return (
                              <Checkbox
                                // name="app_notification"
                                label={`${survey_option?.option_title} : ${
                                  survey_option?.text_input || 'Empty input'
                                }`}
                                // value="news_updates"
                                variant="active"
                                inputClassName="checked:!bg-gray-900 border-gray-300"
                                labelClassName="pl-2 text-sm font-medium !text-gray-900"
                                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                                defaultValue={'on'}
                                disabled
                                defaultChecked={survey_option?.selected}
                              />
                            );
                        }
                      )}
                    </div>
                  </div>
                </div>
              );
          })}
        </>
      )}
    </>
  );
};

export default AllUserProfileSurvey;
