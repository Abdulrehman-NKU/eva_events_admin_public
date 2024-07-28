'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Modal, Textarea } from 'rizzui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import { RoleApi } from 'utils/api/Role';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { roleAndPermissionAction } from '../../../../redux/slice/roleAndPermission';
import CustomSelectBox from '@/eva-components/selectBox/CustomSelectBox';
import Constatnts from '@/eva-components/constatnt';
import { StaffPermissionApi } from 'utils/api/staffPermission';
// main category form component for create and update category

interface editDataReduxType {
  _id: string;
  name: string;
  description: string;
}

export default function EditPermissionsModal() {
  const [state, setState] = useState({
    isLoading: false,
  });
  const dispatch = useDispatch();

  const editPermissionModal = useSelector(
    (state: any) => state?.roleAndPermission?.editPermissionModal
  );

  const editPermissionData: editDataReduxType = useSelector(
    (state: any) => state?.roleAndPermission?.editPermissionData
  );

  console.log('editPermissionData>>>', editPermissionData);

  const initialValues = {
    name: editPermissionData?.name,
    description: editPermissionData?.description,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(messages.nameIsRequired),
    description: Yup.string().optional(),
  });

  const onSubmitHandler = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
    });

    let permissionsEditData = {
      name: values?.name,
      description: values?.description,
    };

    let res = await StaffPermissionApi.editPermission({
      data: permissionsEditData,
      permission_id: editPermissionData?._id,
    });
    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        // router.push(routes.user.exhibitors);
        onClose();
        toast.success('Permission update successfully');
        dispatch(roleAndPermissionAction.resetPermissionsList());
        formik.resetForm();
        break;

      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error(res?.data?.message || 'Internal server error');
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
    dispatch(roleAndPermissionAction.setEditPermissionModal());
    dispatch(
      roleAndPermissionAction.setEditPermissionData({
        _id: '',
        name: '',
        description: '',
      })
    );
  };

  return (
    <Modal
      isOpen={editPermissionModal}
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
                Edit Permission
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
                Edit
              </Button>
            </div>
          </>
        </form>
      </div>
    </Modal>
  );
}
