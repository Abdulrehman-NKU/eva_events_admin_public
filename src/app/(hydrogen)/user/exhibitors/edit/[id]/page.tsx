'use client';
import PageHeader from '@/app/shared/page-header';
import Spinner from '@/components/ui/spinner';
import EditAdminForm from '@/eva-components/admin/edit/EditAdminForm';
import EditExhibitorForm from '@/eva-components/exhibitor/edit/EditExhibitorForm';
import { getEditParamsDetails } from '@/eva-components/other/getEditParams';
import { adminData } from '@/eva-components/type/propsInitialValue';
import { AdminType } from '@/eva-components/type/propsType';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { AdminApi } from 'utils/api/user/Admin';
import { ExhibitorApi } from 'utils/api/user/Exhibitor';
import ResponseCodes from 'utils/response-codes';

const pageHeader = {
  title: 'Edit Exhibitor',
  breadcrumb: [],
};

const EditExhibitor = () => {
  const [state, setState] = useState<any>({
    isLoading: true,
    data: {},
  });
  const pathname = usePathname();

  const getEditData = async () => {
    const paramsDetails = getEditParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });
    let res = await ExhibitorApi.getExhibitorsDetails(paramsDetails?.user_id);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        data: res?.data?.data,
      });
    } else {
      toast.error('Internal server error!');
    }

    console.log('res>>>>', res);
  };

  console.log('adminData>>', state?.adminData);

  useEffect(() => {
    getEditData();
  }, []);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {state?.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <EditExhibitorForm editData={state?.data} />
      )}
    </>
  );
};

export default EditExhibitor;
