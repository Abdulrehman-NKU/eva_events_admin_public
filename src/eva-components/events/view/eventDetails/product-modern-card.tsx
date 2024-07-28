import Image from 'next/image';
import { Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { PiStarFill } from 'react-icons/pi';
import { useState } from 'react';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

export function RatingsCount({
  rating,
  totalRatings,
}: {
  rating: number;
  totalRatings?: number;
}) {
  return (
    <Text
      as="span"
      className="inline-flex w-[100px] flex-shrink-0 items-center justify-end gap-1 text-sm text-gray-900"
    >
      <PiStarFill className="h-3.5 w-3.5 text-gray-900" />
      {rating}
      {totalRatings && ` (${totalRatings})`}
    </Text>
  );
}

interface Product {
  city: string;
  country: string;
  thumbnail: string;
  rating: number;
  ratingCount: number;
  hostname: string;
  features: string[];
  price: {
    original: string;
    sale: string;
  };
  tag: string;
  base64?: string;
}

type ListingCardProps = {
  product: Product;
  className?: string;
  title?: React.ReactNode;
};

export default function ListingCard({
  imageData,
  className,
  // title = `${product.city}, ${product.country}`,
}: any) {
  // const { thumbnail, base64 } = product;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="relative" onClick={openModal}>
        <div className="relative mx-auto aspect-[91/75] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={getImageUrl(imageData?.file_url)}
            alt={""}
            fill
            priority
            quality={90}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw"
            blurDataURL={ `/_next/image?url=${getImageUrl(imageData?.file_url)}&w=10&q=1`}
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
              alt={""}
              width={500}
              height={500}
              quality={90}
              placeholder="blur"
              blurDataURL={ `/_next/image?url=${getImageUrl(imageData?.file_url)}&w=10&q=1`}
              className="object-cover"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
