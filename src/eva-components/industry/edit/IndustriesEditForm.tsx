'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { useModal } from '@/app/shared/modal-views/use-modal';
import QuillEditor from '@/components/ui/quill-editor';
import { Title } from '@/components/ui/text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryApis, ICreateCategoryData } from 'utils/api/categories.apis';
import { industryAction } from '../../../../redux/slice/industry';

const IndustriesEditForm = () => {
  const [state, setState] = useState({
    isLoading: false,
  });

  const dispatch = useDispatch();

  let industryEditData = useSelector(
    (state: any) => state?.industry?.industryEditData
  );

  const initialValues = {
    category_name: industryEditData?.category_name || '',
    description: industryEditData?.description || '',
  };

  const validationSchema = Yup.object({
    category_name: Yup.string().required('Category name is required'),
    description: Yup.string().optional(),
  });

  const onClose = () => {
    dispatch(industryAction.setIndustryEditModal());

    dispatch(
      industryAction.setIndustryEditData({
        category_name: '',
        description: '',
        _id: '',
      })
    );
  };

  const onSubmitHandler = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
    });

    const data = {} as ICreateCategoryData;

    data.category_name = values.category_name;
    data.description = values.description;

    let res = await CategoryApis.editCategory(data, industryEditData?._id);

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        toast.success('Industry edited successfully');
        onClose();
        dispatch(industryAction.setResetIndustriesList());
        break;

      case ResponseCodes.ALREADY_EXIST:
        toast.error('Industry already exists');
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
                Edit Industry
              </Title>
              <ActionIcon size="sm" variant="text" onClick={() => onClose()}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>

            <Input
              label="Industry name*"
              placeholder="Enter industry name"
              name="category_name"
              error={formik?.errors?.category_name as string}
              value={formik?.values?.category_name}
              onChange={formik.handleChange}
            />
            <QuillEditor
              label="Description"
              onChange={onChangeDescription}
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              value={formik?.values?.description}
            />

            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => onClose()}
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
          </>
        </form>
      </div>
    </>
  );
};

export default IndustriesEditForm;
