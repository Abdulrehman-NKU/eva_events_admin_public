/* eslint-disable react/no-unescaped-entities */
'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';
import ResponseCodes from 'utils/response-codes';
import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { AdminDetailType } from '@/eva-components/type/propsType';
import { AdminApi } from 'utils/api/user/Admin';
import { useRouter } from 'next/navigation';

export default function AdminDetails({
  adminDetail,
  className,
}: {
  adminDetail: AdminDetailType;
  className?: string;
}) {
  const router = useRouter();
  const { openModal } = useModal();

  function DisableAdminModalView() {
    const { closeModal } = useModal();
    return (
      <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
        <div className="relative mb-7 flex justify-center">
          <Title as="h3" className="text-center font-semibold ">
            Are you sure to <br /> Disable the Admin!
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
            onClick={() => closeModal()}
          >
            Disable
          </Button>
        </div>
      </div>
    );
  }
  function DeleteAdminModalView() {
    const { closeModal } = useModal();
    const [stateList, setStateList] = useState({
      loading: false,
    });

    const handleDeleteAdmin = async () => {
      setStateList({
        ...stateList,
        loading: true,
      });

      let admin_id = adminDetail?._id;
      let res = await AdminApi.deleteAdmins(admin_id);

      console.log('res-remove>>>', res);
      switch (res?.response_code) {
        case ResponseCodes.DELETE_SUCCESS:
          toast.success('Admin Delete successfully.');
          setTimeout(() => {
            router.push(routes.user.admin);
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
            Are you sure to Delete <br /> the Admin!
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
            onClick={handleDeleteAdmin}
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
        <div>
          <Title as="h3" className="mt-16 font-semibold sm:text-lg">
            Info
          </Title>
        </div>
        <div className="mt-12 grid items-start rounded-xl border border-gray-300 p-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">Admin ID :</span>
              <span className=""> {adminDetail?._id}</span>
            </li>
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">Email :</span>
              <span className="">{adminDetail?.email}</span>
            </li>
          </ul>
          <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">First Name :</span>
              <span className="">{adminDetail?.first_name}</span>
            </li>
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">Status :</span>
              <Badge color="success" rounded="md">
                {adminDetail?.status}
              </Badge>
            </li>
          </ul>
          <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className=" font-semibold text-gray-900">Last Name :</span>
              <span className="">{adminDetail?.last_name}</span>
            </li>
          </ul>
          <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">Phone :</span>
              <span className="">
                {' '}
                {`${adminDetail?.phone_country_code} ${adminDetail?.phone}`}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* <div>
        <Title as="h3" className="mt-16 font-semibold sm:text-lg">
          Settings
        </Title>
        <div
          className={cn(className, 'mt-12 flex flex-wrap items-center gap-4')}
        >
          <Button
            variant="outline"
            className="text-lightBlack w-full cursor-pointer bg-gray-100 text-sm @lg:w-auto"
            onClick={() =>
              openModal({
                view: <DisableAdminModalView />,
                customSize: '480px',
              })
            }
          >
            Disable Admin
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer bg-red text-sm text-white @lg:w-auto"
            onClick={() =>
              openModal({
                view: <DeleteAdminModalView />,
                customSize: '480px',
              })
            }
          >
            Delete Admin
          </Button>
        </div>
      </div> */}
    </>
  );
}
