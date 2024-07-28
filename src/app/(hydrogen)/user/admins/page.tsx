/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import AdminsListPage from '@/eva-components/admin/admin-list/AdminsListPage';
import { AdminApi } from 'utils/api/user/Admin';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { Input } from 'rizzui';
import axios, { CancelTokenSource } from 'axios';
import { useSelector } from 'react-redux';

const pageHeader = {
  title: 'Admins',
  breadcrumb: [
    // {
    //   href: routes.eCommerce.dashboard,
    //   name: 'User',
    // },
    // {
    //   href: routes.eCommerce.products,
    //   name: 'Admin',
    // },
    // {
    //   name: 'List',
    // },
  ],
};

let cancelToken: CancelTokenSource;
const AdminList = () => {
  const [state, setState] = useState({
    isLoading: false,
    adminsData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });
  const resetList = useSelector((state: any) => state?.users?.resetAdminsList);
  const getAdminApi = async (search: string, page: number, type?: string) => {
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
    let res = await AdminApi.getAdmin({
      search,
      page,
      limit: state?.perPageCount,
      cancelToken,
    });

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        adminsData: res?.data?.data?.docs,
        isLoading: false,
        currentPage: page,
        searchData: search,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error(res?.data?.message || 'Internal server error!');
    }
  };

  const onSearchChange = (e: any) => {
    getAdminApi(e.target.value, 1, 'search');
  };

  const paginationHandler = (page: number) => {
    getAdminApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getAdminApi(state?.searchData, state?.currentPage, 'initial');
  }, [resetList]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          /> */}
          <Link href={routes.user.createAdmin} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Admin
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* <ProductsTable data={productsData} /> */}
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
      <AdminsListPage
        data={state?.adminsData}
        loading={state.isLoading}
        totalDocs={state?.totalDocs}
        paginationHandler={paginationHandler}
        perPageCount={state?.perPageCount}
        resetCurrentPage={state?.resetCurrentPage}
      />
    </>
  );
};

export default AdminList;
