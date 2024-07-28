'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@/components/ui/modal';
import { eventAction } from '../../../../../redux/slice/event';
import ConferenceProgramEdit from './ConferenceProgramEdit';

export default function ConferenceProgramEditModal({
  conferenceProgramsData,
}: {
  conferenceProgramsData: any[];
}) {
  const conferenceProgramEditId = useSelector(
    (state: any) => state?.event?.conferenceProgramEditId
  );
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    isLoading: false,
    conferenceProgramEditData: {},
  });

  const onClose = () => {
    dispatch(eventAction?.setConferenceProgramEditId({ id: '' }));
  };

  const getEditData = () => {
    const editFilterData = conferenceProgramsData.filter(
      (data) => data?._id === conferenceProgramEditId
    );

    setState({
      ...state,
      conferenceProgramEditData: editFilterData[0],
    });
  };

  useEffect(() => {
    if (conferenceProgramEditId) {
      getEditData();
    }
  }, [conferenceProgramEditId]);

  return (
    <div>
      <Modal
        isOpen={conferenceProgramEditId ? true : false}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg h-100"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6 h-100"
        customSize="800px"
      >
        {state?.conferenceProgramEditData?._id && (
          <ConferenceProgramEdit
            editData={state?.conferenceProgramEditData as any}
          />
        )}
      </Modal>
    </div>
  );
}
