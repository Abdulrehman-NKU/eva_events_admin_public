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
import { PiStarFill } from 'react-icons/pi';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import StatusBadge from '@/eva-components/StatusBadge';
import { ExhibitorType } from '@/eva-components/type/userListType';
import DeleteExhibitor from './DeleteExhibitor';
import Constatnts from '@/eva-components/constatnt';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

// get stock status
function getStockStatus(status: number) {
  if (status === 0) {
    return (
      <>
        <Progressbar
          value={status}
          color="danger"
          label={'out of stock'}
          className="h-1.5 w-24 bg-red/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">out of stock </Text>
      </>
    );
  } else if (status <= 20) {
    return (
      <>
        <Progressbar
          value={status}
          color="warning"
          label={'low stock'}
          className="h-1.5 w-24 bg-orange/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} low stock
        </Text>
      </>
    );
  } else {
    return (
      <>
        <Progressbar
          value={status}
          color="success"
          label={'stock available'}
          className="h-1.5 w-24 bg-green/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} in stock
        </Text>
      </>
    );
  }
}

// get rating calculation
function getRating(rating: number[]) {
  let totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  let review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      <span className="me-1 shrink-0">{review.toFixed(1)}</span>
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="w-4 fill-orange text-orange" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}{' '}
      <span className="ms-1 shrink-0">({totalRating})</span>
    </div>
  );
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
  // {
  //   title: (
  //     <div className="ps-3.5">
  //       <Checkbox
  //         title={'Select All'}
  //         onChange={handleSelectAll}
  //         checked={checkedItems.length === data.length}
  //         className="cursor-pointer"
  //       />
  //     </div>
  //   ),
  //   dataIndex: 'checked',
  //   key: 'checked',
  //   width: 30,
  //   render: (_: any, row: any) => (
  //     <div className="inline-flex ps-3.5">
  //       <Checkbox
  //         className="cursor-pointer"
  //         checked={checkedItems.includes(row.id)}
  //         {...(onChecked && { onChange: () => onChecked(row.id) })}
  //       />
  //     </div>
  //   ),
  // },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 250,
    hidden: 'customer',
    render: (_: string, row: ExhibitorType) => (
      <AvatarCard
        src={getImageUrl(row?.exhibitor_logo)}
        name={`${row?.exhibitor_name ?? row?.first_name}`}
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
    dataIndex: 'email',
    key: 'email',
    width: 200,
    render: (_: string, row: ExhibitorType) => (
      <Text className="text-sm">{row?.email}</Text>
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (_: string, row: ExhibitorType) => {
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
  // {
  //   title: <HeaderCell title="Events" />,
  //   dataIndex: 'events',
  //   key: 'events',
  //   width: 150,
  //   hidden: 'customer',
  //   render: (_: string, row: ExhibitorType) => (
  //     <Text className="text-sm">{row?.events?.length}</Text>
  //   ),
  // },

  // {
  //   title: (
  //     <HeaderCell
  //       title="Last Login"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'last_login'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('last_login'),
  //   dataIndex: 'last_login',
  //   key: 'last_login',
  //   width: 250,
  //   render: (_: string, row: ExhibitorType) => (
  //     <DateCell date={new Date(row?.last_login)} />
  //   ),
  // },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => <StatusBadge status={value} />,
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: ExhibitorType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Exhibitor'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.editUser(row?._id, Constatnts?.exhibitors)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Exhibitor'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Exhibitor'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.exhibitordetailsview(row._id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'View Exhibitor'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeleteExhibitor
          title={`Delete the exhibitor`}
          description={`Are you sure you want to delete ${`${row?.first_name} ${row?.last_name}`} exhibitor ?`}
          user_id={row?._id}
        />
      </div>
    ),
  },
];
