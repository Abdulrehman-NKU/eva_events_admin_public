import SelectBox, { SelectOption } from './select';
import React, { useEffect, useState } from 'react';
import { PiCaretUpDown } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import axios, { CancelTokenSource } from 'axios';
import { CommonApi } from 'utils/api/user/Common';
import Constatnts from '../constatnt';
import { SelectorApis } from 'utils/api/selector.apis';
import { ICompanyData } from '../type/api.types';
import { ISelectorOption } from '../type/common.types';
import { Modal } from '@/components/ui/modal';
import CompaniesEventCreateForm from '../companies/form/CompaniesEventCreateForm';
import CreateCompanyFormForModal from '../companies/form/CreateCompanyFormForModal';

let cancelToken: CancelTokenSource;

let searchTimeout: any = null;

const CompanySelector = ({ formik, type }: { formik: any; type: string }) => {
  const [state, setState] = useState<{
    companies: SelectOption[];
    isLoading: boolean;
    searchValue: string;
    createCompanyModelState: boolean;
  }>({
    companies: [],
    isLoading: true,
    searchValue: '',
    createCompanyModelState: false,
  });

  let selectData = formik.values[`${type}sSelectData`];

  let selectedCompany = formik?.values?.company;

  const getCompanies = async ({ search }: { search: string }) => {
    setState({
      ...state,
      isLoading: true,
    });

    if (cancelToken) {
      cancelToken.cancel('operation canceled');
    }

    cancelToken = axios.CancelToken.source();

    const res = await SelectorApis.getCompanies({
      search: state.searchValue,
      //   cancelToken: cancelToken,
    });

    if (!res?.success) {
      toast.error(
        res?.message ??
          'Something went wrong, companies list is not fetched, please try to refresh the page'
      );
    }

    const responseCode = res?.response_code;

    if (responseCode === ResponseCodes.GET_SUCCESS) {
      const companiesList = res.data.docs as ICompanyData[];

      let updatedData = companiesList.map((company) => {
        return {
          name: company?.company_name,
          id: company?._id,
        };
      });

      setState({
        ...state,
        companies: updatedData as SelectOption[],
        isLoading: false,
      });

      return;
    }

    toast.error(
      res?.message ??
        'Something went wrong, companies list is not fetched, please try to refresh the page'
    );

    setState({
      ...state,
      isLoading: false,
    });
  };

  const roleDelete = (id: string) => {
    formik.setFieldValue('company', {
      name: '',
      id: '',
    });
    // if (type === 'media-partner') {
    //   const result = formik?.values?.mediaPartnersSelectData.filter(
    //     (data: any) => data?.id !== id
    //   );
    //   formik.setFieldValue(`mediaPartnersSelectData`, result);
    // } else {
    //   const result = selectData.filter((data: any) => data?.id !== id);
    //   formik.setFieldValue(`${type}sSelectData`, result);
    // }
  };

  const onChangeSelectBox = (e: any) => {
    let updateRolesArray = [];

    formik.setFieldValue('company', {
      name: e?.name,
      id: e?.id,
    });

    // const checkValue = selectData.filter((data: any) => data?.id === e?.id);

    // if (checkValue?.length == 0) {
    //   if (selectData?.length > 0) {
    //     updateRolesArray = [...selectData, e];
    //   } else {
    //     updateRolesArray = [e];
    //   }

    //   if (type === 'media-partner') {
    //     formik.setFieldValue('mediaPartnersSelectData', updateRolesArray);
    //   } else {
    //     formik.setFieldValue(`${type}sSelectData`, updateRolesArray);
    //   }
    // }
  };

  if (type === Constatnts.mediaPartner) {
    type = 'media-partner';
  }

  console.log('selectData-edit>>>', selectData);

  useEffect(() => {
    // getRoleApi(type, state.searchValue);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      getCompanies({ search: state.searchValue });
    }, 300);
  }, [state?.searchValue]);

  const handleModelClose = () => {
    setState({ ...state, createCompanyModelState: false });
  };

  const openCreateCompanyModel = () => {
    setState({ ...state, createCompanyModelState: true });
  };

  const handleCreateCompanySuccess = (company: ICompanyData) => {
    formik.setFieldValue('company', {
      name: company?.company_name,
      id: company?._id,
    });

    setState({
      ...state,
      createCompanyModelState: false,
    });
  };

  return (
    <>
      <Modal
        isOpen={state.createCompanyModelState}
        onClose={handleModelClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        customSize="800px"
      >
        <div className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900">
          <CreateCompanyFormForModal
            handleClose={handleModelClose}
            handleSuccess={handleCreateCompanySuccess}
            companyName={state?.searchValue as string}
          />
        </div>
      </Modal>
      <SelectBox
        placeholder={`Select Company`}
        options={state?.companies}
        // options={[]}
        label={`Select Company`}
        name="role"
        isLoading={true}
        onChange={onChangeSelectBox}
        className="col-span-full"
        getOptionValue={(option) => option}
        error={formik?.errors?.[`${type}sSelectData`] as any}
        state={state}
        setState={setState}
        suffix={<PiCaretUpDown className="h-5 w-5" />}
        searchBar={
          type === Constatnts.permission || type === Constatnts.role
            ? false
            : true
        }
        emptyListButtonState={{
          buttonText: 'Create Company',
          onClickHandler: openCreateCompanyModel,
          show: true,
        }}
      />
      <>
        {selectedCompany?.id ? (
          <div className="flex w-full flex-grow items-center justify-between rounded border	px-2 py-1 text-black dark:bg-red-50">
            <p>{selectedCompany?.name}</p>
            <div onClick={() => roleDelete(selectedCompany?.id)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Delete Item'}
                className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
              >
                <TrashIcon className="h-4 w-4" />
              </ActionIcon>
            </div>
          </div>
        ) : null}
      </>
    </>
  );
};

export default CompanySelector;
