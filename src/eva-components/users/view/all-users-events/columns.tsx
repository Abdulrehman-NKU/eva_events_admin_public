'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
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
import { Button } from '@/components/ui/button';
import DateCell from '@/components/ui/date-cell';
import EventInvitationBadge from '../EventInvitationBadge';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';
// get status badge

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
    title: (
      <HeaderCell
        title="Name"
        className="inline-block max-w-[150px] overflow-hidden whitespace-nowrap"
      />
    ),
    dataIndex: 'name',
    key: 'name',
    width: 150,
    hidden: 'customer',
    render: (_: string, row: any) => (
      <AvatarCard
        src={getImageUrl(row?.featured_image)}
        name={row?.name}
        avatarProps={{
          name: row.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },

  // {
  //   title: (
  //     <HeaderCell
  //       title="Date"
  //       className="inline-block max-w-[100px] overflow-hidden whitespace-nowrap"
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('event_date'),
  //   dataIndex: 'event_date',
  //   key: 'event_date',
  //   width: 100,
  //   render: (_: string, row: any) => (
  //     <DateCell date={new Date(row?.event_date)} hideTime={true} />
  //   ),
  // },
  {
    title: (
      <HeaderCell
        title="Start Date"
        className="inline-block max-w-[100px] overflow-hidden whitespace-nowrap"
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'event_date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('event_date'),
    dataIndex: 'event_date',
    key: 'event_date',
    width: 150,
    render: (_: string, row: any) => (
      <DateCell date={new Date(row?.start_date)} hideTime={true} />
    ),
  },

  {
    title: (
      <HeaderCell
        title="End Date"
        className="inline-block max-w-[100px] overflow-hidden whitespace-nowrap"
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'event_date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('event_date'),
    dataIndex: 'event_date',
    key: 'event_date',
    width: 150,
    render: (_: string, row: any) => (
      <DateCell date={new Date(row?.end_date)} hideTime={true} />
    ),
  },


  {
    title: <HeaderCell title="invitation" />,
    dataIndex: 'Invitation',
    key: 'invitation',
    width: 120,
    render: (value: string, row: any) => (
      <EventInvitationBadge event_id={row?._id} />
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'View event'}
          placement="top"
          color="invert"
        >
          <Link href={routes?.event?.eventDetails(row?._id)}>
            <ActionIcon size="sm" variant="outline" aria-label={'View event'}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        {/* <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.id} product?`}
          onDelete={() => onDeleteItem(row._id)}
        /> */}
      </div>
    ),
  },
];
