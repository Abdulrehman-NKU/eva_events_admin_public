'use client';
import { routes } from '@/config/routes';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import PageHeader from '@/eva-components/page-header';
import EventsHeaderNav from '@/eva-components/events/view/navigation';
import { usePathname } from 'next/navigation';
import { getEventParamsDetails } from '@/eva-components/events/view/all/getData';
import { EventParamsdata } from '@/eva-components/other/event/getEventdata';
import DownloadMeetingSchedulesForEvent from '@/eva-components/events/DownloadMeetingSchedulesForEvent';
import { CommonEnums } from '@/enums/common.enums';

const pageHeader = {
  title: 'Event Details',
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let { event_user_form } = EventParamsdata.getEventView(pathname);

  // let paramsDetails = getEventParamsDetails(pathname);

  return (
    <>
      {event_user_form === 'create' ||
      event_user_form === 'view' ||
      event_user_form === CommonEnums.path.event_invitation_template ? (
        ''
      ) : (
        <>
          <PageHeader title={pageHeader.title}>
            <div className="flex items-center gap-3 ">
              <DownloadMeetingSchedulesForEvent />

              <Link
                href={routes.event.editEvent(
                  getEventParamsDetails(pathname)?.event_id
                )}
                className="w-full @lg:w-auto"
              >
                <Button
                  tag="span"
                  className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                >
                  <PiNotePencilDuotone className="me-1.5 h-[17px] w-[17px]" />
                  Edit Event Dates
                </Button>
              </Link>
            </div>
          </PageHeader>
          <EventsHeaderNav />
        </>
      )}

      {children}
    </>
  );
}
