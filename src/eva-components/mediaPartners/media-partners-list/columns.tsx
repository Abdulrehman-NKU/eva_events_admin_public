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
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import StatusBadge from '@/eva-components/StatusBadge';
import { MediaPartnerListType } from '@/eva-components/type/userListType';
import DeleteMediaPartner from './DeleteMediaPartner';
import Constatnts from '@/eva-components/constatnt';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

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
    width: 400,
    hidden: 'customer',
    render: (_: string, row: MediaPartnerListType) => (
      <AvatarCard
        src={getImageUrl(row?.logo)}
        name={`${row?.first_name} ${row?.last_name}`}
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
    render: (_: string, row: MediaPartnerListType) => (
      <Text className="text-sm">{row?.email}</Text>
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (_: string, row: MediaPartnerListType) => {
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
  //   render: (_: string, row: MediaPartnerListType) => (
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
  //   render: (_: string, row: MediaPartnerListType) => (
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
    render: (_: string, row: MediaPartnerListType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Media-partner'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.user.editUser(row?._id, Constatnts?.mediaPartners)}
          >
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Media-partner'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Media-partner'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.mediaPartnerdetailsview(row?._id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'View Media-partner'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeleteMediaPartner
          title={`Delete the media-partner`}
          description={`Are you sure you want to delete ${`${row?.first_name} ${row?.last_name}`} media partner ?`}
          user_id={row?._id}
        />
      </div>
    ),
  },
];