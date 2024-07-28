import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Title } from 'rizzui';
import { ConferenceProgramsApi } from 'utils/api/event/ConferencePrograms';
import { NetworkingEventApi } from 'utils/api/event/NetworkingEvent';
import ResponseCodes from 'utils/response-codes';

const DeleteConferenceProgramModal = ({ event_id }: { event_id: string }) => {
  const { openModal } = useModal();

  return (
    <div>
      <Title as="h3" className="mb-12 mt-16 font-semibold sm:text-lg">
        Settings
      </Title>
      <div className={'mt-3 flex flex-wrap items-center gap-4'}>
        <Button
          variant="outline"
          className="w-full	 cursor-pointer bg-red text-sm text-white @lg:w-auto sm:w-1/5"
          onClick={() =>
            openModal({
              view: <DeleteModal event_id={event_id} />,
              customSize: '480px',
            })
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteConferenceProgramModal;

const DeleteModal = ({ event_id }: { event_id: string }) => {
  const { closeModal } = useModal();
  const [stateList, setStateList] = useState({
    loading: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    setStateList({
      ...stateList,
      loading: true,
    });

    let res = await ConferenceProgramsApi.deleteConferenceProgram(event_id);

    console.log('res-remove>>>', res);
    switch (res?.response_code) {
      case ResponseCodes.DELETE_SUCCESS:
        toast.success('Conference programme Delete successfully.');
        // let pathnameArray = pathname.split('/');
        // let event_id = pathnameArray[2];
        // router.push(
        //   routes?.event?.eventDetailView(event_id, 'networking-events')
        // );
        router.back();
        closeModal();
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error('Internal server error!');
    }
    setStateList({
      ...stateList,
      loading: false,
    });
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="relative mb-16 flex justify-center">
        <Title as="h3" className="mt-5 text-center font-semibold ">
          Are you sure to Delete this <br /> Conference Programs!
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="absolute right-0 "
        >
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          variant="outline"
          className="w-full @xl:w-auto"
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full @xl:w-auto"
          onClick={handleDelete}
          isLoading={stateList?.loading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
