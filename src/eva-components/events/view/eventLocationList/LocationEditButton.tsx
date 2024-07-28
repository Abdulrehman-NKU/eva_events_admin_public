import { useModal } from '@/app/shared/modal-views/use-modal';
import PencilIcon from '@/components/icons/pencil';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ActionIcon, Tooltip } from 'rizzui';

import { eventAction } from '../../../../../redux/slice/event';

const LocationEditButton = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const onClickEdit = () => {
    dispatch(
      eventAction?.setEventLocationEditModalData({
        _id: data?._id,
        location_name: data?.location_name,
        assigned_to_id: data?.assigned_to,
        assigned_to_name: data?.assigned_to_name,
        assigned_to_multiple_ids: data?.assigned_to_multiple_ids,
        assigned_to_user_info: data?.assigned_to_user_info,
        user_type: data?.user_type,
      })
    );
  };
  return (
    <Tooltip
      size="sm"
      content={() => 'Edit Location'}
      placement="top"
      color="invert"
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Edit Location'}
        onClick={onClickEdit}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export default LocationEditButton;
