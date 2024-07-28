'use client';

import { routes } from '@/config/routes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { Input } from 'rizzui';
import { useSelector } from 'react-redux';
import PageHeader from '@/eva-components/page-header';
import CompanyListPage from '@/eva-components/companies/company-list/CompanyListPage';
import { CompaniesApi } from 'utils/api/Companies';

let searchTimeout: any = null;

const CompaniesList = () => {
  const pageHeader = {
    title: 'Companies',
  };

  const [state, setState] = useState({
    isLoading: false,
    listData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });

  const resetList = useSelector(
    (state: any) => state?.event?.resetCompaniesList
  );

  const getCompaniesApi = async (
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
    let res = await CompaniesApi.getCompaniesEventList({
      search,
      page,
      limit: state?.perPageCount,
    });

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        listData: res?.data?.data?.docs,
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
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      getCompaniesApi(e.target.value, 1, 'search');
    }, 300);
  };
  const paginationHandler = (page: number) => {
    getCompaniesApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getCompaniesApi(state?.searchData, state?.currentPage, 'initial');
  }, [resetList]);

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.companies.createcompanie}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Company
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
      <CompanyListPage
        data={state?.listData}
        loading={state?.isLoading}
        totalDocs={state?.totalDocs}
        paginationHandler={paginationHandler}
        perPageCount={state?.perPageCount}
        resetCurrentPage={state?.resetCurrentPage}
      />
    </>
  );
};

export default CompaniesList;
