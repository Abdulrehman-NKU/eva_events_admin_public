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
import { StaffPermissionDataType } from '@/eva-components/type/propsType';
import { roleAndPermissionAction } from '../../../../redux/slice/roleAndPermission';

export default function EditPermissionButton({
  editData,
}: {
  editData: StaffPermissionDataType;
}) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
  });

  const onClickEditModal = (data: StaffPermissionDataType) => {
    dispatch(roleAndPermissionAction.setEditPermissionModal());
    dispatch(
      roleAndPermissionAction.setEditPermissionData({
        _id: data?._id,
        name: data?.name,
        description: data?.description,
      })
    );
  };

  return (
    <Tooltip
      size="sm"
      content={() => 'Edit Permission'}
      placement="top"
      color="invert"
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Edit Permission'}
        onClick={() => onClickEditModal(editData)}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
}
