// @ts-nocheck

import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';

const InvitationBadge = ({
  type,
  user_id,
}: {
  type: string;
  user_id: string;
}) => {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: true,
    invitation: true,
  });

  const getInvitationApi = async (userType: string, userId: string) => {
    let pathnameArray = pathname.split('/');
    let eventId = pathnameArray[2];

    let userTypeFix = userType.substring(0, userType.length - 1);

    if (type === 'media-partners') {
      userTypeFix = 'media_partner';
    }

    let res = await EventsApiServices.getEventInvitation(eventId, {
      user_id: userId,
      user_type: userTypeFix,
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
    getInvitationApi(type, user_id);
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
            {state?.invitation ? 'Sent' : 'Pending'}
          </Text>
        </div>
      )}
    </>
  );
};

export default InvitationBadge;
