export type SponsorsType = {
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
  __v: 0;
  id: string;
};

export const SponsorsData = [
  {
    _id: '6596877c9e893c223fd7d64e',
    sponsor_name: 'New sponsor',
    sponsor_logo:
      'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//ea6a36900e77f6781bfca1828571b0e8-e15e8c1c-c425-48b7-8e04-69c7d5296ed7',
    sponsor_description: 'Description here',
    sponsor_URL: 'sponsor_URL',
    representative_firstname: 'Niten',
    representative_lastname: 'Solanki',
    phone: '9756789045',
    email: 'nitensolanki02@gmail.com',
    phone_country_code: '91',
    sponsor_graphic: '',
    city: 'city',
    country: 'country',
    zip: 'zip',
    state: 'state',
    address_line_1: 'address_line_1',
    address_line_2: 'address_line_2',
    is_phone_verified: false,
    is_email_verified: false,
    events: ['659569058cee43d1fe23677b'],
    created_by: null,
    status: 'active',
    user_type: 'sponsor',
    last_login: null,
    is_online: false,
    createdAt: '2024-01-04T10:25:00.799Z',
    updatedAt: '2024-01-04T10:25:03.674Z',
    __v: 0,
    id: '6596877c9e893c223fd7d64e',
  },
];

export type ExhibitorType = {
  _id: string;
  first_name: string;
  last_name: string;
  exhibitor_name: string;
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
  is_phone_verified: false;
  is_email_verified: false;
  exhibitor_URL: string;
  events: object[];
  created_by: string;
  status: string;
  user_type: string;
  last_login: string;
  is_online: false;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export const exhibitorData = [
  {
    _id: '659569328cee43d1fe23677e',
    first_name: 'Niten',
    last_name: 'Solanki',
    description: null,
    exhibitor_logo:
      'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//0fe32fa101e50509ef78eb64662b8c94-3ad6047c-e970-4ada-9c11-03c233dd4ca0',
    phone: '9879354006',
    email: 'nitensolanki05@gmail.com',
    phone_country_code: '91',
    city: 'city',
    country: 'country',
    zip: 'zip',
    state: 'state',
    address_line_1: 'address_line_1',
    address_line_2: 'address_line_2',
    is_phone_verified: false,
    is_email_verified: false,
    exhibitor_URL: null,
    events: [],
    created_by: null,
    status: 'active',
    user_type: 'exhibitors',
    last_login: null,
    is_online: false,
    createdAt: '2024-01-03T14:03:30.451Z',
    updatedAt: '2024-01-03T14:03:49.171Z',
    __v: 0,
    id: '659569328cee43d1fe23677e',
  },
];

export type EventListType = {
  company_name: any;
  _id: string;
  name: string;
  description: string;
  start_time: any;
  end_time: any;
  time_zone: any;
  poster_images: any[];
  event_date: string;
  venue_city: string;
  venue_country: string;
  venue_zip: string;
  venue_state: string;
  venue_address_line_1: string;
  venue_address_line_2: string;
  delegates: any[];
  exhibitors: any[];
  speakers: any[];
  media_partners: any[];
  sponsors: any[];
  faqs: any[];
  hotels: any[];
  conference_programmes: any[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  featured_image: string;
  id: string;
  start_date: string;
  event_logo: string;
  end_date: string;
};

export const eventListData = [
  {
    _id: '65921fc9e8b58e7bdf1ceafb',
    name: 'mucial event',
    description: 'beauty full mucial event',
    poster_images:
      'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//ea6a36900e77f6781bfca1828571b0e8-e15e8c1c-c425-48b7-8e04-69c7d5296ed7',
    event_date: '2023-12-31T00:00:00.000Z',
    venue_city: 'City',
    venue_country: 'venue_country',
    venue_zip: 'ZIP',
    venue_state: 'State',
    venue_address_line_1: 'address line 1',
    venue_address_line_2: 'address line 2',
    delegates: [],
    exhibitors: [],
    speakers: [],
    media_partners: [],
    faqs: [],
    hotels: [],
    conference_programmes: [],
    status: 'active',
    createdAt: '2024-01-01T02:13:29.875Z',
    updatedAt: '2024-01-01T02:13:29.875Z',
    __v: 0,
    id: '65921fc9e8b58e7bdf1ceafb',
  },
];

export type SpeakerListType = {
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
  is_phone_verified: boolean;
  is_email_verified: boolean;
  speaker_URL: string;
  speaker_linkedin: string;
  events: any[];
  created_by: string;
  schedules: any[];
  status: string;
  user_type: string;
  last_login: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export const speakersListData = [
  {
    _id: '659ff6d6edd6261527603aa1',
    first_name: 'Niten',
    last_name: 'Solanki',
    bio: 'Exhibitor description her',
    avatar: null,
    email: 'nitensolanki02@gmail.com',
    phone: 'phone',
    phone_country_code: 'phone_country_code',
    city: 'city',
    country: 'country',
    zip: 'zip',
    state: 'state',
    address_line_1: 'address_line_1',
    address_line_2: 'address_line_2',
    is_phone_verified: false,
    is_email_verified: false,
    speaker_URL: 'xyz.com',
    speaker_linkedin: 'linkedin.com',
    events: [],
    created_by: null,
    schedules: [],
    status: 'active',
    user_type: 'speaker',
    last_login: null,
    is_online: false,
    createdAt: '2024-01-11T14:10:30.207Z',
    updatedAt: '2024-01-11T14:10:30.207Z',
    __v: 0,
    id: '659ff6d6edd6261527603aa1',
  },
];

export type DelegateListType = {
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
  is_phone_verified: boolean;
  is_email_verified: boolean;
  delegate_URL: string;
  delegate_linkedin: string;
  events: string[];
  job_titles: string[];
  companies: string[];
  delegate_associations: any[];
  created_by: string;
  schedules: any[];
  status: string;
  user_type: string;
  last_login: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export const delegatesListData = [
  {
    _id: '659f260c038f0e3325ac3472',
    first_name: 'Niten',
    last_name: 'Solanki',
    bio: 'Delegate description here',
    avatar:
      'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//4ed75541afba3a0fc332ec6a2d43e473-dd9cead9-8d79-4f2d-9225-2d3a9f2bee1e',
    email: 'nitensolanki1@gmail.com',
    phone: 'phone',
    phone_country_code: 'phone_country_code',
    city: 'city',
    country: 'country',
    zip: 'zip',
    state: 'state',
    address_line_1: 'address_line_1',
    address_line_2: 'address_line_2',
    is_phone_verified: false,
    is_email_verified: false,
    delegate_URL: 'xyz.com',
    delegate_linkedin: 'linkedin.com',
    events: ['659f2595038f0e3325ac346c'],
    job_titles: ['659f2595038f0e3325ac346c'],
    companies: ['659f2595038f0e3325ac346c'],
    delegate_associations: [],
    created_by: null,
    schedules: [],
    status: 'active',
    user_type: 'delegate',
    last_login: null,
    is_online: false,
    createdAt: '2024-01-10T23:19:40.084Z',
    updatedAt: '2024-01-10T23:19:43.645Z',
    __v: 0,
    id: '659f260c038f0e3325ac3472',
  },
];

export type MediaPartnerListType = {
  _id: string;
  first_name: string;
  last_name: string;
  description: string;
  logo: string;
  email: string;
  phone: string;
  phone_country_code: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  mediapartner_URL: string;
  events: string[];
  created_by: string;
  schedules: any[];
  status: string;
  user_type: string;
  last_login: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export const mediaPartnersListData = [
  {
    _id: '65a0106ee5cb3b98cf8ccd7d',
    first_name: 'John',
    last_name: 'Doe',
    description: 'Exhibitor description her',
    logo: 'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//da7e12f311943427f38a2bffe4e1e2cc-d3b0af30-3114-4e77-90b6-3f2746f32650',
    email: 'nitensolanki02@gmail.com',
    phone: 'phone',
    phone_country_code: 'phone_country_code',
    is_phone_verified: false,
    is_email_verified: false,
    mediapartner_URL: 'xyz.com',
    events: [],
    created_by: null,
    schedules: [],
    status: 'active',
    user_type: 'media_partners',
    last_login: null,
    is_online: false,
    createdAt: '2024-01-11T15:59:42.559Z',
    updatedAt: '2024-01-11T15:59:52.581Z',
    __v: 0,
    id: '65a0106ee5cb3b98cf8ccd7d',
  },
];

export type RoleListType = {
  _id: string;
  role_name: string;
  role_description: string;
  status: string;
  permissions: any[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const rolesListData = [
  {
    _id: '6591eede76bfa47de9f004d4',
    role_name: 'Admin',
    role_description: 'For admin users',
    status: 'active',
    permissions: [],
    slug: 'admin',
    createdAt: '2023-12-31T22:44:46.374Z',
    updatedAt: '2023-12-31T22:44:46.374Z',
    __v: 0,
  },
];

export type CompaniesListType = {
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
};
