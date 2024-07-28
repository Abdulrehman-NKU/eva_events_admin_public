'use client';
import PageHeader from '@/eva-components/page-header';
import React, { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import { Modal } from '@/components/ui/modal';

import dynamic from 'next/dynamic';

const ProfileSurvey = dynamic(() => import('@/eva-components/profileSurvey'), {
  ssr: false,
});
const ProfileSurveyCreate = dynamic(
  () => import('@/eva-components/profileSurvey/ProfileSurveyCreate'),
  {
    ssr: false,
  }
);

const Profile = () => {
  const pageHeader = {
    title: 'Profile survey',
  };

  const [state, setState] = useState({
    createForm: false,
  });

  const onClose = () => {
    setState({
      ...state,
      createForm: false,
    });
  };

  const onClickCreate = () => {
    setState({
      ...state,
      createForm: true,
    });
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="flex items-center gap-3 ">
          <Button
            tag="span"
            className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={onClickCreate}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add New Option
          </Button>
        </div>
      </PageHeader>
      <ProfileSurvey />

      <Modal
        isOpen={state?.createForm}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        customSize="800px"
      >
        <ProfileSurveyCreate onClose={onClose} />
      </Modal>
    </>
  );
};

export default Profile;
