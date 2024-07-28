import React from 'react';
import PageHeader from '@/app/shared/page-header';
import HotelCreateForm from '@/eva-components/events/hotel/HotelCreateForm';
import NetworkingEventCreateForm from '@/eva-components/events/view/networking-event/form/NetworkingEventCreateForm';

const pageHeader = {
  title: 'Create Networking Event',
  breadcrumb: [],
};

const NetworkingEvent = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link> */}
      </PageHeader>
      <NetworkingEventCreateForm />
    </>
  );
};

export default NetworkingEvent;
