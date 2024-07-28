'use client';

import { useEffect, useState } from 'react';
import { PiCaretUpDown, PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { useModal } from '@/app/shared/modal-views/use-modal';
import QuillEditor from '@/components/ui/quill-editor';
import Select from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Text, Title } from '@/components/ui/text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import Spinner from '@/components/ui/spinner';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { ProfileSurveyApi } from 'utils/api/ProfileSurveyApi';
import { useDispatch } from 'react-redux';
import { profileSettingAction } from '../../../redux/slice/profileSetting';

const ProfileSurveyCreate = ({ onClose }: any) => {
  const { closeModal } = useModal();
  const [state, setState] = useState({
    typeIsLoading: false,
    surveySectionOptions: [],
    isLoading: false,
  });

  const dispatch = useDispatch();

  const initialValues = {
    sectionType: '',
    sectionTypeId: '',
    question: '',
    description: '',
    textInput: 'checkbox',
  };

  const validationSchema = Yup.object({
    sectionTypeId: Yup.string().required(messages.selectSurveySectionRequired),
    question: Yup.string().required(messages.optionTitleIsRequired),
    description: Yup.string().optional(),
    textInput: Yup.string().optional(),
    sectionType: Yup.string().optional(),
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
      profile_survey_section_id: values?.sectionTypeId,
      option_type: values?.textInput,
    };
    let res = await ProfileSurveyApi.createSurveyOptions(profileSurveyData);

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        onClose();
        toast.success('Survey option created successfully');
        setTimeout(() => {
          dispatch(profileSettingAction?.setResetProfileSurveyOptionsList());
        }, 1000);
        break;

      case ResponseCodes.ALREADY_EXIST:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.CREATE_FAILED:
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

  const onChangeSelector = (newValue: any) => {
    formik.setFieldValue('sectionTypeId', newValue?.value);
    formik.setFieldValue('sectionType', newValue?.name);
  };

  const getSurveyTypeApi = async () => {
    setState({
      ...state,
      typeIsLoading: true,
    });
    let res = await ProfileSurveyApi.getSurveySections();

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        const profilesurveyOptions = res?.data?.data.map((data: any) => ({
          value: data?._id,
          name: data?.section_title,
        }));
        setState({
          ...state,
          typeIsLoading: false,
          surveySectionOptions: profilesurveyOptions,
        });
        break;

      default:
        toast.error('Internal server error!');
    }
  };

  const onChangeSwitch = (e: any) => {
    if (formik.values.textInput === 'checkbox') {
      formik.setFieldValue('textInput', 'input');
    } else {
      formik.setFieldValue('textInput', 'checkbox');
    }
  };

  useEffect(() => {
    getSurveyTypeApi();
  }, []);
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
                Add Option
              </Title>
              <ActionIcon size="sm" variant="text" onClick={onClose}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>

            <Select
              name="SelectType"
              label="Survey section*"
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
            />

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
                Create option
              </Button>
            </div>
          </>
        </form>
      </div>
    </>
  );
};

export default ProfileSurveyCreate;
function setFieldValue(arg0: string, arg1: any) {
  throw new Error('Function not implemented.');
}
