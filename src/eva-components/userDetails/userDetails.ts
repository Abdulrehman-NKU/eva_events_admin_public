import { CommonEnums } from '@/enums/common.enums';
import Constatnts from '../constatnt';
import { UsersListType } from '../type/common.types';

export class UserDetails {
  static getUserName = (data: UsersListType) => {
    let userName;

    if (data?.first_name) {
      userName = `${data?.first_name} ${data?.last_name}`;
    } else {
      userName = data?.sponsor_name;
    }
    return userName;
  };

  static getUserBio = (data: UsersListType) => {
    let userBio;

    switch (data?.user_type) {
      case Constatnts.delegate:
        userBio = data?.bio || '';
        break;
      case Constatnts.exhibitor:
        userBio = data?.description || '';
        break;
      case Constatnts.sponsor:
        userBio = data?.sponsor_description || '';
        break;
      case Constatnts.speaker:
        userBio = data?.bio || '';
        break;
      case Constatnts.media_partners:
        userBio = data?.description || '';
        break;
    }

    return userBio;
  };

  static getUserLogo = (data: UsersListType) => {
    let urlString;

    switch (data?.user_type) {
      case Constatnts.delegate:
        urlString = data?.avatar || '';
        break;
      case Constatnts.exhibitor:
        urlString = data?.exhibitor_logo || '';
        break;
      case Constatnts.sponsor:
        urlString = data?.sponsor_logo || '';
        break;
      case Constatnts.speaker:
        urlString = data?.avatar || '';
        break;
      case Constatnts.media_partners:
        urlString = data?.logo || '';
        break;
    }

    return urlString;
  };

  static getUserLinkedinUrl = (data: UsersListType) => {
    let urlString;

    switch (data?.user_type) {
      case Constatnts.delegate:
        urlString = data?.delegate_linkedin || '';
        break;

      case Constatnts.speaker:
        urlString = data?.speaker_linkedin || '';
        break;

      default:
        urlString = '';
    }

    return urlString;
  };

  static getUserUrl = (data: UsersListType) => {
    let urlString;

    switch (data?.user_type) {
      case Constatnts.delegate:
        urlString = data?.delegate_URL || '';
        break;
      case Constatnts.exhibitor:
        urlString = data?.exhibitor_URL || '';
        break;
      case Constatnts.sponsor:
        urlString = data?.sponsor_URL || '';
        break;
      case Constatnts.speaker:
        urlString = data?.speaker_URL || '';
        break;
      case Constatnts.media_partners:
        urlString = data?.mediapartner_URL || '';
        break;
      default:
        urlString = '';
    }

    return urlString;
  };
}

export const emailFormate = (email: string) => {
  return email.toLowerCase()?.trim();
};

export const getImageUrl = (image: any) => {
  let baseURL = CommonEnums.url.apiRoot;
  // let baseURL = process.env.NEXT_IMAGE_ENDPOINT;
  if (image) {
    let result = image.includes('https');
    if (result) {
      return image;
    } else {
      const imageUrlArray = image?.split('/');
      let imageUrl = `${baseURL}/${imageUrlArray[1]}/${imageUrlArray[2]}`;
      return imageUrl;
    }
  } else {
    return '';
  }

  // return image.toLowerCase()?.trim();
};
