'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import QuillEditor from '@/components/ui/quill-editor';
import { Title } from '@/components/ui/text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { CategoryApis, ICreateCategoryData } from 'utils/api/categories.apis';
import { ICategoryData } from '../type/api.types';

interface ICreateIndustriesModalForm {
  handleClose: () => void;
  handleSuccess: (industry: ICategoryData) => void;
  categoryName: string;
}

const CreateIndustriesModalForm: React.FC<ICreateIndustriesModalForm> = ({
  handleClose,
  handleSuccess,
  categoryName = '',
}: any) => {
  const [state, setState] = useState({
    typeIsLoading: false,
    isLoading: false,
  });

  const initialValues = {
    category_name: categoryName,
    description: '',
  };

  const validationSchema = Yup.object({
    category_name: Yup.string().required('Category name is required'),
    description: Yup.string().optional(),
  });

  const onSubmitHandler = async (values: any) => {
    console.log('values>>', values);

    setState({
      ...state,
      isLoading: true,
    });

    const data = {} as ICreateCategoryData;

    data.category_name = values.category_name;
    data.description = values.description;

    let res = await CategoryApis.createCategory(data);

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        toast.success('Industry created successfully');
        handleSuccess(res?.data as ICategoryData);
        break;

      case ResponseCodes.ALREADY_EXIST:
        toast.success('Industry already exists');
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

  useEffect(() => {
    formik.setFieldValue('category_name', categoryName);
  }, [categoryName]);

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
                Create Industry
              </Title>
              {/* <ActionIcon size="sm" variant="text" onClick={onClose}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon> */}
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
            />

            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => handleClose()}
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
          </>
        </form>
      </div>
    </>
  );
};

export default CreateIndustriesModalForm;
