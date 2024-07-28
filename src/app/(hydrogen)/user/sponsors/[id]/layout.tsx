'use client';
import { routes } from '@/config/routes';
import { PiNotePencilDuotone, PiPhone, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageHeader from '@/eva-components/page-header';
import UsersHeaderNav from '@/eva-components/users/view/navigation';
import { usePathname } from 'next/navigation';
import { Userdata } from '@/eva-components/other/user/getUserdata';
import Constatnts from '@/eva-components/constatnt';
import Image from 'next/image';
import cn from '@/utils/class-names';
import { Title } from '@/components/ui/text';
import { AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';

const pageHeader = {
  title: 'Sponsor Details',
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
            href={routes.user.editUser(paramsData.user_id, Constatnts.sponsors)}
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

// {currentView === 'profile-surveys' && (
//   <div className={cn('@container')}>
//     <div className="mb-10  mt-10 grid items-start gap-4 @xl:grid-cols-[80px_1fr] @2xl:grid-cols-[128px_1fr]  md:gap-6">
//       <figure className="relative -mt-8 h-20 w-20 rounded-full border-4 border-white drop-shadow  @2xl:h-32 @2xl:w-32 ">
//         <span className="absolute bottom-1.5 right-1.5 z-10 h-3 w-3 rounded-full border-2 border-white bg-[#11A849] @2xl:bottom-2.5 @2xl:right-2.5 @3xl:h-4 @3xl:w-4 @4xl:bottom-2 @4xl:right-2" />
//         {/* <Image
//         src={`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar)}.webp`}
//         // src={exhibitorDetail?.exhibitor_logo || ''}
//         alt=""
//         fill
//         priority
//         className="rounded-full bg-gray-100"
//       /> */}
//       </figure>
//       <div className="grid grid-cols-2 gap-1 md:gap-1">
//         <article>
//           <div className="flex items-center gap-2.5">
//             <Title as="h3" className="text-lg xl:text-xl">
//               {/* {`${exhibitorDetail?.first_name} ${exhibitorDetail?.last_name}`} */}
//               Srushti Anghan
//             </Title>
//           </div>
//           <p>
//             {/* <a href={`mailto:${exhibitorDetail?.email}`}>
//             {exhibitorDetail?.email}
//           </a> */}
//             johnson.olson@yahoo.com
//           </p>
//         </article>
//         <article className="flex flex-wrap items-center justify-end gap-3">
//           <Button variant="outline" className="flex items-center gap-1">
//             <PiPhone size={18} />
//             Call
//           </Button>
//           <Button variant="outline" className="flex items-center gap-1">
//             <AiOutlineMail size={18} />
//             Email
//           </Button>
//         </article>
//       </div>
//     </div>
//   </div>
// )}
