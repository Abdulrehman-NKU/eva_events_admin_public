import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';

const SendInvite = ({ user_id }: { user_id: string }) => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const pathname = usePathname();

  const sendInviteApi = async (userId: string) => {
    let pathnameArray = pathname.split('/');
    let type = pathnameArray[3];
    let eventId = pathnameArray[2];
    setState({
      ...state,
      isLoading: true,
    });

    let res = await EventsApiServices.SendInvite(
      { user_ids: [userId] },
      type,
      eventId
    );
    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
    } else if (res?.response_code === ResponseCodes.NOT_FOUND) {
      toast.error('Event not found!');
    } else {
      toast.error('Internal server error!');
    }

    setState({
      ...state,
      isLoading: false,
    });
  };

  return (
    <div>
      {/* <Button
        tag="span"
        className="text-lightBlack w-full cursor-pointer bg-gray-100 text-sm"
      ></Button> */}

      <Button
        isLoading={state?.isLoading}
        className="bg-white-100 pl-7 pr-7 text-black hover:bg-black hover:text-white"
        style={{ border: '1px solid black' }}
        onClick={() => sendInviteApi(user_id)}
      >
        Send Invite
      </Button>
    </div>
  );
};

export default SendInvite;
