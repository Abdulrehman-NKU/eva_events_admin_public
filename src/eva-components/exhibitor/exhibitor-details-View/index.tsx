'use client';

import cn from '@/utils/class-names';
import UserInfo from './user-info';
import ExhibitorDetails from './exhibitor-details';
import Spinner from '@/components/ui/spinner';
import { Title } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { ExhibitorDetailData } from '@/eva-components/type/propsInitialValue';
import { ExhibitorApi } from 'utils/api/user/Exhibitor';
import { useSelector } from 'react-redux';

interface CustomerProfileProps {
  className?: string;
}

export default function ExhibitorDetailsView({
  className,
}: CustomerProfileProps) {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    exhibitorDetail: ExhibitorDetailData,
  });

  const resetList = useSelector(
    (state: any) => state?.users?.resetExhibitorDetails
  );

  let getExhibitorDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let user_id = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await ExhibitorApi.getExhibitorsDetails(user_id);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          exhibitorDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Exhibitor not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getExhibitorDetailsApi();
  }, [resetList]);

  return (
    <>
      {state?.isLoading && state.exhibitorDetail !== null ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className={cn('@container', (className = 'mt-14'))}>
          <UserInfo exhibitorDetail={state?.exhibitorDetail as any} />
          <ExhibitorDetails exhibitorDetail={state?.exhibitorDetail as any} />
        </div>
      )}
    </>
  );
}
