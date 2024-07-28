'use client';

import Spinner from '@/components/ui/spinner';
import cn from '@/utils/class-names';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { RoleApi } from 'utils/api/Role';
import ResponseCodes from 'utils/response-codes';
import { rolesListData } from '../type/userListType';
import RoleCard from './role-card';
import { rolesList } from './roles-permissions';

interface RolesGridProps {
  className?: string;
  gridClassName?: string;
}

export default function RolesGrid({
  className,
  gridClassName,
}: RolesGridProps) {
  const [state, setState] = useState({
    isLoading: false,
    rolesList: [],
  });
  const roleListApi = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    let res = await RoleApi.getRole();

    console.log('res>>>', res);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        rolesList: res?.data?.data,
        isLoading: false,
      });
      // toast.success('Feach data');
    } else {
      toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    roleListApi();
  }, []);

  return (
    <>
      {state.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />

          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className={cn('@container', className)}>
          <div
            className={cn(
              'grid grid-cols-1 gap-6 @[36.65rem]:grid-cols-2 @[56rem]:grid-cols-3 @[78.5rem]:grid-cols-4 @[100rem]:grid-cols-5',
              gridClassName
            )}
          >
            <RoleCard data={state?.rolesList} />
          </div>
        </div>
      )}
    </>
  );
}
