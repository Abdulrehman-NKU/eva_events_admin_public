/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { roleAndPermissionAction } from '../../../../redux/slice/roleAndPermission';
import StaffPermissionsList from '@/eva-components/roles-permissions/staff-permissions/StaffPermissionsList';
import { StaffPermissionApi } from 'utils/api/staffPermission';
import CreatePermissionsModal from '@/eva-components/roles-permissions/staff-permissions/CreatePermissionsModal';
import EditPermissionsModal from '@/eva-components/roles-permissions/staff-permissions/EditPermissionsModal';

const pageHeader = {
  title: 'Staff Permissions',
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

const StaffPermissionsPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    permissionsList: [],
  });
  const resetList = useSelector(
    (state: any) => state?.roleAndPermission?.resetPermissionsList
  );
  const editPermissionModal = useSelector(
    (state: any) => state?.roleAndPermission?.editPermissionModal
  );
  const dispatch = useDispatch();

  const permissionListApi = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    let res = await StaffPermissionApi.getPermissions();

    console.log('res>>>', res);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        permissionsList: res?.data?.data,
        isLoading: false,
      });
      // toast.success('Feach data');
    } else {
      toast.error('Internal server error!');
    }
  };

  const onClickCreateModal = () => {
    dispatch(roleAndPermissionAction.setCreatePermissionModal());
  };

  useEffect(() => {
    permissionListApi();
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

          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={onClickCreateModal}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Permission
          </Button>
        </div>
      </PageHeader>

      {/* <ProductsTable data={productsData} /> */}
      {/* <div className="mb-5 flex flex-shrink-0 items-center">
        <Input
          type="search"
          placeholder="Search by anything..."
          onChange={onSearchChange}
          inputClassName="h-9"
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="me-2.5"
        />
      </div> */}
      <StaffPermissionsList
        data={state?.permissionsList}
        loading={state.isLoading}
      />
      <CreatePermissionsModal />
      {editPermissionModal && <EditPermissionsModal />}
    </>
  );
};

export default StaffPermissionsPage;
