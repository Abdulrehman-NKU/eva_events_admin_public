// @ts-nocheck

import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { getParamsDetails } from './getData';

const EventInvitationBadge = ({ event_id }: { event_id: string }) => {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: true,
    invitation: true,
  });

  const getInvitationApi = async (eventId: string) => {
    const userDetails = getParamsDetails(pathname);

    let user_type = getParamsDetails(pathname).user_type;

    if (user_type === 'media-partner') {
      user_type = 'media_partner';
    }

    let res = await EventsApiServices.getEventInvitation(eventId, {
      user_id: userDetails?.user_id,
      user_type: user_type,
    });

    if (res?.response_code) {
      setState({
        ...state,
        invitation: res?.data?.data?.invitation,
        isLoading: false,
      });
    }

    console.log('res>>>', res);
  };

  useEffect(() => {
    getInvitationApi(event_id);
  }, []);

  return (
    <>
      {state.isLoading ? (
        <div>
          <Loader variant={'threeDot'} />
        </div>
      ) : (
        <div className="flex items-center capitalize">
          {state?.invitation ? (
            <Badge color="success" renderAsDot />
          ) : (
            <Badge renderAsDot className="bg-gray-400" />
          )}

          <Text
            className={`ms-2 font-medium  ${
              state?.invitation ? 'text-green-dark' : 'text-gray-600'
            }`}
          >
            {state?.invitation ? 'Send' : 'Pending'}
          </Text>
        </div>
      )}
    </>
  );
};

export default EventInvitationBadge;
