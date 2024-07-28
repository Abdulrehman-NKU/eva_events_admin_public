'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Progressbar } from '@/components/ui/progressbar';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import { PiStarFill } from 'react-icons/pi';
import { ICategoryData } from '@/eva-components/type/api.types';
import DeleteIndustry from './DeleteIndustry';
import IndustryEditButton from '../edit/IndustryEditButton';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  onDeleteSuccess: () => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  onDeleteSuccess,
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
    title: <HeaderCell title="Industry" />,
    dataIndex: 'category_name',
    key: 'category_name',
    width: 400,
    render: (_: string, row: ICategoryData) => (
      <Text className="text-sm">{row?.category_name}</Text>
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: ICategoryData) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <IndustryEditButton rowData={row} />
        {/* <Tooltip
          size="sm"
          content={() => 'View industry'}
          placement="top"
          color="invert"
        >
          <Link href={''}>
            <ActionIcon size="sm" variant="outline" aria-label={'View Event'}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip> */}

        <DeleteIndustry
          title={`Delete the industry`}
          description={`Are you sure you want to delete ${row?.category_name} industry?`}
          event_id={row?._id}
          onDelete={onDeleteSuccess}
        />
      </div>
    ),
  },
];
