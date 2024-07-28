import { ICategoryData, ICompanyData } from './api.types';

export type EventDetailType = {
  _id: string;
  name: string;
  description: string;
  poster_images: PosterImageType[];
  event_date: string;
  venue_city: string;
  venue_country: string;
  venue_zip: string;
  venue_state: string;
  venue_address_line_1: string;
  venue_address_line_2: string;
  delegates: string[];
  exhibitors: string[];
  speakers: string[];
  media_partners: string[];
  sponsors: string[];
  faqs: string[];
  hotels: string[];
  conference_programmes: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  featured_image: string;
  start_date: string;
  end_date: string;
};

export type PosterImageType = {
  _id: string;
  file_name: string;
  file_url: string;
};

export type ExhibitorDetailType = {
  _id: string;
  first_name: string;
  last_name: string;
  description: string;
  exhibitor_logo: string;
  phone: string;
  email: string;
  phone_country_code: string;
  city: string;
  country: string;
  zip: string;
  state: string;
  address_line_1: string;
  address_line_2: string;
  is_phone_verified: string;
  is_email_verified: string;
  exhibitor_URL: string;
  events: object[];
  created_by: string;
  status: string;
  user_type: string;
  last_login: string;
  is_online: string;
  createdAt: string;
  updatedAt: string;
  job_title: string;
  company_name: string;
  category_name: string;
  telephone: string;
  company: ICompanyData;
  category: ICategoryData;
  __v: number;
  exhibitor_name:string
};
export type paramsUserDetails = {
  user_id: string;
  users_type: string;
  user_type: string;
  user_type_capitalize: string;
  navigation_type: string;
};

export type DelegateDetailType = {
  _id: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string;
  events: any[];
  phone_country_code: string;
  city: string;
  country: string;
  zip: string;
  state: string;
  address_line_1: string;
  address_line_2: string;
  is_phone_verified: string;
  is_email_verified: string;
  delegate_URL: string;
  delegate_linkedin: string;
  companies: object[];
  delegate_associations: object[];
  created_by: string;
  schedules: object[];
  status: string;
  user_type: string;
  last_login: string;
  is_online: string;
  createdAt: string;
  updatedAt: string;
  job_title: string;
  company_name: string;
  category_name: string;
  company: ICompanyData;
  category: ICategoryData;
  telephone: string;
  __v: number;
};

export type SpeakersDetailType = {
  _id: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string;
  phone_country_code: string;
  city: string;
  country: string;
  zip: string;
  state: string;
  address_line_1: string;
  address_line_2: string;
  is_phone_verified: string;
  is_email_verified: string;
  speaker_URL: string;
  speaker_linkedin: string;
  events: object[];
  created_by: string;
  schedules: object[];
  status: string;
  user_type: string;
  last_login: string;
  is_online: string;
  createdAt: string;
  updatedAt: string;
  job_title: string;
  company_name: string;
  category_name: string;
  telephone: string;
  company: ICompanyData;
  category: ICategoryData;
  __v: number;
};

export type MediaPartnersDetailType = {
  _id: string;
  first_name: string;
  last_name: string;
  description: string;
  logo: string;
  email: string;
  phone: string;
  phone_country_code: string;
  is_phone_verified: string;
  is_email_verified: string;
  mediapartner_URL: string;
  events: object[];
  created_by: string;
  schedules: object[];
  status: string;
  user_type: string;
  last_login: string;
  is_online: string;
  createdAt: string;
  updatedAt: string;
  job_title: string;
  company_name: string;
  category_name: string;
  telephone: string;
  company: ICompanyData;
  category: ICategoryData;
  __v: number;
};

export type SponsorsDetailType = {
  _id: string;
  sponsor_name: string;
  sponsor_logo: string;
  sponsor_description: string;
  sponsor_URL: string;
  representative_firstname: string;
  representative_lastname: string;
  phone: string;
  email: string;
  phone_country_code: string;
  sponsor_graphic: string;
  city: string;
  country: string;
  zip: string;
  state: string;
  address_line_1: string;
  address_line_2: string;
  is_phone_verified: string;
  is_email_verified: string;
  events: object[];
  created_by: string;
  status: string;
  user_type: string;
  last_login: string;
  is_online: string;
  createdAt: string;
  updatedAt: string;
  job_title: string;
  company_name: string;
  category_name: string;
  telephone: string;
  company: ICompanyData;
  category: ICategoryData;
  __v: number;
  sponsor_type:string
};

export type AdminType = {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  profile_image: string;
  phone_country_code: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  created_by: string;
  status: string;
  user_type: string;
  roles: any[];
  last_login: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export type AdminDetailType = {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  phone_country_code: string;
  profile_image: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  created_by: string;
  status: string;
  user_type: string;
  roles: AdminRoleType[];
  last_login: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reset_password_token: string;
  id: string;
};

export type AdminRoleType = {
  _id: string;
  role_name: string;
  role_description: string;
  status: string;
  permissions: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

export type FAQsListType = {
  _id: string;
  question: string;
  answer: string;
  event_id: string[];
  __v: number;
  id: string;
};

export type NetworkingEventType = {
  _id: string;
  event_name: string;
  location: string;
  theme: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  notes: string;
  label_for_input_field: string;
  user_input_field: boolean;
  events: any[];
};
export type HotelEventType = {
  _id: string;
  name: string;
};
export type HotelImageType = {
  _id: string;
  file_url: string;
};

export type HotelListType = {
  _id: string;
  hotel_name: string;
  description: string;
  hotel_url: string;
  hotel_email: string;
  phone: string;
  phone_country_code: string;
  city: string;
  country: string;
  zip: string;
  address_line_1: string;
  address_line_2: string;
  events: HotelEventType[];
  hotel_images: HotelImageType[];
  status: string;
  __v: number;
};

export type ConferenceProgramEditDataType = {
  _id: string;
  title: string;
  subtitle: string;
  date: string;
  time_from: string;
  time_to: string;
  description: string;
  add_to_calender: boolean;
  events: string[];
  sponsors: string[];
  __v: number;
  id: string;
};

export type CompaniesEditDataType = {
  _id: string;
  company_name: string;
  company_type: string;
  email: string;
  phone: string;
  phone_country_code: string;
  city: string;
  country: string;
  zip: string;
  address_line_1: string;
  description: string;
  company_logo: string;
  bio: string;
  sponsor_type_name: string;
  sponsor_type: ICategoryData;
  company_URL: string;
};

export type StaffRoleDataType = {
  _id: string;
  role_name: string;
  role_description: string;
  status: string;
  permissions: StaffPermissionDataType[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type StaffPermissionDataType = {
  _id: string;
  name: string;
  description: string;
  status: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type userListPageType = {
  data: any[];
  loading: boolean;
  totalDocs: number;
  paginationHandler: any;
  perPageCount: number;
  resetCurrentPage: boolean;
};
