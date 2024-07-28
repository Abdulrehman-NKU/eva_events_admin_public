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
import FollowerModal from '@/app/shared/profile/follower-modal';
import { Input } from '@/components/ui/input';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import AllEventUsersList from './ConferenceProgramList';
import axios, { CancelTokenSource } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import ConferenceProgramList from './ConferenceProgramList';
import { conferenceProgramData } from '@/eva-components/type/propsInitialValue';
import ModalButton from '@/app/shared/modal-button';
import ConferenceProgramCreate from './ConferenceProgramCreate';
import ConferenceProgramEdit from './ConferenceProgramEdit';
import ConferenceProgramEditModal from './ConferenceProgramEditModal';
import ConferenceProgramListAndNavBar from './ConferenceProgramListAndNavBar';

const pageHeader = {
  title: 'Event Exhibitors',
};
const tabs = [{ id: 'followers', count: followersData.length }];

let cancelToken: CancelTokenSource;
const ConferenceProgramPage = () => {
  const addUserModal = useSelector(
    (state: any) => state?.event?.createConferenceModal
  );
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
    listData: [],
    isLoadingUserList: false,
    addUserListData: [],
    searchTerm: '',
  });

  function handleTabClick() {
    dispatch(eventAction?.setCreateConferenceModal());
  }

  // function handleTabClick() {
  //   dispatch(eventAction?.setAddUserModal());
  // }

  // const getListApi = async (search: string) => {
  //   let paramsDetails = getEventParamsDetails(pathname);

  //   setState({
  //     ...state,
  //     isLoading: true,
  //   });
  //   cancelToken = axios.CancelToken.source();
  //   let res = await EventsApiServices.getEventUsers(
  //     paramsDetails?.event_id,
  //     paramsDetails?.users_type,
  //     cancelToken,
  //     search
  //   );
  //    ;
  //   if (res?.response_code === ResponseCodes.GET_SUCCESS) {
  //     setState({
  //       ...state,
  //       isLoading: false,
  //       listData: res?.data?.data?.docs,
  //     });
  //   }

  //   console.log(`res-${paramsDetails?.users_type}>>`, res);
  // };

  // const onSearchChange = (e: any) => {
  //   console.log('e>>>>', e.target.value);
  //   // setState({
  //   //   ...state,
  //   //   searchTerm: e.target.value,
  //   // });
  //   getListApi(e.target.value);
  // };

  // // const onSearchClear = () => {
  // //   setState({
  // //     ...state,
  // //     searchTerm: '',
  // //   });
  // // };

  // useEffect(() => {
  //   getListApi('');
  // }, [resetList]);
  return (
    <>
      <PageHeader title="Conference Programs">
        <div className="flex items-center gap-3 ">
          <Button
            tag="span"
            className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={handleTabClick}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add conference program
          </Button>
        </div>
      </PageHeader>

      {/* <div className="mb-5 flex flex-shrink-0 items-center">
        <Input
          type="search"
          placeholder="Search by anything..."
          // value={state?.searchTerm}
          // onClear={onSearchClear}
          // onChange={onSearchChange}
          inputClassName="h-9"
          // clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="me-2.5"
        />
      </div> */}
      <ConferenceProgramListAndNavBar />
      <ConferenceProgramCreate />

    </>
  );
};

export default ConferenceProgramPage;

const listData = [
  {
    _id: '65c4ec738042d270d05c0f59',
    title: 'create event data',
    subtitle: '',
    date: '2024-02-11T14:11:52.455Z',
    time_from: '2023-12-31T00:00:00.000Z',
    time_to: '2023-12-31T00:00:00.000Z',
    description: 'description',
    add_to_calender: false,
    events: ['65a0e796b2338453ec1837c7'],
    sponsors: ['65c468a605bf6e98fc8b14fc'],
    __v: 0,
    id: '65c4ec738042d270d05c0f59',
  },
  {
    _id: '65c4ecbe8042d270d05c0f5a',
    title: 'create event data',
    subtitle: '',
    date: '2024-02-11T14:11:52.455Z',
    time_from: '2023-12-31T00:00:00.000Z',
    time_to: '2023-12-31T00:00:00.000Z',
    description: 'description',
    add_to_calender: false,
    events: ['65a0e796b2338453ec1837c7'],
    sponsors: ['65c468a605bf6e98fc8b14fc'],
    __v: 0,
    id: '65c4ecbe8042d270d05c0f5a',
  },
  {
    _id: '65c4ecc38042d270d05c0f5b',
    title: 'create event data',
    subtitle: '',
    date: '2024-02-11T14:11:52.455Z',
    time_from: '2023-12-31T00:00:00.000Z',
    time_to: '2023-12-31T00:00:00.000Z',
    description: 'description',
    add_to_calender: false,
    events: ['65a0e796b2338453ec1837c7'],
    sponsors: ['65c468a605bf6e98fc8b14fc'],
    __v: 0,
    id: '65c4ecc38042d270d05c0f5b',
  },
];
