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
import { EventListType } from '@/eva-components/type/userListType';
import DeleteCompany from './DeleteCompany';

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
    title: <HeaderCell title="name" />,
    dataIndex: 'name',
    key: 'name',
    width: 300,
    render: (_: string, row: any) => (
      <Text className="text-sm">{row?.company_name}</Text>
    ),
  },

  // {
  //   title: <HeaderCell title="Location" />,
  //   dataIndex: 'location',
  //   key: 'location',
  //   width: 250,
  //   render: (_: string, row: any) => (
  //     <Text className="text-sm">{`${row?.city} ${row?.country}`}</Text>
  //   ),
  // },

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
          content={() => 'Edit Company'}
          placement="top"
          color="invert"
        >
          <Link href={routes.companies.editCompanieEvent(row?._id)}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Event'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        {/* <Tooltip
          size="sm"
          content={() => 'View Company'}
          placement="top"
          color="invert"
        >
          <Link href={routes.event.eventDetails(row?._id)}>
          <Link href={''}>
            <ActionIcon size="sm" variant="outline" aria-label={'View Event'}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip> */}
        <DeleteCompany
          title={`Delete the Company`}
          description={`Are you sure you want to delete ${`${row?.company_name}`} ?`}
          id={row?._id}
        />
      </div>
    ),
  },
];
