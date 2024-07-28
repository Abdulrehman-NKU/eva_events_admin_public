'use client';
import { PiMagnifyingGlassBold, PiPlusBold, PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { productsData } from '@/data/products-data';
import EventExhibitorsTable from '@/eva-components/events/view/eventExhibitorsList/EventExhibitorsTable';
import PageHeader from '@/eva-components/page-header';
import { Modal } from '@/components/ui/modal';
import { useEffect, useState } from 'react';
import { followersData } from '@/data/profile-data';
import { Title } from '@/components/ui/text';

import { Input } from '@/components/ui/input';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';

import axios, { CancelTokenSource } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import { exhibitorData } from '@/eva-components/type/userListType';
import toast from 'react-hot-toast';
import { StoreServices } from '../../../../../redux/storeServices/storeServices';
import { data } from '@/app/shared/logistics/shipment/details/tracking-history';
import FollowerModal from '@/app/shared/profile/follower-modal';
import ModalEventHotelsList from './ModalEventHotelsList';
import { HotelApi } from 'utils/api/Hotel';
import { getEventParamsDetails } from '../../view/all/getData';

let cancelToken: CancelTokenSource;
const HotelsListModal = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const hotelsListModal = useSelector(
    (state: any) => state?.event?.hotelsListModal
  );

  const [state, setState] = useState({
    isLoading: false,
    listData: [],
    isLoadingMore: false,
    addHotelsListData: [],
    isLoadingAddUser: false,
  });

  const onClose = () => {
    dispatch(eventAction?.setHotelsListModal());
    dispatch(eventAction?.setAddHotelsIdArray({ idsArray: [] }));
  };

  const getHotelsApi = async (limit: number, search: string) => {
    let { event_id } = getEventParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });
    cancelToken = axios.CancelToken.source();
    let res = await HotelApi.getHotelsAddTOEvent(
      event_id,
      search,
      limit,
      cancelToken
    );

    console.log("res=hotel-list>>>",res);
    
    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        addHotelsListData: res?.data?.data?.docs,
      });
    } else {
      toast.error('Add Hotels list internal server error!');
    }

    console.log('res-user>>>>>', res);
  };

  const onChangeSearch = (e: any) => {
    let value = e.target.value;
    getHotelsApi(20, value);
  };
  const onClickAddUser = async () => {
    const addHotelsIdArray = StoreServices.getAddHotelsIdArray();
    let { event_id } = getEventParamsDetails(pathname);

    let addData = {
      event_id: event_id,
      hotel_ids: addHotelsIdArray,
    };

    setState({
      ...state,
      isLoadingAddUser: true,
    });

    let res = await HotelApi.addHotelsToEvent(addData);

    switch (res?.response_code) {
      case ResponseCodes.SUCCESS:
        onClose();
        toast.success('Hotels add successfully.');
        toast.success('Hotels list reload in 3 sec.');
        setTimeout(() => {
          dispatch(eventAction?.setResetHotelList());
        }, 3000);
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
    getHotelsApi(20, '');
  }, [hotelsListModal]);

  return (
    <>
      <Modal
        isOpen={hotelsListModal}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex items-center justify-between pb-2 lg:pb-3">
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            Add Hotels
          </Title>
          <Button variant="text" onClick={onClose} className="h-auto px-1 py-1">
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
        </div>
        <Input
          type="search"
          placeholder="Search"
          // value={searchTerm}
          // onClear={onSearchClear}
          inputClassName="h-9"
          //   clearable={true}
          onChange={onChangeSearch}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        <ModalEventHotelsList
          data={state?.addHotelsListData}
          isLoading={state?.isLoading}
        />
        <div className=" flex  items-center justify-end border-t pt-4">
          <Button
            // isLoading={state?.isLoadingLoadMore}
            onClick={onClose}
            className="bg-white-100 pl-7 pr-7 text-black "
            style={{ border: '1px solid black' }}
          >
            cancel
          </Button>

          <Button
            isLoading={state?.isLoadingAddUser}
            onClick={onClickAddUser}
            className="ml-2 pl-8 pr-8 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default HotelsListModal;
