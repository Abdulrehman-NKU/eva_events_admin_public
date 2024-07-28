'use client';
import PageHeader from '@/app/shared/page-header';
import Spinner from '@/components/ui/spinner';
import EditAdminForm from '@/eva-components/admin/edit/EditAdminForm';
import { LocalStorageHelpers } from '@/eva-components/helpers/localstorage.helpers';
import { getEditParamsDetails } from '@/eva-components/other/getEditParams';
import ProfileSettingsForm from '@/eva-components/profile/ProfileSettingsForm';
import { adminData } from '@/eva-components/type/propsInitialValue';
import { AdminType } from '@/eva-components/type/propsType';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { AdminApi } from 'utils/api/user/Admin';
import ResponseCodes from 'utils/response-codes';

const pageHeader = {
  title: 'Edit Admin',
  breadcrumb: [],
};

const ProfileSettings = () => {
  const [state, setState] = useState({
    isLoading: true,
    userData: {},
  });
  const pathname = usePathname();

  const getUserdata = async () => {
    let userData = LocalStorageHelpers.getUserData();
    setState({
      ...state,
      isLoading: true,
    });
    let res = await AdminApi.getAdminById(userData?._id);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        userData: res?.data?.data,
      });
    } else {
      toast.error('Internal server error!');
    }

  };

  useEffect(() => {
    getUserdata();
  }, []);

  return (
    <>
      {state?.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <ProfileSettingsForm userData={state?.userData} />
      )}

      {/* <CreateEditProduct /> */}
    </>
  );
};

export default ProfileSettings;
