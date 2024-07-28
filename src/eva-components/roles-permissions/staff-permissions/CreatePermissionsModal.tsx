'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { RgbaColorPicker } from 'react-colorful';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import {
  CreateRoleInput,
  createRoleSchema,
} from '@/utils/validators/create-role.schema';
import { Title } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Modal, Textarea } from 'rizzui';
import Constatnts from '../../constatnt';
import CustomSelectBox from '../../selectBox/CustomSelectBox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import { RoleApi } from 'utils/api/Role';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { roleAndPermissionAction } from '../../../../redux/slice/roleAndPermission';
import { StaffPermissionApi } from 'utils/api/staffPermission';

// main category form component for create and update category

const initialValues = {
  name: '',
  description: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required(messages.nameIsRequired),
  description: Yup.string().optional(),
});
export default function CreatePermissionsModal() {
  const [state, setState] = useState({
    isLoading: false,
  });

  const dispatch = useDispatch();
  const createPermissionModal = useSelector(
    (state: any) => state?.roleAndPermission?.createPermissionModal
  );

  // const onSubmit: SubmitHandler<CreateRoleInput> = (data) => {
  //   // set timeout ony required to display loading state of the create category button
  //   setLoading(true);
  //   setTimeout(() => {
  //     console.log('data', data);
  //     setLoading(false);
  //     setReset({
  //       roleName: '',
  //       roleColor: '',
  //     });
  //     closeModal();
  //   }, 600);
  // };

  // const handleCopyToClipboard = (rgba: string) => {
  //   copyToClipboard(rgba);

  //   setIsCopied(() => true);
  //   setTimeout(() => {
  //     setIsCopied(() => false);
  //   }, 3000); // 3 seconds
  // };

  const onSubmitHandler = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
    });

    let permissionData = {
      name: values?.name,
      description: values?.description,
    };

    let res = await StaffPermissionApi?.addPermission(permissionData);
    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        onClose();
        toast.success(res?.data?.message);
        dispatch(roleAndPermissionAction.resetPermissionsList());
        formik.resetForm();
        break;
      case ResponseCodes.ALREADY_EXIST:
        toast.error(res?.data?.message);
        break;

      case ResponseCodes.CREATE_FAILED:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error('Internal server error');
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
    dispatch(roleAndPermissionAction.setCreatePermissionModal());
  };

  return (
    <Modal
      isOpen={createPermissionModal}
      onClose={onClose}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg h-100"
      containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6 h-100"
      customSize="800px"
    >
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new permission
              </Title>
              <ActionIcon size="sm" variant="text" onClick={onClose}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Permission Name"
              placeholder="Permission name"
              name="name"
              error={formik?.errors?.name}
              value={formik?.values?.name}
              onChange={formik.handleChange}
            />

            <Textarea
              name="description"
              label="Description"
              placeholder="Enter permission description"
              error={formik?.errors?.description}
              value={formik?.values?.description}
              onChange={formik.handleChange}
            />

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
                Create
              </Button>
            </div>
          </>
        </form>
      </div>
    </Modal>
  );
}
