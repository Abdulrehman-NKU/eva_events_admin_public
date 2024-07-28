'use client';
import { routes } from '@/config/routes';
import { PiNotePencilDuotone, PiPlusBold } from 'react-icons/pi';
import { IoChevronBackOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import PageHeader from '@/eva-components/page-header';
import { usePathname } from 'next/navigation';
import { getEventParamsDetails } from '@/eva-components/events/view/all/getData';
import NetworkingEventNav from '@/eva-components/events/view/networking-event/NetworkingEventNav';
import { EventParamsdata } from '@/eva-components/other/event/getEventdata';

const pageHeader = {
  title: 'Networking Event Details',
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let { networking_event_id, event_id } =
    EventParamsdata.getNetworkingView(pathname);
  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="flex items-center gap-3 ">
          <Link
            href={routes.event.editNetworkingEvent(networking_event_id)}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiNotePencilDuotone className="me-1.5 h-[17px] w-[17px]" />
              Edit
            </Button>
          </Link>

          <Link
            href={routes?.event?.eventDetailView(event_id, 'networking-events')}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <IoChevronBackOutline className="me-1.5 h-[17px] w-[17px]" />
              Go Back
            </Button>
          </Link>
        </div>
      </PageHeader>
      <NetworkingEventNav />
      {children}
    </>
  );
}