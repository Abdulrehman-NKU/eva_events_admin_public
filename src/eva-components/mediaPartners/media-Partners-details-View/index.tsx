'use client';

import cn from '@/utils/class-names';
import UserInfo from './user-info';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { MediaPartnersDetailData } from '@/eva-components/type/propsInitialValue';
import MediaPartnerDetails from './mediaPartners-details';
import { MediaPartnerApi } from 'utils/api/user/MediaPartners';
import { useSelector } from 'react-redux';

interface CustomerProfileProps {
  className?: string;
}

export default function MediaPartnerDetailsView({
  className,
}: CustomerProfileProps) {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    mediaPartnersDetail: MediaPartnersDetailData,
  });

  const resetList = useSelector(
    (state: any) => state?.users?.resetMediaPartnerDetails
  );


  let getMediaPartnersDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let user_id = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await MediaPartnerApi.getMediaPartnersDetails(user_id);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          mediaPartnersDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Media partner not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getMediaPartnersDetailsApi();
  }, [resetList]);

  return (
    <>
      {state?.isLoading && state.mediaPartnersDetail !== null ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className={cn('@container', (className = 'mt-14'))}>
          <UserInfo mediaPartnersDetail={state?.mediaPartnersDetail as any} />
          <MediaPartnerDetails
            mediaPartnersDetail={state?.mediaPartnersDetail as any}
          />
        </div>
      )}
    </>
  );
}
