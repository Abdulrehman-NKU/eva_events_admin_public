'use client';

import { routes } from '@/config/routes';
import { PiNotePencilDuotone, PiPhone, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageHeader from '@/eva-components/page-header';
import DelegatesHeaderNav from '@/eva-components/delegates/delegates-details-View/navigation';
import UsersHeaderNav from '@/eva-components/users/view/navigation';
import { usePathname } from 'next/navigation';
import { Userdata } from '@/eva-components/other/user/getUserdata';
import Constatnts from '@/eva-components/constatnt';
import { useState } from 'react';
import Image from 'next/image';
import cn from '@/utils/class-names';
import { Title } from '@/components/ui/text';
import { AiOutlineMail } from 'react-icons/ai';
const pageHeader = {
  title: 'Delegate Details',
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let paramsData = Userdata.getUserViewParamsData(pathname);
  const [currentView, setCurrentView] = useState('details');

  const handleMenuClick = (pathType: string) => {
    setCurrentView(pathType);
  };
  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="flex items-center gap-3 ">
          <Link
            href={routes.user.editUser(
              paramsData.user_id,
              Constatnts.delegates
            )}
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
        </div>
      </PageHeader>

      <UsersHeaderNav handleMenuClick={handleMenuClick} />
      {children}
    </>
  );
}
