'use client';

import { routes } from '@/config/routes';
import { PiNotePencilDuotone, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import PageHeader from '@/eva-components/page-header';
import EventsHeaderNav from '@/eva-components/events/view/navigation';
import HotelNavBar from '@/eva-components/events/hotel/HotelNavBar';
import { usePathname } from 'next/navigation';


const pageHeader = {
  title: 'Hotel Details',
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let pathnameArray = pathname.split('/');
  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="flex items-center gap-3 ">
          <Link
            href={routes.event.editHotel(pathnameArray[3])}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiNotePencilDuotone className="me-1.5 h-[17px] w-[17px]" />
              Edit Hotel
            </Button>
          </Link>
        </div>
      </PageHeader>
      <HotelNavBar />
      {children}
    </>
  );
}
