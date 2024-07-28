import Link from 'next/link';
import { routes } from '@/config/routes';
import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import EventImageOne from '@public/event-one.png';
import EventImagetwo from '@public/event-two.png';
import {
  EventDetailType,
  PosterImageType,
} from '@/eva-components/type/propsType';
import { usePathname } from 'next/navigation';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

const productGallery = [
  {
    id: 1,
    file_url: EventImageOne,
  },
  {
    id: 1,
    file_url: EventImagetwo,
  },
  {
    id: 3,
    file_url: EventImageOne,
  },
  {
    id: 4,
    file_url: EventImagetwo,
  },
];
export default function EventDetailsRelatedEvents({
  PosterImages,
  className,
}: {
  PosterImages: PosterImageType[];
  className?: string;
}) {
  const pathname = usePathname();
  let pathnameArray = pathname.split('/');
  let eventId = pathnameArray[2];

  console.log('PosterImages>>>', PosterImages);

  return (
    <section className="pt-10 @5xl:pt-12 @7xl:pt-14">
      <header className="mb-4 flex items-center justify-between">
        <Title as="h3" className="font-semibold">
          Event Galleries
        </Title>
        <Link href={routes.event.eventgalleries(eventId)}>
          <Button tag="span" variant="text" className="py-0 underline">
            See All
          </Button>
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-2 @xl:grid-cols-3 @xl:gap-y-9 @5xl:grid-cols-4 @5xl:gap-x-7 @7xl:grid-cols-4">
        {PosterImages?.map((item) => (
          <div
            key={item._id}
            className="relative mx-auto aspect-[4/5.06] w-full overflow-hidden rounded-lg bg-gray-100"
          >
            <Image
              alt=""
              src={getImageUrl(item.file_url)}
              fill
              priority
              quality={90}
              // placeholder="blur"
              sizes="(max-width: 768px) 100vw"
              className="h-full w-full object-cover"
            />

            {/* <Image
              layout="fill"
              objectFit="cover"
              priority
              src={eventDetail?.featured_image || ''}
              alt={'Product Gallery'}
              className="object-cover"
            /> */}
          </div>
        ))}
      </div>
    </section>
  );
}
