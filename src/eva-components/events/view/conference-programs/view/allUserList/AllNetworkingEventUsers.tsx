'use client';
import { PiMagnifyingGlassBold, PiPlusBold, PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import PageHeader from '@/eva-components/page-header';
import { useEffect, useState } from 'react';
import { followersData } from '@/data/profile-data';
import { Input } from '@/components/ui/input';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import axios, { CancelTokenSource } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../../../redux/slice/event';
import { getEventParamsDetails } from '../../../all/getData';
import { EventParamsdata } from '@/eva-components/other/event/getEventdata';
import {
  delegatesListData,
  exhibitorData,
  mediaPartnersListData,
  speakersListData,
  SponsorsData,
} from '@/eva-components/type/userListType';
import AllConferenceEventUsersList from './AllConferenceEventUsersList';
import { ConferenceProgramsApi } from 'utils/api/event/ConferencePrograms';

const pageHeader = {
  title: 'Event Exhibitors',
};
const tabs = [{ id: 'followers', count: followersData.length }];

let cancelToken: CancelTokenSource;
let userData: any;

let searchTimeout: any = null;

const AllNetworkingEventUsers = () => {
  const [modalData, setModalData] = useState({
    title: 'Add Exhibitors',
    data: followersData,
  });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(tabs[0].id);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const addUserModal = useSelector((state: any) => state?.event?.addUserModal);

  console.log('addUserModal>>>', addUserModal);

  const resetList = useSelector(
    (state: any) => state?.event?.resetEventUsersList
  );

  let userType =
    EventParamsdata.getConferenceView(pathname)?.conference_event_type;

  let conferenceProgramId =
    EventParamsdata.getConferenceView(pathname)?.conference_program_id;

  const [state, setState] = useState<any>({
    isLoading: false,
    listData: [],
    isLoadingUserList: false,
    addUserListData: [],
    searchTerm: '',
  });

  function handleTabClick() {
    dispatch(eventAction?.setAddUserModal());
  }

  const getListApi = async (search: string) => {
    let paramsDetails = getEventParamsDetails(pathname);

    setState({
      ...state,
      isLoading: true,
    });

    let res = await ConferenceProgramsApi.getAttendees({
      type: userType,
      search,
      conference_program_id: conferenceProgramId,
      limit: 1000,
      page: 1,
    });

    console.log('res >>>', res);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        listData: res?.data?.docs,
      });
    }

    console.log(`res-${paramsDetails?.users_type}>>`, res);
  };

  const onSearchChange = (e: any) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      getListApi(e.target.value);
    }, 300);
  };

  // const onSearchClear = () => {
  //   setState({
  //     ...state,
  //     searchTerm: '',
  //   });
  // };

  useEffect(() => {
    switch (
      userType
      // case Constatnts.exhibitors:
      //   setState({
      //     ...state,
      //     listData: exhibitorData,
      //   });
      //   break;
      // case Constatnts.delegates:
      //   setState({
      //     ...state,
      //     listData: delegatesListData,
      //   });
      //   break;
      // case Constatnts.speakers:
      //   setState({
      //     ...state,
      //     listData: speakersListData,
      //   });
      //   break;
      // case Constatnts.sponsors:
      //   setState({
      //     ...state,
      //     listData: SponsorsData,
      //   });
      //   break;
      // case Constatnts.mediaPartners:
      //   setState({
      //     ...state,
      //     listData: mediaPartnersListData,
      //   });
      //   break;
      // default:
      // code block
    ) {
    }

    getListApi('');
  }, []);

  return (
    <>
      <PageHeader title={`Attendee ${userType}`}>
        {/* <div className="flex items-center gap-3 ">
          <Button
            tag="span"
            className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={handleTabClick}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add
          </Button>
        </div> */}
      </PageHeader>

      <div className="mb-5 flex flex-shrink-0 items-center">
        <Input
          type="search"
          placeholder="Search by anything..."
          // value={state?.searchTerm}
          // onClear={onSearchClear}
          onChange={onSearchChange}
          inputClassName="h-9"
          // clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="me-2.5"
        />
      </div>

      <AllConferenceEventUsersList
        data={state?.listData}
        loading={state?.isLoading}
        type={userType}
      />
      {/* <AddUserListModal /> */}
    </>
  );
};

export default AllNetworkingEventUsers;
