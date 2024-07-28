import SelectBox from './select';
import { AnyARecord } from 'dns';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { PiCaretUpDown } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import ResponseCodes from 'utils/response-codes';
import { AdminApi } from 'utils/api/user/Admin';
import toast from 'react-hot-toast';
import { String } from 'lodash';
import axios, { CancelTokenSource } from 'axios';
import { CommonApi } from 'utils/api/user/Common';
import Constatnts from '../constatnt';

let cancelToken: CancelTokenSource;

const CustomSelectBox = ({ formik, type }: { formik: any; type: string }) => {
  const [state, setState] = useState({
    roleList: [],
    isLoading: false,
    searchValue: '',
  });

  let selectData = formik.values[`${type}sSelectData`];

  const roleDelete = (id: string) => {
    if (type === 'media-partner') {
      const result = formik?.values?.mediaPartnersSelectData.filter(
        (data: any) => data?.id !== id
      );
      formik.setFieldValue(`mediaPartnersSelectData`, result);
    } else {
      const result = selectData.filter((data: any) => data?.id !== id);
      formik.setFieldValue(`${type}sSelectData`, result);
    }
  };

  const onChnageSelectBox = (e: any) => {
    let updateRolesArray = [];

    const checkValue = selectData.filter((data: any) => data?.id === e?.id);

    if (checkValue?.length == 0) {
      if (selectData?.length > 0) {
        updateRolesArray = [...selectData, e];
      } else {
        updateRolesArray = [e];
      }
      if (type === 'media-partner') {
        formik.setFieldValue('mediaPartnersSelectData', updateRolesArray);
      } else {
        formik.setFieldValue(`${type}sSelectData`, updateRolesArray);
      }
    }
  };

  if (type === Constatnts.mediaPartner) {
    type = 'media-partner';
  }

  const getRoleApi = async (type: string, search: string) => {
    setState({
      ...state,
      isLoading: true,
    });

    if (cancelToken) {
      cancelToken.cancel('operation cancel');
    }
    let res;

    {
      if (search) {
        cancelToken = axios.CancelToken.source();
        res = await CommonApi.getSearchSelecterData({
          type,
          search,
          cancelToken,
        });
      } else {
        if (type === Constatnts?.permission) {
          res = await CommonApi.getSelecterDataWithoutSearch({ type });
        } else {
          res = await CommonApi.getSelecterData({ type });
        }
      }
    }

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      let updateList = [];

      switch (type) {
        case Constatnts.event:
          updateList = res?.data?.data?.docs.map(
            ({ _id, name }: { _id: string; name: string }) => {
              return {
                name: name,
                id: _id,
              };
            }
          );
          break;
        case Constatnts.exhibitor:
          updateList = res?.data?.data?.docs.map(
            ({
              _id,
              first_name,
              last_name,
            }: {
              _id: string;
              first_name: string;
              last_name: string;
            }) => {
              return {
                name: `${first_name} ${last_name}`,
                id: _id,
              };
            }
          );
          break;

        case Constatnts.sponsor:
          updateList = res?.data?.data?.docs.map(
            ({ _id, sponsor_name }: { _id: string; sponsor_name: string }) => {
              return {
                name: sponsor_name,
                id: _id,
              };
            }
          );
          break;

        case Constatnts.delegate:
          updateList = res?.data?.data?.docs.map(
            ({
              _id,
              first_name,
              last_name,
            }: {
              _id: string;
              first_name: string;
              last_name: string;
            }) => {
              return {
                name: `${first_name} ${last_name}`,
                id: _id,
              };
            }
          );
          break;

        case Constatnts.speaker:
          updateList = res?.data?.data?.docs.map(
            ({
              _id,
              first_name,
              last_name,
            }: {
              _id: string;
              first_name: string;
              last_name: string;
            }) => {
              return {
                name: `${first_name} ${last_name}`,
                id: _id,
              };
            }
          );
          break;

        case 'media-partner':
          updateList = res?.data?.data?.docs.map(
            ({
              _id,
              first_name,
              last_name,
            }: {
              _id: string;
              first_name: string;
              last_name: string;
            }) => {
              return {
                name: `${first_name} ${last_name}`,
                id: _id,
              };
            }
          );
          break;

        case Constatnts.permission:
          updateList = res?.data?.data?.map(
            ({ _id, name }: { _id: string; name: string }) => {
              return {
                name: name,
                id: _id,
              };
            }
          );
          break;
        default:
        // code block
      }

      setState({
        ...state,
        isLoading: false,
        roleList: updateList,
      });
    }
  };

  console.log('selectData-edit>>>', selectData);

  useEffect(() => {
    getRoleApi(type, state.searchValue);
  }, [state?.searchValue]);

  return (
    <>
      <SelectBox
        placeholder={`Select ${type}`}
        options={state?.roleList}
        label={`Select ${type}`}
        name="role"
        onChange={onChnageSelectBox}
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
      />
      <>
        {selectData?.map((role: any) => (
          <div
            className="flex w-full flex-grow items-center justify-between rounded border	px-2 py-1 text-black dark:bg-red-50"
            key={role?.id}
          >
            <p>{role?.name}</p>
            <div onClick={() => roleDelete(role?.id)}>
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
        ))}
      </>
    </>
  );
};

export default CustomSelectBox;
