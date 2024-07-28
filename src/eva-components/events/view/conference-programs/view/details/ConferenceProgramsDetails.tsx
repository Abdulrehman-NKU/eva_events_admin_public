'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { Avatar, Text, Title } from 'rizzui';
import ReactHtmlParser from 'react-html-parser';
import { LuCalendarDays } from 'react-icons/lu';
import { LuCalendarClock } from 'react-icons/lu';
import NetworkingMetricCard from './networking-metric-card';
import dayjs from 'dayjs';
import DetailsDate from './dateAndTime/DetailsDate';
import DetailsTime from './dateAndTime/DetailsTime';
import { ConferenceProgramsApi } from 'utils/api/event/ConferencePrograms';
import DeleteConferenceProgramModal from './DeleteConferenceProgramModal';

export default function ConferenceProgramsDetails() {
  const pathname = usePathname();
  const [state, setState] = useState<any>({
    isLoading: false,
    eventDetail: null,
  });

  const formatDate = (date?: Date, format: string = 'DD MMM, YYYY'): string => {
    if (!date) return '';
    return dayjs(date).format(format);
  };

  let getEventDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let conference_program_id = pathnameArray[5];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await ConferenceProgramsApi.getConferenceProgramsById(
      conference_program_id
    );

    console.log("res-conference_program_id>>>",res);
    

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          eventDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Event not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getEventDetailsApi();
  }, []);





  return (
    <>
      {state?.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <>
          <div className="mb-14 mt-5 rounded-lg border border-gray-200 bg-gray-0 p-4 lg:p-6 dark:bg-gray-50">
            <div className="">
              <Title
                as="h6"
                className={
                  'font-lexend text-lg font-semibold text-gray-900 2xl:xl:text-xl dark:text-gray-700'
                }
              >
                {state?.eventDetail?.title}
              </Title>

              <div
                className={
                  'mb-7 mt-7 grid grid-cols-1 gap-5 capitalize xl:grid-cols-3 2xl:grid-cols-3 3xl:gap-8 4xl:gap-9'
                }
              >
                <NetworkingMetricCard
                  key={`${state?.eventDetail?._id}+${'date'}`}
                  title="Date"
                  metric={<DetailsDate date={state?.eventDetail?.date} />}
                  icon={<LuCalendarDays className="h-6 w-6" />}
                  iconClassName="bg-transparent w-11 h-11"
                  className="p-4"
                />
                <NetworkingMetricCard
                  key={`${state?.eventDetail?._id}+${'time'}`}
                  title="Time"
                  metric={
                    <DetailsTime
                      startTime={state?.eventDetail?.time_from}
                      endTime={state?.eventDetail?.time_to}
                    />
                  }
                  icon={<LuCalendarClock className="h-6 w-6" />}
                  iconClassName="bg-transparent w-11 h-11"
                  className="p-4"
                />
              </div>

              <div>
                {ReactHtmlParser(state?.eventDetail?.description || '')}
              </div>
            </div>
          </div>

          <div>
            <div>
              <Title as="h3" className="mb-5 mt-0 font-semibold sm:text-lg">
                Attendees
              </Title>
            </div>

            <div className="grid grid-cols-1 gap-5 @2xl:grid-cols-2 @6xl:grid-cols-4 xl:grid-cols-3 3xl:gap-8 4xl:gap-8">
              {members?.map((user: any) => (
                <div
                  key={user?.name}
                  className="flex items-center rounded-lg border border-gray-200 bg-gray-0 p-5 lg:p-6 dark:bg-gray-50"
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
                      <Text className={'mb-0.5 text-gray-500'}>
                        {user.name}
                      </Text>
                      <Text
                        className={
                          'font-lexend text-lg font-semibold text-gray-900 2xl:xl:text-xl dark:text-gray-700'
                        }
                      >
                        {state?.eventDetail?.[user?.type] ||
                          '0'}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DeleteConferenceProgramModal event_id={state?.eventDetail?._id} />
        </>
      )}
    </>
  );
}

const members = [
  {
    id: 1,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-12.webp',
    name: 'Exhibitors',
    metric: '7,890',
    color: 'text-[#00a76f]',
    fill: 'bg-[#00a76f]/10',
    type: 'attendee_exhibitors',
  },
  {
    id: 2,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp',
    name: 'Sponsors',
    metric: '7,890',
    color: 'text-[#00b8d9]',
    type: 'attendee_sponsors',
  },
  {
    id: 3,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-10.webp',
    name: 'Delegates',
    metric: '1,160',
    color: 'text-[#ff5630]',
    type: 'attendee_delegates',
  },
  {
    id: 4,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
    name: 'Speakers',
    metric: '1,160',
    color: 'text-[#00a76f]',
    type: 'attendee_speakers',
  },
  {
    id: 5,
    thumbnail:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-02.webp',
    name: 'Media Partners',
    metric: '1,160',
    color: 'text-[#00b8d9]',
    type: 'attendee_media_partners',
  },
];
