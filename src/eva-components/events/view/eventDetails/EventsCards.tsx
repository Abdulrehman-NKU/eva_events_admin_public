'use client';

import cn from '@/utils/class-names';
import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { EventDetailType } from '@/eva-components/type/propsType';

const members = [
  {
    id: 1,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-12.webp',
    name: 'Attending Exhibitors',
    metric: '7,890',
    color: 'text-[#00a76f]',
    fill: 'bg-[#00a76f]/10',
    type: 'delegates',
  },
  {
    id: 2,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp',
    name: 'Attending Sponsors',
    metric: '7,890',
    color: 'text-[#00b8d9]',
    type: 'sponsors',
  },
  {
    id: 3,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-10.webp',
    name: 'Attending Delegates',
    metric: '1,160',
    color: 'text-[#ff5630]',
    type: 'delegates',
  },
  {
    id: 4,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
    name: 'Attending Speakers',
    metric: '1,160',
    color: 'text-[#00a76f]',
    type: 'speakers',
  },
  {
    id: 5,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-02.webp',
    name: 'Attending Media Partners',
    metric: '1,160',
    color: 'text-[#00b8d9]',
    type: 'media_partners',
  },
];

export default function EventsCards({
  eventDetail,
  className,
}: {
  eventDetail: any;
  className?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 @2xl:grid-cols-2 @6xl:grid-cols-4 3xl:gap-8 4xl:gap-8">
      {members?.map((user: any) => (
        <div
          key={user.name}
          className="flex items-center rounded-lg border border-gray-200 bg-gray-0 p-5 lg:py-6  lg:px-4 dark:bg-gray-50"
        >
          {/* <div className="relative inline-flex flex-shrink-0">
            <Avatar
              src={user.thumbnail}
              name={user.name}
              className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
            />
          </div> */}
          <div className="flex w-[calc(100%-44px)] items-center justify-between gap-2 ps-3.5">
            <div className="w-[calc(100%-40px)]">
              <Text className={cn('mb-0.5 text-gray-500')}>{user.name}</Text>
              <Text
                className={cn(
                  'font-lexend text-lg font-semibold text-gray-900 2xl:xl:text-xl dark:text-gray-700'
                )}
              >
                {eventDetail[user?.type]?.length || '0'}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
