'use client';

import { useEffect, useState } from 'react';
import AdminDetails from './admin-details';
import UserInfo from './user-info';
import cn from '@/utils/class-names';
import { usePathname } from 'next/navigation';
import { AdminApi } from 'utils/api/user/Admin';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { Title } from '@/components/ui/text';
import { Userdata } from '@/eva-components/other/user/getUserdata';

interface CustomerProfileProps {
  className?: string;
}
export default function AdminDetailsView({ className }: CustomerProfileProps) {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    adminDetail: null,
  });

  let getAdminDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let admin_id = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await AdminApi.getAdminDetails(admin_id);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          adminDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Admin not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getAdminDetailsApi();

    Userdata.getUserViewParamsData(pathname);
  }, []);
  return (
    <>
      {state?.isLoading && state.adminDetail !== null ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className={cn('@container', (className = 'mt-14'))}>
          <UserInfo adminDetail={state?.adminDetail as any} />
          <AdminDetails adminDetail={state?.adminDetail as any} />
        </div>
      )}
    </>
  );
}
