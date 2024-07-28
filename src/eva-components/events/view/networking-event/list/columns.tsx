'use client';

import Link from 'next/link';

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
// import AdminRole from '../AdminRole';
import DateCell from '@/components/ui/date-cell';
import { STATUSES, type User } from '@/data/users-data';
import DeleteAdmins from '@/eva-components/admin/admin-list/DeleteAdmins';
import DeleteNetworkingEvent from './DeleteNetworkingEvent';
import { HeaderCell } from '../../conference-program/table';
import DateAndTime from '../../conference-program/DateAndTime';
import NetworkingEventDateAndTime from './NetworkingEventDateAndTime';

// import DeleteAdmins from './DeleteAdmins';

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
  //   title: <HeaderCell title="Name" />,
  //   dataIndex: 'name',
  //   key: 'name',
  //   width: 250,
  //   hidden: 'customer',
  //   render: (_: string, row: AdminType) => (
  //     <AvatarCard
  //       src={row?.profile_image}
  //       name={`${row?.first_name} ${row?.last_name}`}
  //       // description={row.category}
  //       avatarProps={{
  //         name: row.first_name,
  //         size: 'lg',
  //         className: 'rounded-lg',
  //       }}
  //     />
  //   ),
  // },
  {
    title: <HeaderCell title="name" />,
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: (_: string, row: any) => (
      <Text className="text-sm">{row?.event_name}</Text>
    ),
  },

  {
    title: (
      <HeaderCell
        title="Date & Time"
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
    render: (value: Date, row: any) => (
      <NetworkingEventDateAndTime
        date={row?.date}
        startTime={row?.start_time}
        endTime={row?.end_time}
      />
    ),
  },

  // {
  //   title: <HeaderCell title="Delegates" extension="Attendee" align="center" />,
  //   dataIndex: 'attendee-delegates',
  //   key: 'attendee-delegates',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: any) => (
  //     <Text className="text-center text-sm">{row?.delegates?.length || 0}</Text>
  //   ),
  // },
  // {
  //   title: (
  //     <HeaderCell title="Exhibitors" extension="Attendee" align="center" />
  //   ),
  //   dataIndex: 'attendee-exhibitors',
  //   key: 'attendee-exhibitors',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: any) => (
  //     <Text className="text-center text-sm">
  //       {row?.exhibitors?.length || 0}
  //     </Text>
  //   ),
  // },
  // {
  //   title: <HeaderCell title="Speakers" extension="Attendee" align="center" />,
  //   dataIndex: 'attendee-speakers',
  //   key: 'attendee-speakers',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: any) => (
  //     <Text className="text-center text-sm">{row?.speakers?.length || 0}</Text>
  //   ),
  // },
  // {
  //   title: (
  //     <HeaderCell
  //       title={`Media-partners`}
  //       extension="Attendee"
  //       align="center"
  //     />
  //   ),
  //   dataIndex: 'attendee-media-partners',
  //   key: 'attendee-media-partners',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: any) => (
  //     <Text className="text-center text-sm">
  //       {row?.media_partners?.length || 0}
  //     </Text>
  //   ),
  // },
  // {
  //   title: <HeaderCell title="Sponsors" extension="Attendee" align="center" />,
  //   dataIndex: 'attendee-sponsors',
  //   key: 'attendee-sponsors',
  //   width: 200,
  //   hidden: 'customer',
  //   render: (_: string, row: any) => (
  //     <Text className="text-center text-sm">{row?.sponsors?.length || 0}</Text>
  //   ),
  // },
  // {
  //   title: <HeaderCell title="Email" />,
  //   dataIndex: 'sku',
  //   key: 'sku',
  //   width: 150,
  //   render: (_: string, row: AdminType) => (
  //     <Text className="text-sm">{row?.email}</Text>
  //   ),
  // },

  // {
  //   title: <HeaderCell title="Phone" />,
  //   dataIndex: 'phone',
  //   key: 'phone',
  //   width: 150,
  //   render: (_: string, row: AdminType) => {
  //     if (row?.phone) {
  //       return (
  //         <Text className="text-sm">
  //           <span>+{row?.phone_country_code}&nbsp;</span>
  //           <span>{row?.phone}</span>
  //         </Text>
  //       );
  //     } else {
  //       return <Text className="center text-sm">{`-`}</Text>;
  //     }
  //   },
  // },

  // {
  //   title: <HeaderCell title="Role" />,
  //   dataIndex: 'permissions',
  //   key: 'permissions',
  //   width: 200,
  //   render: (_: string, row: AdminType) => (
  //     <div className="flex flex-wrap items-center gap-2">
  //       {row?.roles.map((role) => (
  //         <Badge
  //           key={role?._id}
  //           rounded="lg"
  //           variant="outline"
  //           className="border-gray-200 font-normal text-gray-500"
  //         >
  //           {role?.role_name}
  //         </Badge>
  //       ))}
  //     </div>
  //   ),
  // },

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
          content={() => 'Edit Networking Event'}
          placement="top"
          color="invert"
        >
          <Link href={routes.event.editNetworkingEvent(row?._id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Networking Event'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Networking Event'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.event.networkingEventView(
              row?.events[0],
              row?._id,
              'details'
            )}
          >
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'View Networking Event'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeleteNetworkingEvent
          title={`Delete the networking event`}
          description={`Are you sure you want to delete this networking event ?`}
          id={row?._id}
        />
      </div>
    ),
  },
];
