export interface ISelectorOption {
  id: string;
  name: string;
}

export interface ISetGetApiParameter {
  search: string;
  page: number;
  limit: number;
  cancelToken: any;
}

export type UsersListType = {
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
  events: any[];
  job_titles: any[];
  companies: any[];
  delegate_associations: any[];
  profile_surveys: any[];
  last_login: Date;
  is_online: boolean;
  user_type: string;
  pa_name: string;
  pa_email: string;
  schedules: any[];
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
  logo: string;
  mediapartner_URL: string;
  createdAt: string;
  updatedAt: string;
  company_name: string;
  company_id: string;
  company: ICompaniesModelSchema;
  user_id: string;
  meeting_status: string;
  category_name: string;
  category: {
    _id: string;
    category_name: string;
    description: string;
    status: string;
    __v: number;
  };
};

export interface ICompaniesModelSchema {
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
  address_line_2: string;
  description: string;
  status: string;
}
