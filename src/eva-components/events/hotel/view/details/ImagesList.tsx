'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { HotelListType } from '@/eva-components/type/propsType';
import Image from 'next/image';
import { Modal } from '@mui/material';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

export default function ImagesList({
  hotelDetail,
}: {
  hotelDetail: HotelListType;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="@container">
        <div>
          <Text
            className={cn(
              'mt-10 font-lexend text-lg font-semibold text-gray-900 2xl:xl:text-xl dark:text-gray-700'
            )}
          >
            Hotel Images
          </Text>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
          {hotelDetail?.hotel_images?.map((imageData, index) => (
            <div key={imageData?._id}>
              <div className="relative" onClick={openModal}>
                <div className="relative mx-auto aspect-[91/75] w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={getImageUrl(imageData?.file_url)}
                    alt={''}
                    fill
                    priority
                    quality={90}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw"
                    blurDataURL={`/_next/image?url=${getImageUrl(imageData?.file_url)}&w=10&q=1`}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                </div>
              </div>
              <Modal open={isModalOpen} onClose={closeModal}>
                <div
                  className="flex h-screen items-center justify-center"
                  onClick={closeModal}
                >
                  <div className="">
                    <Image
                      src={getImageUrl(imageData?.file_url)}
                      alt={''}
                      width={500}
                      height={500}
                      quality={90}
                      placeholder="blur"
                      blurDataURL={`/_next/image?url=${getImageUrl(imageData?.file_url)}&w=10&q=1`}
                      className="object-cover"
                    />
                  </div>
                </div>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
