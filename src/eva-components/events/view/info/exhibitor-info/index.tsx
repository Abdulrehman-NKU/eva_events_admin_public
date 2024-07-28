'use client';
import QuillEditor from '@/components/ui/quill-editor';
import axios, { CancelTokenSource } from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import InfoLayout from './info-layout/InfoLayout';
import InfoEditorTab from './InfoEditorTab';

let cancelToken: CancelTokenSource;
const ExhibitorInfo = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let infoSearchArray = searchParams.get('info')?.split('-');
  const [state, setState] = useState({
    isLoading: true,
    infoData: '',
  });

  const getInfoDataApi = async () => {
    let event_id = pathname.split('/')[2];
    setState({
      ...state,
      isLoading: true,
    });
    cancelToken = axios.CancelToken.source();
    let res = await EventsApiServices?.getExhibitionInfo(event_id, cancelToken);
    console.log('res-event>>>>', res);
    let strValue: any = infoSearchArray?.join('_');
    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          infoData: res?.data?.data[strValue],
        });
        if (res?.data?.data[strValue]) {
          toast.success('Info saved successfully');
        }

        break;
      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getInfoDataApi();
  }, [searchParams]);

  return (
    <div className="pt-7 @container @2xl:pt-9 @3xl:pt-11">
      <div className="">
        <InfoLayout>
          <InfoEditorTab
            infoData={state?.infoData}
            loading={state?.isLoading}
          />
        </InfoLayout>
      </div>
    </div>
  );
};

export default ExhibitorInfo;
