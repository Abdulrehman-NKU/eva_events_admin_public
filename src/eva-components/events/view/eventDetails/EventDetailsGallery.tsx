import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import MetricCard from '@/components/cards/metric-card';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventImages from '@public/event.jpg';
import { EventDetailType } from '@/eva-components/type/propsType';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';
import moment from 'moment';

const productGallery = [
  {
    src: EventImages,
  },
];

const ticketStats = [
  {
    id: 1,
    icon: <CalendarMonthIcon className="h-full w-full" />,
    title: 'Date',
    metric: 'Sunday, 12 June 2023',
  },
  {
    id: 2,
    icon: <LocationOnIcon className="h-full w-full" />,
    title: 'Location',
    metric: 'Indonesa',
  },
];

export default function EventDetailsGallery({
  eventDetail,
  className,
}: {
  eventDetail: any;
  className?: string;
}) {
  const [fullImageModalOpen, setFullImageModalOpen] = useState(false);
  const getDate = (start_date: string, end_date: string , start_time: string , end_time: string) => {
    let dateFilterArrayStartDate = new Date(start_date).toString().split(' ');
    let weekdayStartDate = new Date(start_date).getDay();
    let dateFilterArrayEndDate = new Date(end_date).toString().split(' ');
    let weekdayEndDate = new Date(start_date).getDay();
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let startDay = weekdays[weekdayStartDate];
    let startDate = `${dateFilterArrayStartDate[2]}`;
    let startMonth = `${dateFilterArrayStartDate[1]}`;
    let startYear = `${dateFilterArrayStartDate[3]}`;
    let filterDate = `${startDay}, ${startDate} ${startMonth} ${startYear}`;

    if (end_date) {
      let endDay = weekdays[weekdayEndDate];
      let endDate = `${dateFilterArrayEndDate[2]}`;
      let endMonth = `${dateFilterArrayEndDate[1]}`;
      let endYear = `${dateFilterArrayEndDate[3]}`;
      filterDate = `${startDate} ${startMonth} ${startYear} - ${endDate} ${endMonth} ${endYear}`;
    }
    var filterTime = '';
    
    if( start_time && end_time ){
    	//filterTime = moment(start_time,'HH:mm:ss').format('hh:mm A') + ' - ' + moment(end_time,'HH:mm:ss').format('hh:mm A');
    } 
    /*
    if( filterTime !== null && filterTime !== null ){
		return `${filterDate} (${filterTime})`;
	} else {
		return `${filterDate}`
	}
	*/
	return `${filterDate}`
    
  };

  const getLocation = () => {};

  const handleImageClick = () => {
    setFullImageModalOpen(true);
  };

  const onCloseModal = () => {
    setFullImageModalOpen(false);
  };
  return (
    <>
      <div className="mb-14 mt-5 rounded-lg border border-gray-200 bg-gray-0 p-4 lg:p-6 dark:bg-gray-50">
        {getImageUrl(eventDetail?.featured_image) && (
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
                src={getImageUrl(eventDetail?.featured_image)}
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
            {eventDetail?.name}
          </Title>
          {/* <Text as="p" className="leading-relaxed">
            {eventDetail?.description || ''}
          </Text> */}
          <div>{ReactHtmlParser(eventDetail?.description || '')}</div>
        </div>
        <div
          className={cn(
            'mt-5 grid grid-cols-1 gap-5 capitalize lg:grid-cols-2 3xl:grid-cols-3 3xl:gap-8 4xl:gap-9',
            className
          )}
        >
          {ticketStats.map((state) => (
            <MetricCard
              key={state?.title + state?.id}
              title={state?.title}
              metric={
                state?.title === 'Date'
                  ? getDate(
                      eventDetail?.start_date,
                      eventDetail?.end_date || '',
                      eventDetail?.start_time || '',
                      eventDetail?.end_time || ''
                    )
                  : eventDetail?.venue_city
              }
              icon={state?.icon}
              iconClassName="bg-transparent w-11 h-11"
            />
          ))}
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
          src={getImageUrl(eventDetail?.featured_image)}
          alt={'Full Image'}
        />
      </Modal>
    </>
  );
}
