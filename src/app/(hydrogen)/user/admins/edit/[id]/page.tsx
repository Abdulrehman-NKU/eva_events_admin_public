'use client';
import PageHeader from '@/app/shared/page-header';
import Spinner from '@/components/ui/spinner';
import EditAdminForm from '@/eva-components/admin/edit/EditAdminForm';
import { getEditParamsDetails } from '@/eva-components/other/getEditParams';
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

const EditAdmin = () => {
  const [state, setState] = useState({
    isLoading: true,
    adminData: {},
  });
  const pathname = usePathname();

  const getEditData = async () => {
    const paramsDetails = getEditParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });
    let res = await AdminApi.getAdminById(paramsDetails?.user_id);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        adminData: res?.data?.data,
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link> */}
      </PageHeader>
      {state?.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <EditAdminForm editData={state?.adminData} />
      )}

      {/* <CreateEditProduct /> */}
    </>
  );
};

export default EditAdmin;
