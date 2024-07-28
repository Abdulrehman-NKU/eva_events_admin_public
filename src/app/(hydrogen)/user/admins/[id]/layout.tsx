'use client';

import { routes } from '@/config/routes';
import { PiNotePencilDuotone, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageHeader from '@/eva-components/page-header';
import AdminHeaderNav from '@/eva-components/admin/admin-details-View/navigation';
import { Userdata } from '@/eva-components/other/user/getUserdata';
import { usePathname } from 'next/navigation';

const pageHeader = {
  title: 'Admin Details',
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let paramsData = Userdata.getUserViewParamsData(pathname);

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="flex items-center gap-3 ">
          <Link
            href={routes.user.editUser(paramsData.user_id, 'admins')}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiNotePencilDuotone className="me-1.5 h-[17px] w-[17px]" />
              Edit Admin
            </Button>
          </Link>
        </div>
      </PageHeader>
      <AdminHeaderNav />
      {children}
    </>
  );
}
