'use client';

import cn from '@/utils/class-names';
import UserInfo from './user-info';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { DelegateDetailData } from '@/eva-components/type/propsInitialValue';
import DelegatesDetails from './delegates-details';
import { DelegateApi } from 'utils/api/user/Delegate';
import { useSelector } from 'react-redux';

interface CustomerProfileProps {
  className?: string;
}

export default function DelegatesDetailsView({
  className,
}: CustomerProfileProps) {
  const pathname = usePathname();
  const [state, setState] = useState<any>({
    isLoading: false,
    delegateDetail: DelegateDetailData,
  });

  const resetList = useSelector(
    (state: any) => state?.users?.resetDelegateDetails
  );

  let getDelegateDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let user_id = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await DelegateApi.getDelegatesDetails(user_id);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          delegateDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Delegates not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getDelegateDetailsApi();
  }, [resetList]);
  return (
    <>
      {state?.isLoading && state.delegateDetail !== null ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className={cn('@container', (className = 'mt-14'))}>
          <UserInfo delegateDetail={state?.delegateDetail as any} />
          <DelegatesDetails delegateDetail={state?.delegateDetail as any} />
        </div>
      )}
    </>
  );
}
