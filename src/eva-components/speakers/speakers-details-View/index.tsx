'use client';

import cn from '@/utils/class-names';
import UserInfo from './user-info';
import Spinner from '@/components/ui/spinner';
import { Title } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { SpeakersDetailData } from '@/eva-components/type/propsInitialValue';
import { ExhibitorApi } from 'utils/api/user/Exhibitor';
import SpeakersDetails from './speakers-details';
import { SpeakerApi } from 'utils/api/user/Speaker';
import { useSelector } from 'react-redux';

interface CustomerProfileProps {
  className?: string;
}

export default function SpeakersDetailsView({
  className,
}: CustomerProfileProps) {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    speakersDetail: SpeakersDetailData,
  });

  const resetList = useSelector(
    (state: any) => state?.users?.resetSpeakerDetails
  );

  let getSpeakersDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let user_id = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await SpeakerApi.getSpeakersDetails(user_id);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          speakersDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Event not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getSpeakersDetailsApi();
  }, [resetList]);

  return (
    <>
      {state?.isLoading && state.speakersDetail !== null ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className={cn('@container', (className = 'mt-14'))}>
          <UserInfo speakersDetail={state?.speakersDetail as any} />
          <SpeakersDetails speakersDetail={state?.speakersDetail as any}/>
        </div>
      )}
    </>
  );
}
