'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DeletePopover from './delete-popover';
import {
  ICategoryData,
  ICompanyData,
  IUser,
} from '@/eva-components/type/api.types';

const getLogo = (data: any, type: string) => {
  switch (type) {
    case 'exhibitors':
      return data?.exhibitor_logo;
      break;
    case 'sponsors':
      return data?.sponsor_logo;
      break;
    case 'speakers':
      return data?.avatar;
      break;
    case 'delegates':
      return data?.avatar;
      break;
    case 'media-partners':
      return data?.logo;
      break;
  }
};

const getName = (data: any, type: string) => {
  switch (type) {
    case 'exhibitors':
      return `${data?.first_name} ${data?.last_name}`;
      break;
    case 'sponsors':
      return data?.sponsor_name;
      break;
    case 'speakers':
      return `${data?.first_name} ${data?.last_name}`;
      break;
    case 'delegates':
      return `${data?.first_name} ${data?.last_name}`;
      break;
    case 'media-partners':
      return `${data?.first_name} ${data?.last_name}`;
      break;
  }
};

// const getLogo = (data: any, type: string) => {
//   switch (type) {
//     case 'exhibitors':
//       return data?.exhibitor_logo;
//       break;
//     case 'sponsors':
//       return data?.sponsor_logo;
//       break;
//     case 'speakers':
//       return data?.avatar;
//       break;
//     case 'delegates':
//       return data?.avatar;
//       break;
//     case 'media-partners':
//       return data?.logo;
//       break;
//   }
// };

// const getUrl = (data: any, type: string) => {
//   switch (type) {
//     case 'exhibitors':
//       return data?.exhibitor_URL;
//       break;
//     case 'sponsors':
//       return data?.sponsor_URL;
//       break;
//     case 'speakers':
//       return data?.speaker_URL;
//       break;
//     case 'delegates':
//       return data?.delegate_URL;
//       break;
//     case 'media-partners':
//       return data?.mediapartner_URL;
//       break;
//   }
// };

// const getLinkedinUrl = (data: any, type: string) => {
//   switch (type) {
//     case 'speakers':
//       return data?.speaker_linkedin;
//       break;
//     case 'delegates':
//       return data?.delegate_linkedin;
//       break;
//   }
// };

// let getColumUrlHead = (type: string) => {
//   let urlTitle = `${type} URL`;

//   if (type === 'media-partners') {
//     urlTitle = 'URL';
//   }

//   if (type !== 'delegates') {
//     return {
//       title: <HeaderCell title={urlTitle} />,
//       dataIndex: 'email',
//       key: 'email',
//       width: 150,
//       render: (_: string, row: any) => <UserUrl url={getUrl(row, type)} />,
//     };
//   } else {
//     return {};
//   }
// };

// let getColumLinkedinUrlHead = (type: string) => {
//   if (type === 'delegates' || type === 'speakers') {
//     return {
//       title: <HeaderCell title="Linkedin" />,
//       dataIndex: 'email',
//       key: 'email',
//       width: 150,
//       render: (_: string, row: any) => (
//         <UserUrl url={getLinkedinUrl(row, type)} />
//       ),
//     };
//   } else {
//     return {};
//   }
// };

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  type: string;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  type,
}: Columns) => [
 
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'product',
    key: 'product',
    width: 200,
    hidden: 'customer',
    render: (_: string, row: any) => (
      <AvatarCard
        src={getLogo(row, type)}
        name={getName(row, type)}
        avatarProps={{
          name: getName(row, type),
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Company" />,
    dataIndex: 'company',
    key: 'company',
    width: 200,
    render: (_: string, row: IUser) => (
      <Text className="text-sm">{row?.company?.company_name}</Text>
    ),
  },

  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 200,
    render: (_: string, row: IUser) => (
      <Text className="text-sm">{row?.category?.category_name}</Text>
    ),
  },

  {
    title: <HeaderCell title="Country" />,
    dataIndex: 'email',
    key: 'email',
    width: 200,
    render: (_: string, row: any) => (
      <Text className="text-sm">{row?.country}</Text>
    ),
  },

  // getColumUrlHead(type),
  // getColumLinkedinUrlHead(type),

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {/* <Tooltip
          size="sm"
          content={() => 'Edit Asigned user'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.editUser(row?._id, type)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Asigned user'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip> */}
        <Tooltip
          size="sm"
          content={() => 'View Asigned user'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.userDetailsViewViaEvent(type, row?._id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'View Asigned user'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        {/* <DeletePopover
          title={`Remove your asigned user`}
          description={`Are you sure you want to remove this # ${getName(
            row,
            type
          )} ?`}
          user_id={row?._id}
          // onDelete={() => onDeleteItem(row?._id)}
          onDelete={() => {}}
        /> */}
      </div>
    ),
  },
];
