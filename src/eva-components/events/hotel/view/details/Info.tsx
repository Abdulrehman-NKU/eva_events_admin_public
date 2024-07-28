import MetricCard from '@/components/cards/metric-card';
import TicketIcon from '@/components/icons/ticket';
import { HotelListType } from '@/eva-components/type/propsType';
import React from 'react';
import { Badge, Title } from 'rizzui';

const Info = ({ hotelDetail }: { hotelDetail: HotelListType }) => {
  return (
    <div>
      <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Info
        </Title>
      </div>
      <div className="mt-8 grid items-start rounded-xl border border-gray-300 p-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Hotel ID:</span>
            <span className="">{hotelDetail?._id}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Website:</span>
            <span className="">{hotelDetail?.hotel_url || '-'}</span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Name:</span>
            <span className="">{hotelDetail?.hotel_name}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Status:</span>
            <Badge color="success" rounded="md">
              {hotelDetail?.status}
            </Badge>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Phone:</span>
            <span className="">
              {hotelDetail?.phone ? '+' : ''}
              {hotelDetail?.phone_country_code} {hotelDetail?.phone || '-'}
            </span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Email:</span>
            <span className="">{hotelDetail?.hotel_email || '-'}</span>
          </li>
        </ul>
      </div>
      <div
        className={
          'mt-5 grid grid-cols-1 gap-5 capitalize xl:grid-cols-3 2xl:grid-cols-4 3xl:gap-8 4xl:gap-9'
        }
      >
        <MetricCard
          key={'1'}
          title={'Events'}
          metric={hotelDetail?.events?.length}
          icon={<TicketIcon />}
          iconClassName="bg-transparent w-11 h-11"
        />
      </div>
    </div>
  );
};

export default Info;
