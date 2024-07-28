import SelectBox, { SelectOption } from './select';
import React, { useEffect, useState } from 'react';
import { PiCaretUpDown } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import axios, { CancelTokenSource } from 'axios';
import Constatnts from '../constatnt';
import { SelectorApis } from 'utils/api/selector.apis';
import { ICategoryData } from '../type/api.types';
import { Modal } from '@/components/ui/modal';
import CreateIndustriesModalForm from '../industry/CreateIndustriesModalForm';

let cancelToken: CancelTokenSource;

let searchTimeout: any = null;

const CategoriesSelector = ({
  formik,
  type,
  label,
}: {
  formik: any;
  type: string;
  label?: string;
}) => {
  const [state, setState] = useState<{
    categories: SelectOption[];
    isLoading: boolean;
    searchValue: string;
    createCategoryModelState: boolean;
  }>({
    categories: [],
    isLoading: true,
    searchValue: '',
    createCategoryModelState: false,
  });

  let selectData = formik.values[`${type}sSelectData`];

  let selectedCategory = formik?.values?.category;

  const getCompanies = async ({ search }: { search: string }) => {
    setState({
      ...state,
      isLoading: true,
    });

    if (cancelToken) {
      cancelToken.cancel('operation canceled');
    }

    cancelToken = axios.CancelToken.source();

    const res = await SelectorApis.getCategories({
      search: state.searchValue,
      //   cancelToken: cancelToken,
    });

    if (!res?.success) {
      toast.error(
        res?.message ??
          'Something went wrong, categories list is not fetched, please try to refresh the page'
      );
    }

    const responseCode = res?.response_code;

    if (responseCode === ResponseCodes.GET_SUCCESS) {
      const companiesList = res.data.docs as ICategoryData[];

      let updatedData = companiesList.map((company) => {
        return {
          name: company?.category_name,
          id: company?._id,
        };
      });

      setState({
        ...state,
        categories: updatedData as SelectOption[],
        isLoading: false,
      });

      return;
    }

    toast.error(
      res?.message ??
        'Something went wrong, categories list is not fetched, please try to refresh the page'
    );

    setState({
      ...state,
      isLoading: false,
    });
  };

  const roleDelete = (id: string) => {
    formik.setFieldValue('category', {
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

    formik.setFieldValue('category', {
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
    setState({ ...state, createCategoryModelState: false });
  };

  const openCreateCompanyModel = () => {
    setState({ ...state, createCategoryModelState: true });
  };

  const handleCreateCategorySuccess = (category: ICategoryData) => {
    formik.setFieldValue('category', {
      name: category?.category_name,
      id: category?._id,
    });

    setState({
      ...state,
      createCategoryModelState: false,
    });
  };

  return (
    <>
      <Modal
        isOpen={state.createCategoryModelState}
        onClose={handleModelClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        customSize="800px"
      >
        <CreateIndustriesModalForm
          categoryName={state.searchValue}
          handleClose={handleModelClose}
          handleSuccess={handleCreateCategorySuccess}
        />
      </Modal>
      <SelectBox
        placeholder={label || `Select Category`}
        options={state?.categories}
        // options={[]}
        label={label || `Select Category`}
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
          buttonText: `Create ${label || 'Category'}`,
          onClickHandler: openCreateCompanyModel,
          show: true,
        }}
      />
      <>
        {selectedCategory?.id ? (
          <div className="flex w-full flex-grow items-center justify-between rounded border	px-2 py-1 text-black dark:bg-red-50">
            <p>{selectedCategory?.name}</p>
            <div onClick={() => roleDelete(selectedCategory?.id)}>
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

export default CategoriesSelector;
