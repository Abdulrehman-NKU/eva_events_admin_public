'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import QuillEditor from '@/components/ui/quill-editor';
import { Switch } from '@/components/ui/switch';
import { Text, Title } from '@/components/ui/text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { ProfileSurveyApi } from 'utils/api/ProfileSurveyApi';
import { profileSettingAction } from '../../../redux/slice/profileSetting';
import { useDispatch } from 'react-redux';

interface editDataType {
  section_title: string;
  createdAt: string;
  description: string;
  option_title: string;
  option_type: string;
  order: number;
  profile_survey_section_id: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const EditProfileSurvey = ({
  editData,
  onClose,
}: {
  editData: editDataType;
  onClose: any;
}) => {
  const [state, setState] = useState({
    typeIsLoading: false,
    surveySectionOptions: [],
    isLoading: false,
  });
  const dispatch = useDispatch();

  const initialValues = {
    // sectionType: editData?.section_title || '',
    // sectionTypeId: editData?.profile_survey_section_id || '',
    question: editData?.option_title || '',
    description: editData?.description || '',
    textInput: editData?.option_type || '',
  };

  const validationSchema = Yup.object({
    // sectionTypeId: Yup.string().required(messages.selectSurveySectionRequired),
    question: Yup.string().required(messages.optionTitleIsRequired),
    description: Yup.string().optional(),
    textInput: Yup.string().optional(),
    // sectionType: Yup.string().optional(),
  });

  const onSubmitHandler = async (values: any) => {
    console.log('values>>', values);
    setState({
      ...state,
      isLoading: true,
    });

    let profileSurveyData = {
      option_title: values?.question,
      description: values?.description,
      // profile_survey_section_id: values?.sectionTypeId,
      option_type: values?.textInput,
    };
    let res = await ProfileSurveyApi.editSurveyOptions(
      profileSurveyData,
      editData?._id
    );

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        onClose();
        toast.success('Survey option edit successfully');
        setTimeout(() => {
          dispatch(profileSettingAction?.setResetProfileSurveyOptionsList());
        }, 1000);
        break;

      case ResponseCodes.ALREADY_EXIST:
        toast.error(res?.data?.message);
        break;

      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error('Internal server error!');
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
  const onChangeDescription = (e: any) => {
    formik.setFieldValue('description', e as any);
  };

  // const onChangeSelector = (newValue: any) => {
  //   formik.setFieldValue('sectionTypeId', newValue?.value);
  //   formik.setFieldValue('sectionType', newValue?.name);
  // };

  // const getSurveyTypeApi = async () => {
  //   setState({
  //     ...state,
  //     typeIsLoading: true,
  //   });
  //   let res = await ProfileSurveyApi.getSurveySections();

  //   switch (res?.response_code) {
  //     case ResponseCodes.GET_SUCCESS:
  //       const profilesurveyOptions = res?.data?.data.map((data: any) => ({
  //         value: data?._id,
  //         name: data?.section_title,
  //       }));
  //       setState({
  //         ...state,
  //         typeIsLoading: false,
  //         surveySectionOptions: profilesurveyOptions,
  //       });
  //       break;

  //     default:
  //       toast.error('Internal server error!');
  //   }
  // };

  const onChangeSwitch = (e: any) => {
    if (formik.values.textInput === 'checkbox') {
      formik.setFieldValue('textInput', 'input');
    } else {
      formik.setFieldValue('textInput', 'checkbox');
    }
  };

  // useEffect(() => {
  //   getSurveyTypeApi();
  // }, []);
  return (
    <>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit Option
              </Title>
              <ActionIcon size="sm" variant="text" onClick={onClose}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>

            {/* <Select
              name="SelectType"
              label="Survey section "
              placeholder="Select survey section"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={formik.values?.sectionType}
              onChange={onChangeSelector}
              options={state?.surveySectionOptions}
              getOptionValue={(option) => option}
              disabled={state?.typeIsLoading}
              suffix={
                state.typeIsLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <PiCaretUpDown className="h-5 w-5" />
                )
              }
              // displayValue={(selected) =>
              //   state?.surveySectionOptions.find(
              //     (c: any) => c?.name === selected
              //   )?.name ?? ''
              // }
              error={formik?.errors?.sectionTypeId}
            /> */}

            <Input
              label="Option Title*"
              placeholder="Enter option title here"
              name="question"
              error={formik?.errors?.question}
              value={formik?.values?.question}
              onChange={formik.handleChange}
            />
            <QuillEditor
              label="Description"
              onChange={onChangeDescription}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              value={formik?.values?.description}
            />

            <div className="flex items-center gap-14">
              <Text as="span" className="text-sm font-semibold">
                Text Input
              </Text>
              <Switch
                // label="Text Input"
                className="col-span-full"
                name="switch"
                value={formik?.values?.textInput === 'checkbox' ? 'on' : 'off'}
                defaultChecked={
                  formik?.values?.textInput === 'checkbox' ? false : true
                }
                onChange={onChangeSwitch}
                switchClassName="dark:border-gray-400 "
                handlerClassName="dark:bg-gray-400"
              />
            </div>

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
                Edit option
              </Button>
            </div>
          </>
        </form>
      </div>
    </>
  );
};

export default EditProfileSurvey;
