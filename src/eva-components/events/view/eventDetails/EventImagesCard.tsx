'use client';
import Image from 'next/image';
import cn from '@/utils/class-names';
import { Product } from '@/types';

interface ProductProps {
  product: Product;
  className?: string;
}

export default function EventImagesCard({ product, className }: ProductProps) {
  const {
    title,
    thumbnail,
    slug,
    description,
    price,
    sale_price,
    colors = [],
    base64,
  } = product;
  return (
    <div className={cn(className)}>
      <div className="relative">
        <div className="relative mx-auto aspect-[4/5.06] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            alt={title}
            src={thumbnail}
            fill
            priority
            quality={90}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw"
            blurDataURL={base64 ?? `/_next/image?url=${thumbnail}&w=10&q=1`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
