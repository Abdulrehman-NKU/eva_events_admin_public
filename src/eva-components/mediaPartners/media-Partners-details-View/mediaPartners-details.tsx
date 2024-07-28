/* eslint-disable react/no-unescaped-entities */

import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { MediaPartnersDetailType } from '@/eva-components/type/propsType';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useState } from 'react';
import { MediaPartnerApi } from 'utils/api/user/MediaPartners';
import ResponseCodes from 'utils/response-codes';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { PiXBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/navigation';
import { usersAction } from '../../../../redux/slice/users';
import { useDispatch } from 'react-redux';
import Constatnts from '@/eva-components/constatnt';

export default function MediaPartnerDetails({
  mediaPartnersDetail,
  className,
}: {
  mediaPartnersDetail: MediaPartnersDetailType;
  className?: string;
}) {
  const router = useRouter();
  const { openModal } = useModal();
  const dispatch = useDispatch();
  let user_status =
    mediaPartnersDetail?.status === Constatnts?.status?.active
      ? Constatnts?.status?.Disable
      : Constatnts?.status?.Enable;

  function DisableDelegateModalView() {
    const { closeModal } = useModal();
    const [disableisLoading, setDisableisLoading] = useState(false);

    const handleStatusChange = async () => {
      setDisableisLoading(true);
      let user_id = mediaPartnersDetail?._id;
      let user_status_data = {
        status:
          mediaPartnersDetail?.status === Constatnts?.status?.active
            ? Constatnts?.status?.disabled
            : Constatnts?.status?.active,
      };
      let res = await MediaPartnerApi.changeStatus({
        id: user_id,
        data: user_status_data,
      });
      switch (res?.response_code) {
        case ResponseCodes.SUCCESS:
          toast.success('Status updated successfully');
          dispatch(usersAction?.resetMediaPartnerDetails());
          closeModal();
          break;
        case ResponseCodes.NOT_FOUND:
          toast.error(res?.data?.message);
          break;
        default:
          toast.error(res?.data?.message || 'Internal server error!');
      }
      setDisableisLoading(false);
    };

    return (
      <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
        <div className="relative mb-7 flex justify-center">
          <Title as="h3" className="text-center font-semibold ">
            Are you sure to <br />
            {user_status}&nbsp;the Media Partner&nbsp;
            {`${mediaPartnersDetail?.first_name} ${mediaPartnersDetail?.last_name}`}
            !
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
            onClick={handleStatusChange}
            isLoading={disableisLoading}
          >
            {user_status}
          </Button>
        </div>
      </div>
    );
  }
  function DeleteDelegateModalView() {
    const { closeModal } = useModal();
    const [stateList, setStateList] = useState({
      loading: false,
    });
    const handleDeleteMediaPartners = async () => {
      setStateList({
        ...stateList,
        loading: true,
      });

      let user_id = mediaPartnersDetail?._id;
      let res = await MediaPartnerApi.deleteMediaPartner(user_id);

      console.log('res-remove>>>', res);
      switch (res?.response_code) {
        case ResponseCodes.DELETE_SUCCESS:
          toast.success('MediaPartners Delete successfully.');
          setTimeout(() => {
            router.push(routes.user.mediaPartners);
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
            Are you sure to Delete <br /> the Media Partner!
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
            onClick={handleDeleteMediaPartners}
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
      <div className="mt-12 grid items-start rounded-xl border border-gray-300 p-5  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">
              MediaPartner ID :
            </span>
            <span className="">{mediaPartnersDetail?._id}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">
              MediaPartner URL :
            </span>
            <a
              href={mediaPartnersDetail?.mediapartner_URL}
              className="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap underline"
            >
              {mediaPartnersDetail?.mediapartner_URL}
            </a>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">First Name :</span>
            <span className="">{mediaPartnersDetail?.first_name}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Email :</span>
            <span className="">{mediaPartnersDetail?.email}</span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className=" font-semibold text-gray-900">Last Name :</span>
            <span className="">{mediaPartnersDetail?.last_name}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Status :</span>
            <Badge color="success" rounded="md">
              {mediaPartnersDetail?.status}
            </Badge>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Phone :</span>
            {mediaPartnersDetail?.phone_country_code &&
            mediaPartnersDetail?.phone
              ? `${mediaPartnersDetail.phone_country_code} ${mediaPartnersDetail.phone}`
              : '-'}
          </li>
        </ul>
      </div>
      <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Description
        </Title>
        {/* <div className="mt-9">
          {ReactHtmlParser(mediaPartnersDetail?.description)}
        </div> */}
        <div className="mt-9">
          {mediaPartnersDetail?.description
            ? ReactHtmlParser(mediaPartnersDetail?.description)
            : '-'}
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
                view: <DisableDelegateModalView />,
                customSize: '480px',
              })
            }
          >
            Disable Media Partner
          </Button> */}
          <Button
            variant="outline"
            className={cn(
              className,
              'text-lightBlack w-full cursor-pointer bg-gray-100 text-sm @lg:w-auto'
            )}
            onClick={() =>
              openModal({
                view: <DisableDelegateModalView />,
                customSize: '480px',
              })
            }
          >
            {`${user_status} Media Partner`}
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer bg-red text-sm text-white @lg:w-auto"
            onClick={() =>
              openModal({
                view: <DeleteDelegateModalView />,
                customSize: '480px',
              })
            }
          >
            Delete Media Partner
          </Button>
        </div>
      </div>
    </>
  );
}
