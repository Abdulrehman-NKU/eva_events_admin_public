import React, { useEffect, useState } from 'react';
import { PiCaretUpDown } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import ResponseCodes from 'utils/response-codes';
import axios, { CancelTokenSource } from 'axios';
import { CommonApi } from 'utils/api/user/Common';
import UserSelectBox from './UserSelectBox';
import { UserDetails } from '@/eva-components/userDetails/userDetails';

let cancelToken: CancelTokenSource;
let searchTimeout: any = null;
const UsersListSelect = ({
  formik,
  event_id,
}: {
  formik: any;
  event_id: string;
}) => {
  const [state, setState] = useState({
    usersList: [],
    isLoading: false,
    searchValue: '',
  });

  let selectData = formik?.values?.assignedUser;

  const roleDelete = (id: string) => {
    const result = selectData.filter((data: any) => data?.id !== id);
    formik.setFieldValue(`assignedUser`, result);
  };

  const onChnageSelectBox = (e: any) => {
    // let updateRolesArray = [];
    //console.log("onChnageSelectBox");
    //console.log(e);
    //console.log("selectData" , selectData );
    const selectedNewUser = e;
    var finalSelection = [];
    const checkValue = selectData.filter((data: any) => data?.id === e?.id);
    
    if (checkValue?.length == 0) {
    	finalSelection = [...selectData, e];
    } else {
    	finalSelection = [...selectData ];
    } 
    
    //console.log("checkValue" , checkValue );
    //console.log("finalSelection" , finalSelection );
    //formik.setFieldValue(`assignedUser`, [e]);
    formik.setFieldValue(`assignedUser`, finalSelection);
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

  const getDataApi = async (search: string) => {
    setState({
      ...state,
      isLoading: true,
    });

    if (cancelToken) {
      cancelToken.cancel('operation cancel');
    }
    cancelToken = axios.CancelToken.source();
    let res = await CommonApi?.getEventUsersList({
      event_id: event_id as any,
      search,
      cancelToken,
    });
    console.log('res>>>', res);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      let updateList = res?.data?.data?.docs.map((data: any) => {
        if (data?.user_type === 'media_partners') {
          return {
            name: UserDetails.getUserName(data as any),
            id: data?._id,
            user_type: 'media partner',
          };
        } else {
          return {
            name: UserDetails.getUserName(data as any),
            id: data?._id,
            user_type: data?.user_type,
          };
        }
      });

      setState({
        ...state,
        isLoading: false,
        usersList: updateList,
      });
    }
  };

  useEffect(() => {
    if (state?.searchValue) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      searchTimeout = setTimeout(() => {
        getDataApi(state?.searchValue);
      }, 300);
    } else {
      getDataApi('');
    }
  }, [state.searchValue]);

  return (
    <>
      <UserSelectBox
        placeholder={`Assigned by user`}
        options={state?.usersList}
        label={`Assign this location exclusively to a multiple users(optional)`}
        name="role"
        onChange={onChnageSelectBox}
        className="col-span-full"
        getOptionValue={(option: any) => option}
        error={formik?.errors?.assignedUser as any}
        state={state}
        setState={setState}
        suffix={<PiCaretUpDown className="h-5 w-5" />}
        searchBar={true}
      />
      <>
        {selectData?.map((role: any) => (
          <div
            className=" flex w-full flex-grow items-center justify-between rounded	border px-2 py-1 text-black dark:bg-red-50"
            key={role?.id}
          >
            <p>
              {role?.name}
              <span
                style={{ fontSize: 12, color: 'gray' }}
              >{` (${role?.user_type})`}</span>
            </p>
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

export default UsersListSelect;
