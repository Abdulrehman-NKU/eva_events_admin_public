'use client';
import { routes } from '@/config/routes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { SpeakerApi } from 'utils/api/user/Speaker';
import SpeakersListPage from '@/eva-components/speakers/speakers-list/SpeakersListPage';
import { Input } from 'rizzui';
import axios, { CancelTokenSource } from 'axios';
import { useSelector } from 'react-redux';
import PageHeader from '@/eva-components/page-header';
import { CommonApi } from 'utils/api/user/Common';
import ImportExportModal from '@/app/shared/Import-Export-Modal/ImportModal';
import { CommonEnums } from '@/enums/common.enums';

let cancelToken: CancelTokenSource;
const SpeakersList = () => {
  const pageHeader = {
    title: 'Speakers',
  };

  const [state, setState] = useState({
    isLoading: false,
    speakersData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });

  const resetList = useSelector(
    (state: any) => state?.users?.resetSpeakersList
  );

  const getSpeakerApi = async (search: string, page: number, type?: string) => {
    if (type === 'search') {
      setState({
        ...state,
        isLoading: true,
        resetCurrentPage: !state?.resetCurrentPage,
      });
    } else {
      setState({
        ...state,
        isLoading: true,
      });
    }
    cancelToken = axios.CancelToken.source();
    let res = await SpeakerApi.getSpeakers({
      search,
      page,
      limit: state?.perPageCount,
      cancelToken,
    });

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        speakersData: res?.data?.data?.docs,
        isLoading: false,
        currentPage: page,
        searchData: search,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error(res?.data?.message);
    }
    console.log('res>>>', res);
  };

  const onSearchChange = (e: any) => {
    getSpeakerApi(e.target.value, 1, 'search');
  };
  const paginationHandler = (page: number) => {
    getSpeakerApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getSpeakerApi(state?.searchData, state?.currentPage, 'initial');
  }, [resetList]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const downloadFunction = async (params: any) => {
    let res = await CommonApi.downnloadSampleExcel("speakerSample");
    if (res?.data?.message && !res.data?.success) {
      toast.error(res.data?.message)
    } else {
      toast.success(res.data?.message)
      window.open(`${CommonEnums.url.apiRoot}/${res?.data?.data}`)
    }
    return "";
  }
  const exportFunction = async (params: any) => {
    let res = await CommonApi.ExportExcel("speaker");
    if (res?.data?.message && !res.data?.success) {
      toast.error(res.data?.message)
    } else {
      toast.success(res.data?.message)
      window.open(`${CommonEnums.url.apiRoot}/${res?.data?.data}`)
    }
    return "";
  }
  const importFunction = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    let res = await CommonApi.importExcel({ data: formData,usertype:"speaker" });
    handleClose();
    if (res?.data?.message && !res.data?.success) {
      toast.error(res.data?.message)
    } else {
      toast.success(res.data?.message)
    }
    console.log("line 103", res)
    return "";
  }

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
        data={productsData}
        fileName="product_data"
        header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
      /> */}
          <Button
            tag="span"
            onClick={handleOpen}
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 cursor-pointer"
          >
            Import/Export
          </Button>
          <Link href={routes.user.createspeakers} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Speaker
            </Button>
          </Link>
        </div>
      </PageHeader>
      <div className="mb-5 flex flex-shrink-0 items-center">
        <Input
          type="search"
          placeholder="Search by anything..."
          onChange={onSearchChange}
          inputClassName="h-9"
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="me-2.5"
        />
      </div>
      <SpeakersListPage
        data={state?.speakersData}
        loading={state.isLoading}
        totalDocs={state?.totalDocs}
        paginationHandler={paginationHandler}
        perPageCount={state?.perPageCount}
        resetCurrentPage={state?.resetCurrentPage}
      />
      <ImportExportModal onClose={handleClose} open={open} downloadFunction={downloadFunction} exportFunction={exportFunction} importFunction={importFunction} />
    </>
  );
};

export default SpeakersList;
