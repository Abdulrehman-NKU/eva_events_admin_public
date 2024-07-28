import Image from 'next/image';
import React from 'react';
import { UsersListType } from '../type/common.types';
import { getImageUrl, UserDetails } from '../userDetails/userDetails';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './UserProfilePhoto.module.scss';

const UserProfilePhoto = ({ userData }: { userData: UsersListType }) => {
  return (
    <div>
      <figure
        className={`relative -mt-8 h-20 w-20 rounded-full border-4 border-white drop-shadow  @2xl:h-32 @2xl:w-32  ${styles.profile_image}`}
      >
        {/* <span className="absolute bottom-1.5 right-1.5 z-10 h-3 w-3 rounded-full border-2 border-white bg-[#11A849] @2xl:bottom-2.5 @2xl:right-2.5 @3xl:h-4 @3xl:w-4 @4xl:bottom-2 @4xl:right-2" /> */}

        {UserDetails?.getUserLogo(userData) ? (
          <Image
            src={getImageUrl(UserDetails?.getUserLogo(userData))}
            alt=""
            fill
            priority
            className="rounded-full bg-gray-100"
          />
        ) : (
          <div className={styles.demo_image}>
            <AccountCircleIcon />
          </div>
        )}
      </figure>
    </div>
  );
};

export default UserProfilePhoto;
