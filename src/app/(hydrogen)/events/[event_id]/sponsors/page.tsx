'use client';
import { PiMagnifyingGlassBold, PiPlusBold, PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { productsData } from '@/data/products-data';
import EventSponsorsTable from '@/eva-components/events/view/eventSponsorsList/EventSponsorsTable';
import PageHeader from '@/eva-components/page-header';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import { followersData } from '@/data/profile-data';
import { Title } from '@/components/ui/text';
import FollowerModal from '@/app/shared/profile/follower-modal';
import { Input } from '@/components/ui/input';
import AllEventUsers from '@/eva-components/events/view/all/AllEventUsers';
const pageHeader = {
  title: 'Event Sponsors',
};
const tabs = [{ id: 'followers', count: followersData.length }];

export default function EventSponsors() {
  const [modalData, setModalData] = useState({
    title: 'Add Sponsors',
    data: followersData,
  });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(tabs[0].id);

  function handleTabClick(id: string) {
    if (id === 'followers') {
      setModalData({ title: 'Followers', data: followersData });
    }
    setOpen(() => true);
    setActive(() => id);
  }
  return (
    <>
      <AllEventUsers />
    </>
  );
}
