'use client';
import PageHeader from '@/app/shared/page-header';
import Spinner from '@/components/ui/spinner';
import EditMediaPartnerForm from '@/eva-components/mediaPartners/edit/EditMediaPartnerForm';
import { getEditParamsDetails } from '@/eva-components/other/getEditParams';
import EditSponsorForm from '@/eva-components/sponsors/edit/EditSponsorForm';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { MediaPartnerApi } from 'utils/api/user/MediaPartners';
import { SponsorApi } from 'utils/api/user/Sponsor';
import ResponseCodes from 'utils/response-codes';

const pageHeader = {
  title: 'Edit Media Partners',
  breadcrumb: [],
};

const EditMediaPartners = () => {
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
    let res = await MediaPartnerApi?.getMediaPartnersDetails(
      paramsDetails?.user_id
    );

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
        <EditMediaPartnerForm editData={state?.data} />
      )}
    </>
  );
};

export default EditMediaPartners;