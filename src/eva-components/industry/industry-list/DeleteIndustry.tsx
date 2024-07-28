'use client';

import { Title, Text } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import TrashIcon from '@/components/icons/trash';
import { PiTrashFill } from 'react-icons/pi';
// import { getEventParamsDetails } from './getData';
import { useState } from 'react';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { IndustriesApis } from 'utils/api/industries.apis';

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete?: () => void;
  event_id: string;
};

export default function DeleteIndustry({
  title,
  description,
  event_id,
  onDelete = () => {},
}: DeletePopoverProps) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
  });

  const onClickDelete = async (id: string, setOpen: any) => {
    setOpen(false);
    setState({
      ...state,
      isLoading: true,
    });

    let res = await IndustriesApis.delete({ industry_id: id });
    console.log('res-remove>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.DELETE_SUCCESS:
        toast.success('Industry deleted successfully.');
        onDelete();
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

  return (
    <Popover
      placement="left"
      className="z-50"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Title
            as="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
          </Title>
          <Text className="mb-2 leading-relaxed text-gray-500">
            {description}
          </Text>
          <div className="flex items-center justify-end">
            <Button
              size="sm"
              className="me-1.5 h-7"
              onClick={() => onClickDelete(event_id, setOpen)}
            >
              Yes
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      )}
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Delete Item'}
        className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
      >
        {state?.isLoading ? (
          <Spinner size="sm" />
        ) : (
          <TrashIcon className="h-4 w-4" />
        )}
      </ActionIcon>
    </Popover>
  );
}
