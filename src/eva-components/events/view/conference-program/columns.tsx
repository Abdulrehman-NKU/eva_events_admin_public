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
import DateAndTime from './DateAndTime';
import { HeaderCell } from './table';
import DeleteConferenceProgram from './DeleteConferenceProgram';
import EditButton from './EditButton';
import GetTimeConferenceProgram from './GetTimeConferenceProgram';
import ConferenceProgramAvatarCard from './ConferenceProgramAvatarCard';

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
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems?.length === data?.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
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
    title: (
      <HeaderCell
        title="Time"
        // sortable
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
      <GetTimeConferenceProgram
        time_from={row?.time_from}
        time_to={row?.time_to}
      />
    ),
  },

  {
    title: <HeaderCell title="Event Programme" />,
    dataIndex: 'Event Programme',
    key: 'Event Programme',
    width: 200,
    render: (_: string, row: any) => (
      <Text className="text-sm">{row?.title}</Text>
    ),
  },

  {
    title: <HeaderCell title="Sponsored by" />,
    dataIndex: 'Sponsored by',
    key: 'Sponsored by',
    width: 250,
    hidden: 'customer',
    render: (_: string, row: any) => (
      <ConferenceProgramAvatarCard usersList={row?.sponsors} />
    ),
  },

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
        <EditButton id={row?._id} />
        <Tooltip
          size="sm"
          content={() => 'View Conference program'}
          placement="top"
          color="invert"
        >
          {/* <Link href={routes.user.admindetailsview(row?._id)}> */}
          <Link
            href={routes.event.conferenceProgramsEventView(
              row?.events[0],
              row?._id,
              'details'
            )}
          >
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'View Conference program'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeleteConferenceProgram
          title={`Delete the Conference program`}
          description={`Are you sure you want to delete this conference program ?`}
          id={row?._id}
        />
      </div>
    ),
  },
];
