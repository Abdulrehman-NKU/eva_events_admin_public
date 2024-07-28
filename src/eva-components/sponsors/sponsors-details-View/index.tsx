'use client';

import cn from '@/utils/class-names';
import UserInfo from './user-info';
import Spinner from '@/components/ui/spinner';
import { Title } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { SponsorsDetailData } from '@/eva-components/type/propsInitialValue';
import SponsorsDetails from './sponsors-details';
import { SponsorApi } from 'utils/api/user/Sponsor';
import { useSelector } from 'react-redux';

interface CustomerProfileProps {
  className?: string;
}

export default function SponsorsDetailsView({
  className,
}: CustomerProfileProps) {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    sponsorsDetail: SponsorsDetailData,
  });
  const resetList = useSelector(
    (state: any) => state?.users?.resetSponsorDetails
  );

  let getSponsorsDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let user_id = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await SponsorApi.getSponsorsDetails(user_id);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          sponsorsDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Sponsors not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getSponsorsDetailsApi();
  }, [resetList]);
  return (
    <>
      {state?.isLoading && state.sponsorsDetail !== null ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className={cn('@container', (className = 'mt-14'))}>
          <UserInfo sponsorsDetail={state?.sponsorsDetail as any} />
          <SponsorsDetails sponsorsDetail={state?.sponsorsDetail as any} />
        </div>
      )}
    </>
  );
}
