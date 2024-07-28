// @ts-nocheck

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { Button } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import { eventAction } from '../../../../../../redux/slice/event';

const SendInvite = ({ user_id, type }: { user_id: string; type: string }) => {
  const [state, setState] = useState({
    isLoading: false,
    invitation: false,
  });
  const pathname = usePathname();
  const dispatch = useDispatch();

  const getInvitationApi = async (userType: string, userId: string) => {
    setState({
      ...state,
      isLoading: true,
    });

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
  };

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
    if (res?.response_code === ResponseCodes.SUCCESS) {
      toast.success('Invitation send successfully.');
      setTimeout(() => {
        dispatch(eventAction?.setResetEventUsersList());
      }, 2000);
    } else if (res?.response_code === ResponseCodes.FAILED) {
      toast.error(res?.data?.message);
    } else if (res?.response_code === ResponseCodes.NOT_FOUND) {
      toast.error(res?.data?.message);
    } else {
      toast.error('Internal server error!');
    }

    setState({
      ...state,
      isLoading: false,
    });
  };

  useEffect(() => {
    getInvitationApi(type, user_id);
  }, [user_id]);

  const renderButtonText = () => {
    if (state.invitation) {
      return 'Resend Invite';
    }

    return 'Send Invite';
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
        style={{ border: '1px solid gray' }}
        onClick={() => sendInviteApi(user_id)}
      >
        {renderButtonText()}
      </Button>
    </div>
  );
};

export default SendInvite;
