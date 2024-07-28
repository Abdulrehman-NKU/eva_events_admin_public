/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RoleApi } from 'utils/api/Role';
import StaffRoles from '@/eva-components/roles-permissions/staff-roles/StaffRoles';
import { roleAndPermissionAction } from '../../../../redux/slice/roleAndPermission';
import CreateRole from '@/eva-components/roles-permissions/create-role';
import EditRoleModal from '@/eva-components/roles-permissions/staff-roles/EditroleModal';


const pageHeader = {
  title: 'Staff Roles',
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

const StaffRolesPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    rolesList: [],
  });
  const resetList = useSelector(
    (state: any) => state?.roleAndPermission?.resetRolesList
  );
  const editRoleModal = useSelector(
    (state: any) => state?.roleAndPermission?.editRoleModal
  );
  const dispatch = useDispatch();

  const roleListApi = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    let res = await RoleApi.getRole();

    console.log('res>>>', res);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        rolesList: res?.data?.data,
        isLoading: false,
      });
      // toast.success('Feach data');
    } else {
      toast.error('Internal server error!');
    }
  };

  const onClickCreateRoleModal = () => {
    dispatch(roleAndPermissionAction.setCreateRoleModal());
  };

  const onSearchChange = (e: any) => {
    // roleListApi(e.target.value);
  };

  useEffect(() => {
    roleListApi();
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
            onClick={onClickCreateRoleModal}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Role
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
      <StaffRoles data={state?.rolesList} loading={state.isLoading} />
      <CreateRole />
      {editRoleModal && <EditRoleModal/>}
    </>
  );
};

export default StaffRolesPage;
