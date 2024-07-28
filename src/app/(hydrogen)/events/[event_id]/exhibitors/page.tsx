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
import AllEventUsers from '@/eva-components/events/view/all/AllEventUsers';

const pageHeader = {
  title: 'Event Exhibitors',
};
const tabs = [{ id: 'followers', count: followersData.length }];

export default function EventExhibitors() {
  const [modalData, setModalData] = useState({
    title: 'Add Exhibitors',
    data: followersData,
  });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(tabs[0].id);
  const pathname = usePathname();

  const [state, setState] = useState({
    isLoading: false,
    listData: [],
  });

  function handleTabClick(id: string) {
    if (id === 'followers') {
      setModalData({ title: 'Followers', data: followersData });
    }
    setOpen(() => true);
    setActive(() => id);
  }

  const getListApi = async () => {
    let pathnameArray = pathname.split('/');
    let eventId = pathnameArray[2];
    let type = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    // let res = await EventsApiServices.getEventExhibitors(eventId, type);

    // if (res?.response_code === ResponseCodes.GET_SUCCESS) {
    //   setState({
    //     ...state,
    //     isLoading: false,
    //     listData: res?.data?.data?.docs,
    //   });
    // }
    // console.log('res>>', res);
  };

  useEffect(() => {
    getListApi();
  }, []);

  return (
    <>
      <AllEventUsers />
    </>
  );
}
