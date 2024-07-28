'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import Spinner from '@/components/ui/spinner';
import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { LocalStorageHelpers } from '@/eva-components/helpers/localstorage.helpers';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';
import cn from '@/utils/class-names';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthApi } from 'utils/api/Auth';
import ResponseCodes from 'utils/response-codes';

const menuItems = [
  {
    name: 'My Profile',
    href: routes?.myProfile?.profileSetting,
  },
  {
    name: 'Change Password',
    href: routes?.myProfile?.changePassword,
  },
];

function DropdownMenu() {
  const [state, setState] = useState({
    logOutLoading: false,
  });
  const onClickLogOut = async () => {
    // setState({
    //   ...state,
    //   logOutLoading: true,
    // });
    // let res = await AuthApi.Logout();
    // if (res?.response_code === ResponseCodes.LOGOUT_SUCCESS) {
    //   localStorage.clear();
    //   signOut();
    // } else {
    //   toast.error('Internal server error!');
    // }

    // setState({
    //   ...state,
    //   logOutLoading: false,
    // });
    localStorage.clear();
    signOut();
  };

  const getUserData = (type: string) => {
    let data;
    let userData = LocalStorageHelpers.getUserData();
    switch (type) {
      case 'name':
        let first_name = userData?.first_name;
        let last_name = userData?.last_name;
        data = `${first_name} ${last_name}`;
        break;
      case 'avatar':
        let profile_image = userData?.profile_image;
        data = getImageUrl(profile_image);
        break;
      case 'email':
        let email = userData?.email;
        data = email;
        break;
    }

    return data;
  };

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={getUserData('avatar')}
          name={getUserData('name')}
          color="invert"
          className={cn('!h-9 w-9 sm:!h-10 sm:w-10')}
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {getUserData('name')}
          </Title>
          {/* <Text className="text-gray-600">
          {getUserData('email')}
          </Text> */}
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={onClickLogOut}
        >
          {state.logOutLoading ? <Spinner size="sm" /> : 'Sign Out'}
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const getUserData = (type: string) => {
    let data;
    let userData = LocalStorageHelpers.getUserData();
    switch (type) {
      case 'name':
        let first_name = userData?.first_name;
        let last_name = userData?.last_name;
        data = `${first_name} ${last_name}`;
        break;
      case 'avatar':
        let profile_image = userData?.profile_image;
        data = getImageUrl(profile_image);
        break;
    }

    return data;
  };
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button
        className={cn(
          'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
          buttonClassName
        )}
      >
        <Avatar
          src={getUserData('avatar')}
          name={getUserData('name')}
          color="invert"
          className={cn('!h-9 w-9 sm:!h-10 sm:w-10')}
        />
      </button>
    </Popover>
  );
}
