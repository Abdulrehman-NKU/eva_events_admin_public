'use client';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { cn, Text } from 'rizzui';
import { getEventParamsDetails } from '../../../all/getData';
import styles from './InfoSideBar.module.scss';
import { useSearchParams } from 'next/navigation';

const InfoSideBar = () => {
  const pathname = usePathname();
  let { event_id } = getEventParamsDetails(pathname);
  const searchParams = useSearchParams();
  const infoSearch = searchParams.get('info');
  const [searchParam, setSearchParam] = useState('');
  

  //   console.log("infoSearch>>>",infoSearch);

  useEffect(() => {
    console.log('infoSearch>>>', infoSearch);
    if (infoSearch) setSearchParam(infoSearch);
  }, [infoSearch]);

  return (
    <div className={styles.main}>
      <div className={styles.main_box_container}>
        {navData.map(({ title, id, type }, index) => (
          <Link
            href={routes?.event?.eventUserInfo(
              event_id,
              'exhibitor-info',
              type
            )}
            key={`menu-${index}`}
            className={
              'group relative cursor-pointer whitespace-nowrap py-1.5 font-medium text-black before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5  before:bg-gray-1000 before:transition-all '
            }
          >
            <Text
              as="span"
              className={`inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-300 ${
                type === searchParam ? styles.active : ''
              }`}
            >
              {title}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InfoSideBar;

let navData = [
  {
    title: 'General Information',
    id: '1',
    type: 'general-information',
  },

  {
    title: 'Exhibition Stand Information',
    id: '2',
    type: 'exhibition-stand-information',
  },

  {
    title: 'Additional Orders',
    id: '3',
    type: 'additional-orders',
  },

  {
    title: 'Shipping Information',
    type: 'shipping-information',
    id: '4',
  },

  {
    title: 'Exhibitor Insurance',
    id: '5',
    type: 'exhibitor-insurance',
  },

  {
    title: 'Product Demos',
    id: '6',
    type: 'product-demos',
  },

  {
    title: 'Parking',
    id: '7',
    type: 'parking',
  },

  {
    title: 'Deadlines',
    id: '8',
    type: 'deadlines',
  },

  {
    title: 'Raising Your Profile',
    id: '9',
    type: 'raising-your-profile',
  },

  {
    title: 'Marketing Graphics',
    id: '10',
    type: 'marketing-graphics',
  },
];
