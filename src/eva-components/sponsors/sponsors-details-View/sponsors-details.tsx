/* eslint-disable react/no-unescaped-entities */
'use client';

import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import Image from 'next/image';
import EventImages from '@public/event.jpg';
import { SponsorsDetailType } from '@/eva-components/type/propsType';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useState } from 'react';
import { SponsorApi } from 'utils/api/user/Sponsor';
import ResponseCodes from 'utils/response-codes';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { PiXBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Constatnts from '@/eva-components/constatnt';
import { usersAction } from '../../../../redux/slice/users';

export default function SponsorsDetails({
  sponsorsDetail,
  className,
}: {
  sponsorsDetail: SponsorsDetailType;
  className?: string;
}) {
  const { openModal } = useModal();
  const router = useRouter();
  const dispatch = useDispatch();
  let user_status =
    sponsorsDetail?.status === Constatnts?.status?.active
      ? Constatnts?.status?.Disable
      : Constatnts?.status?.Enable;

  function DisableDelegateModalView() {
    const { closeModal } = useModal();
    const [disableisLoading, setDisableisLoading] = useState(false);

    const handleStatusChange = async () => {
      setDisableisLoading(true);
      let user_id = sponsorsDetail?._id;
      let user_status_data = {
        status:
          sponsorsDetail?.status === Constatnts?.status?.active
            ? Constatnts?.status?.disabled
            : Constatnts?.status?.active,
      };
      let res = await SponsorApi.changeStatus({
        id: user_id,
        data: user_status_data,
      });
      switch (res?.response_code) {
        case ResponseCodes.SUCCESS:
          toast.success('Status updated successfully');
          dispatch(usersAction.resetSponsorDetails());
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
            {user_status}&nbsp;the Sponsor&nbsp;
            {`${sponsorsDetail?.sponsor_name}`}!
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

    const handleDeleteSponsors = async () => {
      setStateList({
        ...stateList,
        loading: true,
      });

      let user_id = sponsorsDetail?._id;
      let res = await SponsorApi.deleteSponsor(user_id);

      console.log('res-remove>>>', res);
      switch (res?.response_code) {
        case ResponseCodes.DELETE_SUCCESS:
          toast.success('Sponsors Delete successfully.');
          setTimeout(() => {
            router.push(routes.user.sponsors);
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
            Are you sure to Delete <br /> the Sponsors!
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
            className="w-full @xl:w-auto "
            onClick={handleDeleteSponsors}
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
            <span className="font-semibold text-gray-900">Sponsors ID :</span>
            <span className="">{sponsorsDetail?._id}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Sponsors URL :</span>
            <a
              href={sponsorsDetail?.sponsor_URL}
              className="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap underline"
            >
              {sponsorsDetail?.sponsor_URL}
            </a>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className=" font-semibold text-gray-900">Country :</span>
            <span className="">{sponsorsDetail?.country} </span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Sponsor Name :</span>
            <span className="">{sponsorsDetail?.sponsor_name}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Status :</span>
            <Badge color="success" rounded="md">
              {sponsorsDetail?.status}
            </Badge>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">City :</span>
            <span className="">{sponsorsDetail?.city}</span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Phone :</span>
            {sponsorsDetail?.phone_country_code && sponsorsDetail?.phone
              ? `${sponsorsDetail.phone_country_code} ${sponsorsDetail.phone}`
              : '-'}
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Email :</span>
            <span className="">{sponsorsDetail?.email}</span>
          </li>
        </ul>
      </div>
      {/* <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Sponsor Graphic
        </Title>
        <div className="mt-9 rounded-xl border border-gray-300 p-8">
          <div
            className="relative mx-auto aspect-[4/4.65] w-full cursor-pointer overflow-hidden rounded bg-gray-100 @xl:rounded-md "
            style={{ height: '384px' }}
          >
            <Image
              layout="fill"
              objectFit="cover"
              priority
              src={sponsorsDetail?.sponsor_graphic}
              alt={'Product Gallery'}
              className="object-cover"
            />
          </div>
        </div>
      </div> */}
      <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Description
        </Title>
        {/* <div className="mt-9">
          {ReactHtmlParser(sponsorsDetail?.sponsor_description)}
        </div> */}
        <div className="mt-9">
          {sponsorsDetail?.sponsor_description
            ? ReactHtmlParser(sponsorsDetail?.sponsor_description)
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
            Disable Sponsors
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
            {`${user_status} Sponsor`}
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
            Delete Sponsors
          </Button>
        </div>
      </div>
    </>
  );
}
