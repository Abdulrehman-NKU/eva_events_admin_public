'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import DelegatesListPage from '@/eva-components/delegates/delegates-list/DelegatesListPage';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { DelegateApi } from 'utils/api/user/Delegate';
import { Input, Modal } from 'rizzui';
import axios, { CancelTokenSource } from 'axios';
import { useSelector } from 'react-redux';
import PageHeader from '@/eva-components/page-header';
import GlobalModal from '@/app/shared/modal-views/container';
import ImportExportModal from '@/app/shared/Import-Export-Modal/ImportModal';
import { CommonApi } from 'utils/api/user/Common';
import { CommonEnums } from '@/enums/common.enums';

let cancelToken: CancelTokenSource;
const DelegatesList = () => {
  const pageHeader = {
    title: 'Delegates',
  };
  const [state, setState] = useState({
    isLoading: false,
    delegatesData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });
  const resetList = useSelector(
    (state: any) => state?.users?.resetDelegatesList
  );

  const getDelegatesApi = async (
    search: string,
    page: number,
    type?: string
  ) => {
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
    let res = await DelegateApi.getDelegates({
      search,
      page,
      limit: state?.perPageCount,
      cancelToken,
    });

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        delegatesData: res?.data?.data?.docs,
        isLoading: false,
        currentPage: page,
        searchData: search,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error(res?.data?.message || 'Internal server error!');
    }

    console.log('res>>>', res);
  };

  const onSearchChange = (e: any) => {
    getDelegatesApi(e.target.value, 1, 'search');
  };
  const paginationHandler = (page: number) => {
    getDelegatesApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getDelegatesApi('', state?.currentPage, 'initial');
  }, [resetList]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const downloadFunction = async () => {
    setState({
      ...state,
      isLoading: true,
    })
    let res = await CommonApi.downnloadSampleExcel("delegateSample");
    setState({
      ...state,
      isLoading: false,
    })
    console.log("lome 96",res)
    if (res?.data?.message && !res.data?.success) {
      toast.error(res.data?.message)
    } else {
      if(res.data?.message) {
        toast.success(res.data?.message)
      }
      window.open(`${CommonEnums.url.apiRoot}/${res?.data?.data}`)
    }
    return "";
  }
  const exportFunction = async (params: any) => {
    setState({
      ...state,
      isLoading: true,
    })
    let res = await CommonApi.ExportExcel("delegate");
    setState({
      ...state,
      isLoading: false,
    })
    if (res?.data?.message && !res.data?.success) {
      toast.error(res.data?.message)
    } else {
      if(res.data?.message) {
        toast.success(res.data?.message)
      }
      window.open(`${CommonEnums.url.apiRoot}/${res?.data?.data}`)
    }
    return "";
  }
  const importFunction = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    setState({
      ...state,
      isLoading: true,
    })
    handleClose();
    let res = await CommonApi.importExcel({ data: formData,usertype:"delegate" });
    if (res?.data?.message && !res.data?.success) {
      toast.error(res.data?.message)
      setState({
        ...state,
        isLoading: false,
      })
    } else {
      if(res.data?.message) {
        toast.success(res.data?.message)
        getDelegatesApi('', 1, 'initial');
        setState({
          ...state,
          isLoading: false,
          searchData: '',
          currentPage: 1,
        })
      }
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
          <Link
            href={routes.user.createdelegates}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Delegate
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

      <DelegatesListPage
        data={state.delegatesData}
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

export default DelegatesList;
