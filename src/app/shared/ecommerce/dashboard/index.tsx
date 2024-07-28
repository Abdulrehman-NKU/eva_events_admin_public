'use client';

import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import WelcomeBanner from '@/components/banners/welcome';
import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
import BestSellers from '@/app/shared/ecommerce/dashboard/best-sellers';
import RepeatCustomerRate from '@/app/shared/ecommerce/dashboard/repeat-customer-rate';
import UserLocation from '@/app/shared/ecommerce/dashboard/user-location';
import PromotionalSales from '@/app/shared/ecommerce/dashboard/promotional-sales';
import RecentOrder from '@/app/shared/ecommerce/dashboard/recent-order';
import StockReport from '@/app/shared/ecommerce/dashboard/stock-report';
import { PiPlusBold } from 'react-icons/pi';
import welcomeImg from '@public/shop-illustration.png';
import HandWaveIcon from '@/components/icons/hand-wave';
import { useEffect, useState } from 'react';
import { LocalStorageHelpers } from '@/eva-components/helpers/localstorage.helpers';

export default function EcommerceDashboard() {
  const [state, setState] = useState({
    userName: 'Demo user',
    greeting: 'Good Morning',
  });

  const Greetings = () => {
    let myDate = new Date();
    let hours = myDate.getHours();
    let greet;

    if (hours < 12) greet = 'Morning';
    else if (hours >= 12 && hours <= 17) greet = 'Afternoon';
    else if (hours >= 17 && hours <= 24) greet = 'Evening';

    return `Good ${greet}`;
  };
  useEffect(() => {
    let userData = LocalStorageHelpers.getUserData();

    setState({
      ...state,
      userName: `${userData?.first_name} ${userData?.last_name}`,
      greeting: Greetings(),
    });

    console.log('data>>>', userData);
  }, []);
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <WelcomeBanner
          title={
            <>
              {state?.greeting}, <br /> {state?.userName}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            'Here’s What happening on Eva Events today. See the latest updates from here.'
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-gray-200 bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 lg:pb-9 dark:bg-gray-100/30"
        >
          <Link href={routes.event.createEvents} className="inline-flex">
            <Button
              tag="span"
              className="h-[38px] shadow md:h-10 dark:bg-gray-100 dark:text-gray-900"
            >
              <PiPlusBold className="me-1 h-4 w-4" /> Create Event
            </Button>
          </Link>
        </WelcomeBanner>

        {/* <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" /> */}
        {/* <ProfitWidget className="h-[464px] @sm:h-[520px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-[443px]" /> */}

        {/* <SalesReport className="@4xl:col-span-2 @7xl:col-span-8" /> */}

        {/* <PromotionalSales className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" /> */}

        {/* <RecentOrder className="relative @4xl:col-span-2 @7xl:col-span-12" /> */}

        {/* <RepeatCustomerRate className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-8" /> */}

        {/* <BestSellers className="@7xl:col-span-6 @[90rem]:col-span-4" /> */}

        {/* <UserLocation className="@7xl:col-span-6 @[90rem]:col-span-5 @[112rem]:col-span-4" /> */}

        {/* <StockReport className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-7 @[112rem]:col-span-8" /> */}
      </div>
    </div>
  );
}
