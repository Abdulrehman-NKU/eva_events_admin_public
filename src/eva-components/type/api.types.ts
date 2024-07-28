export interface ICompanyData {
  _id: string;
  company_name: string;
  company_type: string;
  email: string;
  phone: string;
  phone_country_code: string;
  description: string;
  city: string;
  country: string;
  zip: string;
  address_line_1: string;
  address_line_2: string;
  status: string;
  __v: number;
  id: string;
}

export interface ICategoryData {
  _id: string;
  category_name: string;
  description: string;
  status: string;
  __v: number;
  id: string;
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  phone: string;
  email: string;
  phone_country_code: string;
  password: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  created_by: string;
  status: string;
  city: string;
  country: string;
  zip: string;
  // state: string
  address_line_1: string;
  address_line_2: string;
  delegate_URL: string;
  delegate_linkedin: string;
  events: string[];
  job_titles: string[];
  companies: string[];
  delegate_associations: string[];
  profile_surveys: string[];
  last_login: Date;
  is_online: boolean;
  user_type: string;
  pa_name: string;
  pa_email: string;
  schedules: string[];
  description: string;
  exhibitor_logo: string;
  exhibitor_URL: string;
  sponsor_name: string;
  sponsor_logo: string;
  sponsor_description: string;
  sponsor_URL: string;
  representative_firstname: string;
  representative_lastname: string;
  sponsor_graphic: string;

  speaker_URL: string;
  speaker_linkedin: string;
  job_title: string;
  company: ICompanyData;
  category: ICategoryData;

  logo: string;
  // city: string
  // country: string
  // zip: string
  // state: string
  // address_line_1: string
  // address_line_2: string
  mediapartner_URL: string;

  createdAt: Date;
  updatedAt: Date;
}
