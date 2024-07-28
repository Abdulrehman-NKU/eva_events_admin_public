'use client';

import Link from 'next/link';
import { Text } from '@/components/ui/text';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import { usePathname } from 'next/navigation';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import { getParamsDetails } from '@/eva-components/users/view/getData';

const menuItems = [
  {
    label: 'Details',
    value: '/user/exhibitors/${id}/exhibitors-details',
    path_type: 'details',
  },
];

export default function AdminHeaderNav() {
  const pathname = usePathname();
  const { sliderEl } = useScrollableSlider();

  const userDetails = getParamsDetails(pathname);
  return (
    <div
      className={cn(
        'sticky z-20 -mx-4 -mt-4 border-b border-gray-200 bg-white px-4 py-0 font-medium text-gray-500 sm:-mt-2 md:-mx-5 md:px-5 lg:-mx-8 lg:mt-0 lg:px-8 xl:-mx-6 xl:px-6 2xl:top-20 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10 dark:bg-gray-50'
      )}
    >
      <div className="relative flex items-center overflow-hidden">
        <div className="flex h-[52px] items-start overflow-hidden">
          <div
            className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-8"
            ref={sliderEl}
          >
            {menuItems.map((menu, index) => (
              <Link
                href={routes.user.userDetailsView(
                  userDetails?.users_type,
                  userDetails?.user_id,
                  menu.path_type
                )}
                key={`menu-${index}`}
                className={cn(
                  'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5  before:bg-gray-1000 before:transition-all hover:text-gray-900',
                  menu?.path_type === userDetails?.navigation_type
                    ? 'before:visible before:w-full before:opacity-100'
                    : 'before:invisible before:w-0 before:opacity-0'
                )}
              >
                <Text
                  as="span"
                  className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70"
                >
                  {menu.label}
                </Text>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}