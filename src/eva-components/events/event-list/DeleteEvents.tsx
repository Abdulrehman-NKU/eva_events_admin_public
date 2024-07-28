'use client';

import { Title, Text } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import TrashIcon from '@/components/icons/trash';
import { PiTrashFill, PiXBold } from 'react-icons/pi';
// import { getEventParamsDetails } from './getData';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { eventAction } from '../../../../redux/slice/event';
import { useDispatch } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { Input, Modal } from 'rizzui';
import styles from './DeleteEvents.module.scss';
import { IoMdAlert } from 'react-icons/io';

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete?: () => void;
  event_id: string;
  deleteEventName: string;
};

export default function DeleteEvents({
  title,
  description,
  event_id,
  deleteEventName,
}: DeletePopoverProps) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
    deleteModal: false,
    eventName: '',
  });

  const onClickDelete = async (id: string) => {
    setState({
      ...state,
      isLoading: true,
    });

    let res = await EventsApiServices.DeleteEvents(id);
    console.log('res-remove>>>', res);
    switch (res?.response_code) {
      case ResponseCodes.DELETE_SUCCESS:
        toast.success('Event Delete successfully.');
        setTimeout(() => {
          dispatch(eventAction?.setResetEventsList());
        }, 1000);
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
      deleteModal: false,
    });
  };

  const openDeleteModal = (setOpen: any) => {
    setState({
      ...state,
      deleteModal: true,
    });
  };

  const onClose = () => {
    setState({
      ...state,
      deleteModal: false,
      eventName: '',
    });
  };

  const onChangeEventName = (e: any) => {
    setState({
      ...state,
      eventName: e?.target?.value,
    });
  };

  return (
    <>
      <Modal
        isOpen={state?.deleteModal}
        onClose={onClose}
        size="lg"
        overlayClassName="dark:bg-opacity-40 bg-opacity-10"
        containerClassName="dark:bg-gray-100 rounded-md p-5 lg:p-6 shadow-none"
      >
        <div className="flex items-center justify-center pb-2 text-center lg:pb-3">
          <Title
            as="h3"
            className="flex items-center text-center text-lg font-semibold text-gray-900 xl:text-xl"
          >
            <IoMdAlert className="mr-2 text-2xl text-red" />
            Delete {deleteEventName}
          </Title>
        </div>

        <div className="mb-5 mt-5">
          <p className="mb-5 text-sm">
            Everything related to the event is completely erased after it is
            deleted, there is no way to undo it!
          </p>
          <p className="text-sm">Please type DELETE to delete the event.</p>

          <Input
            placeholder="Type DELETE here"
            // label="URL"
            className="col-span-2 mb-2 mt-4"
            onChange={onChangeEventName}
            value={state?.eventName}
          />
        </div>

        <div className=" flex  items-center justify-end border-t pt-4">
          <Button
            // isLoading={state?.isLoadingLoadMore}
            onClick={onClose}
            className="bg-white-100 pl-7 pr-7 text-black "
            style={{ border: '1px solid black' }}
          >
            cancel
          </Button>

          <Button
            isLoading={state?.isLoading}
            // onClick={onClickAddUser}
            className="ml-2 pl-8 pr-8 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={() => onClickDelete(event_id)}
            disabled={state?.eventName?.trim() == 'DELETE' ? false : true}
          >
            Delete
          </Button>
        </div>
      </Modal>

      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Delete Item'}
        className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
        onClick={openDeleteModal}
      >
        <TrashIcon className="h-4 w-4" />
      </ActionIcon>
    </>
  );
}
