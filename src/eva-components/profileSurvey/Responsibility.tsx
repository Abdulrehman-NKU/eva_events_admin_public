'use client';

import { routes } from '@/config/routes';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PiPlusBold } from 'react-icons/pi';
import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeleteHotel from '../events/hotel/DeleteHotel';
import ModalButton from '@/app/shared/modal-button';
import ProfileSurveyCreate from './ProfileSurveyCreate';
const members = [
  {
    id: 1,
    name: 'Exhibitors',
  },
  {
    id: 2,
    name: 'Sponsors',
  },
  {
    id: 3,
    name: 'Delegates',
  },
  {
    id: 4,
    name: 'Speakers',
  },
  {
    id: 5,
    name: 'Media Partners',
  },
];

const Responsibility = () => {
  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="font-inter text-base font-normal text-black">
          <p>What are your responsibilities?</p>
        </div>
        {/* <div className="flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.user.createdelegates}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add New Option
            </Button>
          </Link>
        </div> */}
        {/* <div className="flex items-center gap-3 ">
          <ModalButton
            label=" Add New Option"
            view={<ProfileSurveyCreate />}
            customSize="800px"
          />
        </div> */}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2  2xl:grid-cols-3 ">
        {members?.map((user: any) => (
          <div
            key={user.name}
            className="flex items-center rounded-lg border border-gray-200 bg-gray-0 p-4 px-5 dark:bg-gray-50"
          >
            <div className="flex w-full  items-center  justify-between">
              <div className="flex w-full items-center justify-between">
                <Text className={cn('text-gray-500')}>{user.name}</Text>
                <div className="flex gap-4">
                  <Tooltip
                    size="sm"
                    content={() => 'Edit Hotel'}
                    placement="top"
                    color="invert"
                  >
                    {/* <Link href={routes.event.editHotel(product?.country)}> */}
                    <ActionIcon
                      size="sm"
                      variant="outline"
                      aria-label={'Edit Hotel'}
                      // onClick={() => onClickEdit(list?.id)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </ActionIcon>
                    {/* </Link> */}
                  </Tooltip>

                  <Tooltip
                    size="sm"
                    content={() => 'View Hotel'}
                    placement="top"
                    color="invert"
                  >
                    {/* <Link
                    href={routes.event.hotelDetailView(
                      product?.city,
                      'details'
                    )}
                  > */}
                    <ActionIcon
                      size="sm"
                      variant="outline"
                      aria-label={'View Hotel'}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </ActionIcon>
                    {/* </Link> */}
                  </Tooltip>

                  <DeleteHotel
                    title={`Delete the hotel`}
                    description={`Are you sure you want to delete this ?`}
                    id={''}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Responsibility;
