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
import { EventType } from '@/data/event-data';
import { EventListType } from '@/eva-components/type/userListType';
import StatusBadge from '@/eva-components/StatusBadge';
import DeleteEvents from './DeleteEvents';
import { FaRegCalendarAlt } from 'react-icons/fa';
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
  //   title: <HeaderCell title="Event Image" />,
  //   dataIndex: 'eventimage',
  //   key: 'eventimage',
  //   width: 300,
  //   hidden: 'customer',
  //   render: (_: string, row: EventListType) => (
  //     <div>
  //       {row?.poster_images.map((posterImage: string, index: number) => (
  //         <AvatarCard
  //           key={index}
  //           src={posterImage}
  //           name={row?.description}
  //           avatarProps={{
  //             name: row.name,
  //             size: 'lg',
  //             className: 'rounded-lg',
  //           }}
  //         />
  //       ))}
  //     </div>
  //   ),
  // },

  {
    title: <HeaderCell title="Event Name" />,
    dataIndex: 'eventimage',
    key: 'eventimage',
    width: 200,
    hidden: 'customer',
    render: (_: string, row: EventListType) => (
      <AvatarCard
        src={getImageUrl(row?.featured_image)}
        name={row?.name}
        // description={row.category}
        avatarProps={{
          name: row.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
        event_id={row?._id}
      />
    ),
  },

  // {
  //   title: <HeaderCell title="Event Name" />,
  //   dataIndex: 'name',
  //   key: 'name',
  //   width: 150,
  //   render: (_: string, row: EventListType) => (
  //     <Text className="text-sm">{row?.name}</Text>
  //   ),
  // },

  {
    title: (
      <HeaderCell
        title="Start Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'event_date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('event_date'),
    dataIndex: 'event_date',
    key: 'event_date',
    width: 250,
    render: (_: string, row: EventListType) => (
      <DateCell date={new Date(row?.start_date)} hideTime={true} />
    ),
  },

  {
    title: (
      <HeaderCell
        title="End Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'event_date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('event_date'),
    dataIndex: 'event_date',
    key: 'event_date',
    width: 250,
    render: (_: string, row: EventListType) => (
      <DateCell date={new Date(row?.end_date)} hideTime={true} />
    ),
  },

  // {
  //   title: <HeaderCell title="Delegates" />,
  //   dataIndex: 'delegates',
  //   key: 'delegates',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: EventListType) => (
  //     <Text className="text-sm">{row?.delegates?.length}</Text>
  //   ),
  // },

  // {
  //   title: <HeaderCell title="Exhibitors" />,
  //   dataIndex: 'exhibitors',
  //   key: 'exhibitors',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: EventListType) => (
  //     <Text className="text-sm">{row?.exhibitors?.length}</Text>
  //   ),
  // },

  // {
  //   title: <HeaderCell title="Speakers" />,
  //   dataIndex: 'speakers',
  //   key: 'speakers',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: EventListType) => (
  //     <Text className="text-sm">{row?.speakers?.length}</Text>
  //   ),
  // },

  // // {
  // //   title: <HeaderCell title="Sponsors" />,
  // //   dataIndex: 'sponsors',
  // //   key: 'sponsors',
  // //   width: 200,
  // //   hidden: 'customer',
  // //   render: (_: string, row: EventListType) => {
  // //      ;
  // //   },
  // // },

  // {
  //   title: <HeaderCell title="Media partners" />,
  //   dataIndex: 'media-partners',
  //   key: 'media-partners',
  //   width: 250,
  //   hidden: 'customer',
  //   render: (_: string, row: EventListType) => (
  //     <Text className="text-sm">{row?.media_partners?.length}</Text>
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
    render: (_: string, row: EventListType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Event Date'}
          placement="top"
          color="invert"
        >
          <Link href={routes.event.editEvent(row?._id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Event Date'}
            >
              <FaRegCalendarAlt className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'Manage Event Details'}
          placement="top"
          color="invert"
        >
          <Link href={routes.event.eventDetails(row?._id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Manage Event Details'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeleteEvents
          title={`Delete the event`}
          description={`Are you sure you want to delete ${row?.name} event ?`}
          event_id={row?._id}
          deleteEventName={row?.name}
        />
      </div>
    ),
  },
];
