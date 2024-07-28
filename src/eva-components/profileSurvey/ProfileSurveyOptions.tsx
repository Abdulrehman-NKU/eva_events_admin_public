import PencilIcon from '@/components/icons/pencil';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { ActionIcon, Text, Tooltip } from 'rizzui';
import DeleteHotel from '../events/hotel/DeleteHotel';
import EditProfileSurvey from './EditProfileSurvey';
import { Modal } from '@/components/ui/modal';
import DeleteSurveyOption from './DeleteSurveyOption';

const ProfileSurveyOptions = ({ surveyOptions }: { surveyOptions: any[] }) => {
  const [state, setState] = useState({
    editForm: false,
    editData: {},
  });
  const getClass = (title: string) => {
    let classString;
    switch (title) {
      case 'Conference Aims':
        classString = 'mt-8 grid grid-cols-1 gap-5';
        break;
      case 'Which region are you responsible for?':
        classString = 'mt-8 grid gap-5 lg:grid-cols-3  2xl:grid-cols-4';
        break;
      case 'What are of handling are you involved in?':
        classString = 'mt-8 grid gap-5 lg:grid-cols-3  2xl:grid-cols-4';
        break;
      case 'What are your responsibilities?':
        classString = 'mt-8 grid gap-5 lg:grid-cols-2  2xl:grid-cols-3';
        break;
      default:
        classString = 'mt-8 grid grid-cols-1 gap-5';
    }
    return classString;
  };

  const onClose = () => {
     ;
    setState({
      ...state,
      editForm: false,
      editData: {},
    });
  };

  const onClickEdit = (survey_option: any, title: string) => {
    const editDataUpdate = {
      ...survey_option,
      section_title: title,
    };

    setState({
      ...state,
      editForm: true,
      editData: editDataUpdate,
    });
  };
  return (
    <div>
      {surveyOptions?.map((option: any) => {
        if (option?.survey_options?.length > 0)
          return (
            <div key={option?._id}>
              <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="font-inter text-lg text-black font-semibold">
                  <p>{option?.section_title}</p>
                </div>
              </div>

              <div className={getClass(option?.section_title)}>
                {option?.survey_options?.map((survey_option: any) => (
                  <div
                    key={survey_option?._id}
                    className="relative flex items-center overflow-hidden rounded-lg border border-gray-200 bg-gray-0 p-4 px-5 dark:bg-gray-50"
                  >
                    <p
                      className={
                        'absolute bottom-0 left-0 flex items-center rounded-tr-lg bg-black px-1 text-gray-500 text-white'
                      }
                      style={{ fontSize: 10, height: 15 }}
                    >
                      {survey_option?.option_type}
                    </p>
                    <div className="flex w-full items-center  justify-between">
                      <div className="flex w-full items-center justify-between">
                        <Text className={cn('text-gray-500')}>
                          {survey_option?.option_title}
                        </Text>
                        <div className="flex gap-4">
                          <Tooltip
                            size="sm"
                            content={() => 'Edit Option'}
                            placement="top"
                            color="invert"
                          >
                            <ActionIcon
                              size="sm"
                              variant="outline"
                              aria-label={'Edit Option'}
                              onClick={() =>
                                onClickEdit(
                                  survey_option,
                                  option?.section_title
                                )
                              }
                            >
                              <PencilIcon className="h-4 w-4" />
                            </ActionIcon>
                          </Tooltip>

                          <DeleteSurveyOption
                            title={`Delete the Option`}
                            description={`Are you sure you want to delete ${survey_option?._id} Option ?`}
                            id={survey_option?._id}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
      })}
      <Modal
        isOpen={state?.editForm}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        customSize="800px"
      >
        <EditProfileSurvey
          editData={state?.editData as any}
          onClose={onClose}
        />
      </Modal>
    </div>
  );
};

export default ProfileSurveyOptions;
