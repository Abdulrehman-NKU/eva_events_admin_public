/* eslint-disable react/no-unescaped-entities */
'use client';

import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { SpeakersDetailType } from '@/eva-components/type/propsType';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useState } from 'react';
import { SpeakerApi } from 'utils/api/user/Speaker';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { PiXBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Constatnts from '@/eva-components/constatnt';
import { DelegateApi } from 'utils/api/user/Delegate';
import { usersAction } from '../../../../redux/slice/users';

export default function SpeakersDetails({
  speakersDetail,
  className,
}: {
  speakersDetail: SpeakersDetailType;
  className?: string;
}) {
  const router = useRouter();
  const { openModal } = useModal();
  const dispatch = useDispatch();
  let user_status =
    speakersDetail?.status === Constatnts?.status?.active
      ? Constatnts?.status?.Disable
      : Constatnts?.status?.Enable;
  function DisableSpeakerModalView() {
    const { closeModal } = useModal();
    const [disableisLoading, setDisableisLoading] = useState(false);

    const handleDisableDelegate = async () => {
      setDisableisLoading(true);
      let user_id = speakersDetail?._id;
      let user_status_data = {
        status:
          speakersDetail?.status === Constatnts?.status?.active
            ? Constatnts?.status?.disabled
            : Constatnts?.status?.active,
      };
      let res = await SpeakerApi.changeStatus({
        id: user_id,
        data: user_status_data,
      });
      switch (res?.response_code) {
        case ResponseCodes.SUCCESS:
          toast.success('Status updated successfully');
          dispatch(usersAction.resetSpeakerDetails());
          closeModal();
          break;
        case ResponseCodes.NOT_FOUND:
          toast.error('Delegate not found!');
          break;
        default:
          toast.error('Internal server error!');
      }
      setDisableisLoading(false);
    };
    return (
      <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
        <div className="relative mb-7 flex justify-center">
          <Title as="h3" className="text-center font-semibold ">
            Are you sure to <br />
            {user_status}&nbsp;the Speaker&nbsp;
            {`${speakersDetail?.first_name} ${speakersDetail?.last_name}`}!
          </Title>
          <ActionIcon
            size="sm"
            variant="text"
            onClick={() => closeModal()}
            className="absolute right-0 "
          >
            <PiXBold className="h-auto w-5" />
          </ActionIcon>
        </div>

        <div className="mt-20 flex items-center justify-end gap-4">
          <Button
            variant="outline"
            className="w-full @xl:w-auto"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full @xl:w-auto"
            onClick={handleDisableDelegate}
            isLoading={disableisLoading}
          >
            {user_status}
          </Button>
        </div>
      </div>
    );
  }
  function DeleteSpeakerModalView() {
    const { closeModal } = useModal();
    const [stateList, setStateList] = useState({
      loading: false,
    });

    const handleDeleteSpeakers = async () => {
      setStateList({
        ...stateList,
        loading: true,
      });

      let user_id = speakersDetail?._id;
      let res = await SpeakerApi.deleteSpeaker(user_id);

      console.log('res-remove>>>', res);
      switch (res?.response_code) {
        case ResponseCodes.DELETE_SUCCESS:
          toast.success('Speakers Delete successfully.');
          setTimeout(() => {
            router.push(routes.user.speakers);
          }, 1000);
          break;
        case ResponseCodes.NOT_FOUND:
          toast.error(res?.data?.message);
          break;
        default:
          toast.error('Internal server error!');
      }
      setStateList({
        ...stateList,
        loading: false,
      });
    };
    return (
      <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
        <div className="relative mb-7 flex justify-center">
          <Title as="h3" className="text-center font-semibold ">
            Are you sure to Delete <br /> the Speakers!
          </Title>
          <ActionIcon
            size="sm"
            variant="text"
            onClick={() => closeModal()}
            className="absolute right-0 "
          >
            <PiXBold className="h-auto w-5" />
          </ActionIcon>
        </div>

        <div className="mt-20 flex items-center justify-end gap-4">
          <Button
            variant="outline"
            className="w-full @xl:w-auto"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full @xl:w-auto"
            onClick={handleDeleteSpeakers}
            isLoading={stateList?.loading}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Info
        </Title>
      </div>
      <div className="mt-12 grid items-start rounded-xl border border-gray-300 p-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Speakers ID :</span>
            <span className="">{speakersDetail?._id}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Speaker URL :</span>
            <a
              href={speakersDetail?.speaker_URL}
              className="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap underline"
            >
              {speakersDetail?.speaker_URL}
            </a>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className=" font-semibold text-gray-900">Country :</span>
            <span className="">{speakersDetail?.country} </span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">First Name :</span>
            <span className="">{speakersDetail?.first_name}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">LinkedIn :</span>
            <a
              href={speakersDetail?.speaker_linkedin}
              className="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap underline"
            >
              {speakersDetail?.speaker_linkedin}
            </a>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">City :</span>
            <span className="">{speakersDetail?.city}</span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className=" font-semibold text-gray-900">Last Name :</span>
            <span className="">{speakersDetail?.last_name}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Status :</span>
            <Badge color="success" rounded="md">
              {speakersDetail?.status}
            </Badge>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Phone :</span>
            <span className="">
              {speakersDetail?.phone_country_code && speakersDetail?.phone
                ? `${speakersDetail.phone_country_code} ${speakersDetail.phone}`
                : '-'}
            </span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Email :</span>
            <span className="">{speakersDetail?.email}</span>
          </li>
        </ul>
      </div>
      <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Bio
        </Title>
        {/* <div className="mt-9">{ReactHtmlParser(speakersDetail?.bio)}</div> */}
        <div className="mt-9">
          {speakersDetail?.bio ? ReactHtmlParser(speakersDetail?.bio) : '-'}
        </div>
      </div>
      <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Settings
        </Title>
        <div
          className={cn(className, 'mt-12 flex flex-wrap items-center gap-4')}
        >
          {/* <Button
            variant="outline"
            className="text-lightBlack w-full cursor-pointer bg-gray-100 text-sm @lg:w-auto"
            onClick={() =>
              openModal({
                view: <DisableSpeakerModalView />,
                customSize: '480px',
              })
            }
          >
            Disable Speaker
          </Button> */}
          <Button
            variant="outline"
            className={cn(
              className,
              'text-lightBlack w-full cursor-pointer bg-gray-100 text-sm @lg:w-auto'
            )}
            onClick={() =>
              openModal({
                view: <DisableSpeakerModalView />,
                customSize: '480px',
              })
            }
          >
            {`${user_status} Speaker`}
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer bg-red text-sm text-white @lg:w-auto"
            onClick={() =>
              openModal({
                view: <DeleteSpeakerModalView />,
                customSize: '480px',
              })
            }
          >
            Delete Speaker
          </Button>
        </div>
      </div>
    </>
  );
}
