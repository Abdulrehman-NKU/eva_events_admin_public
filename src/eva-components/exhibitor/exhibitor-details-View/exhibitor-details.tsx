/* eslint-disable react/no-unescaped-entities */
'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';
import { ExhibitorDetailType } from '@/eva-components/type/propsType';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';
import { ExhibitorApi } from 'utils/api/user/Exhibitor';
import ResponseCodes from 'utils/response-codes';
import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Constatnts from '@/eva-components/constatnt';
import { DelegateApi } from 'utils/api/user/Delegate';
import { usersAction } from '../../../../redux/slice/users';

export default function ExhibitorDetails({
  exhibitorDetail,
  className,
}: {
  exhibitorDetail: ExhibitorDetailType;
  className?: string;
}) {
  const router = useRouter();
  const { openModal } = useModal();
  const dispatch = useDispatch();
  let user_status =
    exhibitorDetail?.status === Constatnts?.status?.active
      ? Constatnts?.status?.Disable
      : Constatnts?.status?.Enable;

  function DisableExhibitorModalView() {
    const { closeModal } = useModal();
    const [disableisLoading, setDisableisLoading] = useState(false);

    const handleStatusChange = async () => {
      setDisableisLoading(true);
      let user_id = exhibitorDetail?._id;
      let user_status_data = {
        status:
          exhibitorDetail?.status === Constatnts?.status?.active
            ? Constatnts?.status?.disabled
            : Constatnts?.status?.active,
      };
      let res = await ExhibitorApi.changeStatus({
        id: user_id,
        data: user_status_data,
      });
      switch (res?.response_code) {
        case ResponseCodes.SUCCESS:
          toast.success('Status updated successfully');
          dispatch(usersAction.resetExhibitorsDetails());
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
            {user_status}&nbsp;the Exhibitor&nbsp;
            {`${exhibitorDetail?.first_name} ${exhibitorDetail?.last_name}`}!
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
  function DeleteExhibitorModalView() {
    const { closeModal } = useModal();
    const [stateList, setStateList] = useState({
      loading: false,
    });

    const handleDeleteExhibitor = async () => {
      setStateList({
        ...stateList,
        loading: true,
      });

      let user_id = exhibitorDetail?._id;
      let res = await ExhibitorApi.deleteExhibitor(user_id);

      console.log('res-remove>>>', res);
      switch (res?.response_code) {
        case ResponseCodes.DELETE_SUCCESS:
          toast.success('Exhibitor Delete successfully.');
          setTimeout(() => {
            router.push(routes.user.exhibitors);
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
            Are you sure to Delete <br /> the Exhibitor!
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
            onClick={handleDeleteExhibitor}
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
            <span className="font-semibold text-gray-900">Exhibitor ID :</span>
            <span className=""> {exhibitorDetail?._id}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Exhibitor URL :</span>
            <a
              href={exhibitorDetail?.exhibitor_URL}
              className="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap underline"
            >
              {exhibitorDetail?.exhibitor_URL}
            </a>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className=" font-semibold text-gray-900">Country :</span>
            <span className="">{exhibitorDetail?.country} </span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">
              Representative Name :
            </span>
            <span className="">
              {exhibitorDetail?.first_name} {exhibitorDetail?.last_name}
            </span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Email :</span>
            <span className="">{exhibitorDetail?.email}</span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">City :</span>
            <span className="">{exhibitorDetail?.city}</span>
          </li>
        </ul>
        <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Phone :</span>
            <span className="">
              {exhibitorDetail?.phone_country_code && exhibitorDetail?.phone
                ? `${exhibitorDetail.phone_country_code} ${exhibitorDetail.phone}`
                : '-'}
            </span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Status :</span>
            <Badge color="success" rounded="md">
              {exhibitorDetail?.status}
            </Badge>
          </li>
        </ul>
      </div>
      <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Description
        </Title>
        {/* <div className="mt-9">
          {ReactHtmlParser(exhibitorDetail?.description)}
        </div> */}
        <div className="mt-9">
          {exhibitorDetail?.description
            ? ReactHtmlParser(exhibitorDetail?.description)
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
                view: <DisableExhibitorModalView />,
                customSize: '480px',
              })
            }
          >
            Disable Exhibitor
          </Button> */}
          <Button
            variant="outline"
            className={cn(
              className,
              'text-lightBlack w-full cursor-pointer bg-gray-100 text-sm @lg:w-auto'
            )}
            onClick={() =>
              openModal({
                view: <DisableExhibitorModalView />,
                customSize: '480px',
              })
            }
          >
            {`${user_status} Exhibitor`}
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer bg-red text-sm text-white @lg:w-auto"
            onClick={() =>
              openModal({
                view: <DeleteExhibitorModalView />,
                customSize: '480px',
              })
            }
          >
            Delete Exhibitor
          </Button>
        </div>
      </div>
    </>
  );
}
