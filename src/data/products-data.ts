export type roles = {
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
  roles: roles[];
  last_login: string;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export const adminsData = [
  {
    _id: '6591f56b526fd834114cc031',
    first_name: 'Niten',
    last_name: 'Solanki',
    phone: '',
    email: 'nitensolanki01@gmail.com',
    phone_country_code: '',
    profile_image:
      'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//bb3ad16071071de0f63a8c2b392ac1a2-7b09c7f0-c099-4097-b7e4-0264c2acb0c4',
    is_phone_verified: false,
    is_email_verified: false,
    created_by: null,
    status: 'pending',
    user_type: 'admin',
    roles: [
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
    ],
    last_login: null,
    is_online: false,
    createdAt: '2023-12-31T23:12:43.784Z',
    updatedAt: '2023-12-31T23:12:54.642Z',
    __v: 0,
    id: '6591f56b526fd834114cc031',
  },
  {
    _id: '6591f56b526fd834114cc031',
    first_name: 'Niten',
    last_name: 'Solanki',
    phone: '12345678',
    email: 'nitensolanki01@gmail.com',
    phone_country_code: '91',
    profile_image:
      'https://mylo-global-dev-storage.s3.amazonaws.com/attachments/avatars//bb3ad16071071de0f63a8c2b392ac1a2-7b09c7f0-c099-4097-b7e4-0264c2acb0c4',
    is_phone_verified: false,
    is_email_verified: false,
    created_by: null,
    status: 'active',
    user_type: 'admin',
    roles: [
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
      {
        _id: '6591eede76bfa47de9f004d5',
        role_name: 'Admin',
        role_description: 'For admin users',
        status: 'active',
        permissions: [],
        slug: 'admin',
        createdAt: '2023-12-31T22:44:46.374Z',
        updatedAt: '2023-12-31T22:44:46.374Z',
        __v: 0,
      },
      {
        _id: '6591eede76bfa47de9f004d6',
        role_name: 'Admin',
        role_description: 'For admin users',
        status: 'active',
        permissions: [],
        slug: 'admin',
        createdAt: '2023-12-31T22:44:46.374Z',
        updatedAt: '2023-12-31T22:44:46.374Z',
        __v: 0,
      },
      {
        _id: '6591eede76bfa47de9f004d6',
        role_name: 'Admin',
        role_description: 'For admin users',
        status: 'active',
        permissions: [],
        slug: 'admin',
        createdAt: '2023-12-31T22:44:46.374Z',
        updatedAt: '2023-12-31T22:44:46.374Z',
        __v: 0,
      },
      {
        _id: '6591eede76bfa47de9f004d6',
        role_name: 'Admin',
        role_description: 'For admin users',
        status: 'active',
        permissions: [],
        slug: 'admin',
        createdAt: '2023-12-31T22:44:46.374Z',
        updatedAt: '2023-12-31T22:44:46.374Z',
        __v: 0,
      },
      {
        _id: '6591eede76bfa47de9f004d6',
        role_name: 'Admin',
        role_description: 'For admin users',
        status: 'active',
        permissions: [],
        slug: 'admin',
        createdAt: '2023-12-31T22:44:46.374Z',
        updatedAt: '2023-12-31T22:44:46.374Z',
        __v: 0,
      },
    ],
    last_login: null,
    is_online: false,
    createdAt: '2023-12-31T23:12:43.784Z',
    updatedAt: '2023-12-31T23:12:54.642Z',
    __v: 0,
    id: '6591f56b526fd834114cc032',
  },
];

export type ExhibitorType = {
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
  is_phone_verified: false;
  is_email_verified: false;
  exhibitor_URL: string;
  events: any[];
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

// export type ProductType = {
//   id: string;
//   name: string;
//   category: string;
//   image: string;
//   sku: string;
//   stock: number;
//   price: string;
//   status: string;
//   rating: number[];
// };

// export const productsData = [
//   {
//     id: '0o02051402',
//     name: 'Tasty Metal Shirt',
//     category: 'Books',
//     image:
//       'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
//     sku: '52442',
//     stock: 0,
//     price: '410.00',
//     status: 'Pending',
//     rating: [4, 5, 3, 2],
//   },
// ];

export type ProductType = {
  id: string;
  name: string;
  category: string;
  image: string;
  sku: string;
  stock: number;
  price: string;
  status: string;
  rating: number[];
  email: string;
  url: string;
  sendemail: string;
  sendinvite: string;
  linkedIn: string;
  event:string;
  date: string,
};

export const productsData = [
  {
    id: '0o02051402',
    name: 'Tasty Metal Shirt',
    category: 'Books',
    image:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
    sku: '52442',
    stock: 0,
    price: '410.00',
    status: 'Pending',
    rating: [4, 5, 3, 2],
    email: 'admin01@gmail.com',
    url: 'https://www.example.com/random-page',
    sendemail: 'Send Email',
    sendinvite: 'Send Invite',
    linkedIn: 'linkedin.com',
    event: "Remove Event",
    date: null,
  },
  {
    id: '0o02051402',
    name: 'Tasty Metal Shirt',
    category: 'Books',
    image:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
    sku: '52442',
    stock: 0,
    price: '410.00',
    status: 'Pending',
    rating: [4, 5, 3, 2],
    email: 'admin01@gmail.com',
    url: 'https://www.example.com/random-page',
    sendemail: 'Send Email',
    sendinvite: 'Send Invite',
    linkedIn: 'linkedin.com',
    event: "Remove Event",
    date: null,
  },
];
