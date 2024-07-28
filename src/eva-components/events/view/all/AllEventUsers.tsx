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
import AllEventUsersList from './AllEventUsersList';
import axios, { CancelTokenSource } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import AddUserListModal from './AddUserListModal';
import { getEventParamsDetails } from './getData';
import toast from 'react-hot-toast';
import InvitationTemplateModal from '../invitation-template/InvitationTemplateModal';
import Link from 'next/link';

const pageHeader = {
  title: 'Event Exhibitors',
};
const tabs = [{ id: 'followers', count: followersData.length }];

let cancelToken: CancelTokenSource;
const AllEventUsers = () => {
  const [state, setState] = useState({
    isLoading: false,
    listData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });

  const pathname = usePathname();
  const dispatch = useDispatch();
  const addUserModal = useSelector((state: any) => state?.event?.addUserModal);
  const resetList = useSelector(
    (state: any) => state?.event?.resetEventUsersList
  );

  function handleTabClick() {
    dispatch(eventAction?.setAddUserModal());
  }

  const getListApi = async (search: string, page: number, type?: string) => {
    let paramsDetails = getEventParamsDetails(pathname);

    if (type === 'search') {
      setState({
        ...state,
        isLoading: true,
        resetCurrentPage: !state?.resetCurrentPage,
      });
    } else {
      setState({
        ...state,
        isLoading: true,
      });
    }

    cancelToken = axios.CancelToken.source();

    let res = await EventsApiServices.getEventUsers({
      user_id: paramsDetails?.event_id,
      user_type: paramsDetails?.users_type,
      search,
      page,
      limit: 100,
      cancelToken,
    });

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        listData: res?.data?.data?.docs,
        currentPage: page,
        searchData: search,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error(res?.data?.message || 'Internal server error!');
    }
  };

  const onSearchChange = (e: any) => {
    getListApi(e.target.value, 1, 'search');
  };
  const paginationHandler = (page: number) => {
    getListApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getListApi(state?.searchData, state?.currentPage, 'initial');
  }, [resetList]);

  const getUpdateEmailTemplatePage = () => {
    let paramsDetails = getEventParamsDetails(pathname);

    let userType = paramsDetails.users_type;

    let pageUrl = `/events/${paramsDetails?.event_id}/${userType}/event-invitation-template`;

    console.log('pageUrl', pageUrl);

    return pageUrl;
  };

  return (
    <>
      <PageHeader title={`Event ${pathname?.split('/')[3]}`}>
        <div className="flex items-center gap-3 ">
          <Link href={getUpdateEmailTemplatePage()}>
            <Button
              // isLoading={state.loading}
              // disabled={state.loading}
              variant="outline"
              className="w-full @lg:w-auto"

              // onClick={generateMeetingSchedule}
            >
              Configure Email Template
            </Button>
          </Link>

          <Button
            tag="span"
            className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={handleTabClick}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add {pathname?.split('/')[3]}
          </Button>
        </div>
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

      <AllEventUsersList
        data={state?.listData}
        loading={state?.isLoading}
        type={pathname?.split('/')[3]}
        totalDocs={state?.totalDocs}
        paginationHandler={paginationHandler}
        perPageCount={state?.perPageCount}
        resetCurrentPage={state?.resetCurrentPage}
      />
      <AddUserListModal />
    </>
  );
};

export default AllEventUsers;
