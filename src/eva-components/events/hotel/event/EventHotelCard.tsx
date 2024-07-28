'use client';
import Image from 'next/image';
import { Title } from '@/components/ui/text';
import Link from 'next/link';
import { ActionIcon, Tooltip } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import { routes } from '@/config/routes';
import DeleteHotel from '../DeleteHotel';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

export default function EventHotelCard({ hotelsData }: { hotelsData: any[] }) {
  return (
    <>
      {hotelsData?.map((hotelData) => (
        <div key={hotelData?._id}>
          <div className="relative">
            <div className="relative mx-auto aspect-[91/75] w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={getImageUrl(hotelData?.hotel_images[0]?.file_url)}
                alt={`${hotelData?.hotel_name}-${'Image Not found'}`}
                fill
                priority
                quality={90}
                placeholder="blur"
                sizes="(max-width: 768px) 100vw"
                blurDataURL={`/_next/image?url=${hotelData?.hotel_name}&w=10&q=1`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="pt-3">
            <div className="mb-3 flex items-center justify-between">
              <Link href="" className="max-w-[calc(100%)] flex-grow">
                <Title
                  as="h6"
                  className="truncate font-semibold transition-colors hover:text-primary"
                >
                  {hotelData?.hotel_name}
                </Title>
              </Link>
            </div>

            <div className="mt-2 flex gap-4">
              <Tooltip
                size="sm"
                content={() => 'Edit Hotel'}
                placement="top"
                color="invert"
              >
                <Link href={routes.event.editHotel(hotelData?._id)}>
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'Edit Hotel'}
                    // onClick={() => onClickEdit(list?.id)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>

              <Tooltip
                size="sm"
                content={() => 'View Hotel'}
                placement="top"
                color="invert"
              >
                <Link
                  href={routes.event.hotelDetailView(hotelData?._id, 'details')}
                >
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'View Hotel'}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>

              <DeleteHotel
                title={`Remove the hotel`}
                description={`Are you sure you want to remove ${hotelData?.hotel_name} hotel ?`}
                id={hotelData?._id}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
