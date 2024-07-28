'use client';
import { routes } from '@/config/routes';
import { PiNotePencilDuotone, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import PageHeader from '@/eva-components/page-header';
import { usePathname } from 'next/navigation';
import { getEventParamsDetails } from '@/eva-components/events/view/all/getData';
import NetworkingEventNav from '@/eva-components/events/view/networking-event/NetworkingEventNav';

const pageHeader = {
  title: 'Networking Event Details',
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // let paramsDetails = getEventParamsDetails(pathname);
  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="flex items-center gap-3 ">
          <Link href={''} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiNotePencilDuotone className="me-1.5 h-[17px] w-[17px]" />
              Edit
            </Button>
          </Link>
        </div>
      </PageHeader>
      <NetworkingEventNav />
      {children}
    </>
  );
}
