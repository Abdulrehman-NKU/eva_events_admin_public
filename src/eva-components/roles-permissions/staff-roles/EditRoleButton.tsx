'use client';

import { Title, Text } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import TrashIcon from '@/components/icons/trash';
import { PiTrashFill } from 'react-icons/pi';
import { useState } from 'react';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { eventAction } from '../../../../redux/slice/event';
import { useDispatch } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { AdminApi } from 'utils/api/user/Admin';
import { usersAction } from '../../../../redux/slice/users';
import { RoleApi } from 'utils/api/Role';
import { Tooltip } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import { StaffRoleDataType } from '@/eva-components/type/propsType';
import { roleAndPermissionAction } from '../../../../redux/slice/roleAndPermission';

export default function EditRoleButton({
  editData,
}: {
  editData: StaffRoleDataType;
}) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
  });

  console.log('editData>>', editData);

  const onClickEditModal = (data: StaffRoleDataType) => {
    dispatch(roleAndPermissionAction.setEditRoleModal());
    dispatch(
      roleAndPermissionAction.setEditRoleData({
        _id: data?._id,
        role_name: data?.role_name,
        role_description: data?.role_description,
        permissions: data?.permissions,
      })
    );
  };

  return (
    <Tooltip
      size="sm"
      content={() => 'Edit Role'}
      placement="top"
      color="invert"
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Edit Admin'}
        onClick={() => onClickEditModal(editData)}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
}
