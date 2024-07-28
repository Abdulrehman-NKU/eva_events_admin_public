import { useModal } from '@/app/shared/modal-views/use-modal';
import PencilIcon from '@/components/icons/pencil';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ActionIcon, Tooltip } from 'rizzui';
import ConferenceProgramEdit from './ConferenceProgramEdit';
import { eventAction } from '../../../../../redux/slice/event';

const EditButton = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const onClickEdit = () => {
    dispatch(eventAction?.setConferenceProgramEditId({ id: id }));
  };
  return (
    <Tooltip
      size="sm"
      content={() => 'Edit Conference'}
      placement="top"
      color="invert"
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Edit Conference'}
        onClick={onClickEdit}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditButton;
