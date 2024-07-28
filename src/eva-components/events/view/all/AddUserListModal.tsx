'use client';
import { PiMagnifyingGlassBold, PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useEffect, useState } from 'react';
import { followersData } from '@/data/profile-data';
import { Title } from '@/components/ui/text';
import FollowerModal from './follower-modal';
import { Input } from '@/components/ui/input';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import axios, { CancelTokenSource } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import toast from 'react-hot-toast';
import { StoreServices } from '../../../../../redux/storeServices/storeServices';
import { getEventParamsDetails } from './getData';
import Link from 'next/link';
import { CommonEnums } from '@/enums/common.enums';
import Constatnts from '@/eva-components/constatnt';

const pageHeader = {
  title: 'Event Exhibitors',
};
const tabs = [{ id: 'followers', count: followersData.length }];

let cancelToken: CancelTokenSource;

const AddUserListModal = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const addUserModal = useSelector((state: any) => state?.event?.addUserModal);
  const pathParams = getEventParamsDetails(pathname);
  const eventId = pathParams.event_id;
  let userType = pathParams.users_type;

  const [state, setState] = useState({
    isLoading: false,
    listData: [],
    isLoadingMore: false,
    addUserListData: [],
    isLoadingAddUser: false,
  });

  const onClose = () => {
    dispatch(eventAction?.setAddUserModal());
    dispatch(eventAction?.setAddUsersIdArray({ idsArray: [] }));
  };

  const getUserListApi = async (limit: number, search: string) => {
    let pathnameArray = pathname?.split('/');
    // let type = pathnameArray[3];
  

 

    setState({
      ...state,
      isLoading: true,
    });
  
    cancelToken = axios.CancelToken.source();
 
    let res = await EventsApiServices.getAddUsersList(
      'delegates',  
      pathnameArray[2],
      limit,
      search,
      cancelToken
    );
  
   
    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        addUserListData: res?.data?.data?.docs,
      });
    } else {
      toast.error('Add user list internal server error!');
    }

    console.log('res-user>>>>>', res);
  };

  const onChangeSearch = (e: any) => {
    let value = e.target.value;
    getUserListApi(20, value);
  };
  const onClickAddUser = async () => {
    const addUsersIdArray = StoreServices.getAddUsersIdArray();
    let pathnameArray = pathname?.split('/');
    let type = pathnameArray[3];
    let eventId = pathnameArray[2];
    setState({
      ...state,
      isLoadingAddUser: true,
    });
    cancelToken = axios.CancelToken.source();
    let addUserData;
    if (type === 'media-partners') {
      addUserData = { media_partner_ids: addUsersIdArray };
    } else {
      let userType = type.substring(0, type.length - 1);
      addUserData = { [`${userType}_ids`]: addUsersIdArray };
    }

    // console.log('addUserData-key>>>', addUserData);

    let res = await EventsApiServices.AddEventUsers(addUserData, type, eventId);
    console.log("resdfsssssssssssssssssss",res)

    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        onClose();
        toast.success('Users add successfully.');
        dispatch(eventAction?.setResetEventUsersList());
        // setTimeout(() => {
        //   dispatch(eventAction?.setResetEventUsersList());
        // }, 3000);
        break;
      case ResponseCodes.FAILED:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error(res?.data?.message);
        break;

      default:
        toast.error('Internal server error!');
    }

    console.log('res-add>>>', res);

    setState({
      ...state,
      isLoadingAddUser: false,
    });
  };

  useEffect(() => {
    getUserListApi(20, '');
  }, [addUserModal]);

  useEffect(() => {
    dispatch(eventAction?.closeAddUserModal());
  }, []);

  function handleTabClick() {
    dispatch(eventAction?.setAddUserModal());
  }

  const createUserRoute = `/user/${pathname?.split('/')[3]}/create?${
    CommonEnums.path.event_id
  }=${eventId}&${CommonEnums.path.redirect_url}=${pathname}`;

  console.log('createUserRoute >>>', createUserRoute);

  let createUserButtonTitle = '';

  if (userType === Constatnts.mediaPartners)
    createUserButtonTitle = 'Create media partner';
  if (userType === Constatnts.delegates)
    createUserButtonTitle = 'Create delegate';
  if (userType === Constatnts.speakers)
    createUserButtonTitle = 'Create speaker';
  if (userType === Constatnts.exhibitors)
    createUserButtonTitle = 'Create exhibitor';
  if (userType === Constatnts.sponsors)
    createUserButtonTitle = 'Create sponsor';

  return (
    <>
      <Modal
        isOpen={addUserModal}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex items-center justify-between pb-2 lg:pb-3">
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            Add {pathname?.split('/')[3]}
          </Title>
          {/* <Button
            tag="span"
            className="text-lightBlack  cursor-pointer bg-gray-100 text-sm"
          >
            Create {pathname?.split('/')[3]}
          </Button> */}
          <Button variant="text" onClick={onClose} className="h-auto px-1 py-1">
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
        </div>
        <Input
          type="search"
          placeholder="Search"
          // value={searchTerm}
          // onClear={onSearchClear}
          // onChange={onSearchChange}
          inputClassName="h-9"
          //   clearable={true}
          onChange={onChangeSearch}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        <FollowerModal
          data={state?.addUserListData}
          isLoading={state?.isLoading}
          type={pathname?.split('/')[3]}
        />

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <Link href={createUserRoute}>
              <Button
                // onClick={onClickAddUser}
                // onClick={handleTabClick}
                className={`pl-8 pr-8 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 ${
                  createUserButtonTitle === 'Create media partner'
                    ? 'text-xs'
                    : ''
                }`}
              >
                {createUserButtonTitle}
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-end">
            <Button
              // isLoading={state?.isLoadingLoadMore}
              onClick={onClose}
              className="bg-white-100 pl-7 pr-7 text-black "
              style={{ border: '1px solid black' }}
            >
              Cancel
            </Button>
            <Button
              isLoading={state?.isLoadingAddUser}
              onClick={onClickAddUser}
              className="ml-2 pl-8 pr-8 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUserListModal;
