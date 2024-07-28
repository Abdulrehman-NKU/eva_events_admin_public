'use client';
import QuillEditor from '@/components/ui/quill-editor';
import Spinner from '@/components/ui/spinner';
import { cloneDeep } from 'lodash';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../../redux/slice/event';
import { Button, Text, Title } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import PreviewInfo from './PreviewInfo';

let saveInfoTimeout: any = null;
const InfoEditorTab = ({
  infoData,
  loading,
}: {
  infoData: string;
  loading: boolean;
}) => {
  const [state, setState] = useState({
    previewBtn: false,
    editorValue: '',
    isLoadingSave: false,
  });

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let infoSearchArray = searchParams.get('info')?.split('-');

  let exhibitorInfoSubmitLoading = useSelector(
    (state: any) => state?.event?.exhibitorInfoSubmitLoading
  );

  const onClickPreview = () => {
    if (state?.editorValue?.length !== 0) {
      setState({
        ...state,
        previewBtn: !state.previewBtn,
      });
    }
  };

  const autoSaveApi = async () => {
    const strValue = infoSearchArray?.join('_');
    let event_id = pathname.split('/')[2];
    let exhibitionInfo = {
      content: state?.editorValue,
      info_type: strValue,
      event_id: event_id,
    };
    let res = await EventsApiServices.CreateExhibitionInfo(exhibitionInfo);
  };

  const onChangeEditor = (e: any) => {
    setState({
      ...state,
      editorValue: e,
    });
    // dispatch(eventAction.exhibitorInfoSubmitLoading());

    if (saveInfoTimeout) {
      clearTimeout(saveInfoTimeout);
    }

    saveInfoTimeout = setTimeout(() => {
      autoSaveApi();
    }, 5000);
  };
  const onClickSave = () => {
    if (state?.editorValue) {
      createExhibitionInfoApi();
    }
  };

  const createExhibitionInfoApi = async () => {
    let event_id = pathname.split('/')[2];
    const strValue = infoSearchArray?.join('_');
    console.log('strValue', infoSearchArray?.join('_'));
    let exhibitionInfo = {
      content: state?.editorValue,
      info_type: strValue,
      event_id,
    };
    dispatch(eventAction.setExhibitorInfoSubmitLoading());
    let res = await EventsApiServices.CreateExhibitionInfo(exhibitionInfo);
    // console.log('res>>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.CREATE_SUCCESS:
        const updatedState = cloneDeep(state);

        setState({
          ...updatedState,
          // editorValue: '',
          previewBtn: true,
        });

        toast.success('Info saved successfully');
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);

        break;
      default:
        toast.error('Internal server error!');
    }
    dispatch(eventAction.setExhibitorInfoSubmitLoading());
  };

  useEffect(() => {
    if (infoData?.length === 0) {
      setState({
        ...state,
        editorValue: '',
        previewBtn: false,
      });
    } else {
      setState({
        ...state,
        editorValue: infoData,
        previewBtn: true,
      });
    }
  }, [infoData, searchParams]);

  console.log('isLoading>>>', state?.isLoadingSave);

  return (
    <>
      <div className="col-span-2">
        <div className="flex items-center justify-between	">
          <Text as="span" className={` text-xl font-semibold text-black`}>
            {infoSearchArray?.map((data: string, idx) => (
              <span className="capitalize" key={idx}>
                {data}&nbsp;
              </span>
            ))}
          </Text>
          <div className="">
            <Button
              className="border-1px mr-4 w-28 bg-white	 text-black"
              onClick={onClickPreview}
            >
              {state?.previewBtn ? 'Edit' : ' Preview'}
            </Button>
            <Button
              className="pl-7 pr-7"
              isLoading={exhibitorInfoSubmitLoading}
              onClick={onClickSave}
            >
              Save
            </Button>
          </div>
        </div>

        <>
          {loading ? (
            <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
              <Spinner size="xl" />
              <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
                Loading...
              </Title>
            </div>
          ) : state?.previewBtn ? (
            <PreviewInfo previewValue={state?.editorValue} />
          ) : (
            <QuillEditor
              onChange={onChangeEditor}
              // label="Description"
              value={state?.editorValue}
              className="col-span-full mt-4 [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          )}
        </>
      </div>
    </>
  );
};

export default InfoEditorTab;
