import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import MetricCard from '@/components/cards/metric-card';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventImages from '@public/event.jpg';
import {
  EventDetailType,
  HotelListType,
} from '@/eva-components/type/propsType';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

const productGallery = [
  {
    src: EventImages,
  },
];

const ticketStats = [
  {
    id: 2,
    icon: <LocationOnIcon className="h-full w-full" />,
    title: 'Location',
    metric: 'Fort Chloetown Paraguay',
  },
];

export default function HotelDetailsGallery({
  hotelDetail,
}: {
  hotelDetail: HotelListType;
}) {
  const [fullImageModalOpen, setFullImageModalOpen] = useState(false);
  const getDate = (eventDate: string) => {
    let dateFilterArray = new Date(eventDate).toString().split(' ');
    let day = `${dateFilterArray[0]}day`;
    let date = `${dateFilterArray[2]}`;
    let month = `${dateFilterArray[1]}`;
    let year = `${dateFilterArray[3]}`;
    let filterDate = `${day}, ${date} ${month} ${year}`;
    return filterDate;
  };

  const getLocation = () => {};

  const handleImageClick = () => {
    setFullImageModalOpen(true);
  };

  const onCloseModal = () => {
    setFullImageModalOpen(false);
  };

  console.log("hotelDetail>>",hotelDetail);
  
  return (
    <>
      <div className="mb-14 mt-5 rounded-lg border border-gray-200 bg-gray-0 p-4 lg:p-6 dark:bg-gray-50">
        {hotelDetail?.hotel_images?.length > 0 && (
          <div>
            <div
              className="relative mx-auto aspect-[4/4.65] w-full cursor-pointer overflow-hidden rounded bg-gray-100 @xl:rounded-md "
              style={{ height: '384px' }}
              onClick={handleImageClick}
            >
              <Image
                layout="fill"
                objectFit="cover"
                priority
                src={getImageUrl(hotelDetail?.hotel_images[0]?.file_url)}
                
                alt={'Product Gallery'}
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="pt-5">
          <Title
            as="h6"
            className={cn(
              'font-lexend text-lg font-semibold text-gray-900 2xl:xl:text-xl dark:text-gray-700'
            )}
          >
            {hotelDetail?.hotel_name}
          </Title>
          {/* <Text as="p" className="leading-relaxed">
            {eventDetail?.description || ''}
          </Text> */}
          <div>
            {ReactHtmlParser(
              hotelDetail?.description ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            )}
          </div>
        </div>
        <div
          className={cn(
            'mt-5 grid grid-cols-1 gap-5 capitalize xl:grid-cols-2 2xl:grid-cols-4 3xl:gap-8 4xl:gap-9'
          )}
        >
          <MetricCard
            key={'Location' + hotelDetail?._id}
            title={'Location'}
            metric={`${hotelDetail?.city} ${hotelDetail?.country}`}
            icon={<LocationOnIcon className="h-full w-full" />}
            iconClassName="bg-transparent w-11 h-11"
          />
        </div>
      </div>

      <Modal
        isOpen={fullImageModalOpen}
        onClose={onCloseModal}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md  "
      >
        <Image
          layout="responsive"
          width={800}
          height={600}
          src={ getImageUrl(hotelDetail?.hotel_images[0]?.file_url) }

          alt={'Full Image'}
        />
      </Modal>
    </>
  );
}
