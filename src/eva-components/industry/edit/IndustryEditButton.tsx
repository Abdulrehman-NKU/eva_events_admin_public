import { useModal } from '@/app/shared/modal-views/use-modal';
import PencilIcon from '@/components/icons/pencil';
import { AnyCnameRecord } from 'dns';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ActionIcon, Tooltip } from 'rizzui';
import { industryAction } from '../../../../redux/slice/industry';

const IndustryEditButton = ({ rowData }: { rowData: any }) => {
  const dispatch = useDispatch();
  const onClickEdit = () => {
    dispatch(industryAction.setIndustryEditModal());
    dispatch(
      industryAction.setIndustryEditData({
        category_name: rowData?.category_name,
        description: rowData?.description,
        _id: rowData?._id,
      })
    );
  };

  console.log('rowData>>>', rowData);

  return (
    <Tooltip
      size="sm"
      content={() => 'Edit industry'}
      placement="top"
      color="invert"
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Edit industry'}
        onClick={onClickEdit}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export default IndustryEditButton;
