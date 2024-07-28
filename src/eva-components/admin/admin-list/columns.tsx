'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Progressbar } from '@/components/ui/progressbar';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import { AdminType, ProductType } from '@/data/products-data';
import { PiStarFill } from 'react-icons/pi';
import DeletePopover from '@/app/shared/delete-popover';
import DateFormat from '@/eva-components/DateFormat';
import AdminRole from '../AdminRole';
import DateCell from '@/components/ui/date-cell';
import { STATUSES, type User } from '@/data/users-data';
import DeleteAdmins from './DeleteAdmins';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center capitalize">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
      return (
        <div className="flex items-center capitalize">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );

    case 'active':
      return (
        <div className="flex items-center capitalize">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );

    case 'binned':
      return (
        <div className="flex items-center capitalize">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );

    default:
      return (
        <div className="flex items-center capitalize">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}



type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
 
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 250,
    hidden: 'customer',
    render: (_: string, row: AdminType) => (
      <AvatarCard
        src={getImageUrl(row?.profile_image)}
        name={`${row?.first_name} ${row?.last_name}`}
        // description={row.category}
        avatarProps={{
          name: row.first_name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Email" />,
    dataIndex: 'sku',
    key: 'sku',
    width: 150,
    render: (_: string, row: AdminType) => (
      <Text className="text-sm">{row?.email}</Text>
    ),
  },

  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 150,
    render: (_: string, row: AdminType) => {
      if (row?.phone) {
        return (
          <Text className="text-sm">
            <span>+{row?.phone_country_code}&nbsp;</span>
            <span>{row?.phone}</span>
          </Text>
        );
      } else {
        return <Text className="center text-sm">{`-`}</Text>;
      }
    },
  },

  {
    title: <HeaderCell title="Role" />,
    dataIndex: 'permissions',
    key: 'permissions',
    width: 200,
    render: (_: string, row: AdminType) => (
      <div className="flex flex-wrap items-center gap-2">
        {row?.roles.map((role) => (
          <Badge
            key={role?._id}
            rounded="lg"
            variant="outline"
            className="border-gray-200 font-normal text-gray-500"
          >
            {role?.role_name}
          </Badge>
        ))}
      </div>
    ),
  },

  {
    title: (
      <HeaderCell
        title="Last Login"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },

  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: AdminType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Admin'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.editUser(row?._id, 'admins')}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Admin'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Admin'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.admindetailsview(row?._id)}>
            <ActionIcon size="sm" variant="outline" aria-label={'View Admin'}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeleteAdmins
          title={`Delete the Admin`}
          description={`Are you sure you want to delete ${`${row?.first_name} ${row?.last_name}`} admin ?`}
          admin_id={row?._id}
        />
      </div>
    ),
  },
];
