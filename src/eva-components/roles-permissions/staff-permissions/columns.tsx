'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import PencilIcon from '@/components/icons/pencil';
import ReactHtmlParser from 'react-html-parser';
import DeleteRole from './DeletePermission';
import DeletePermission from './DeletePermission';
import EditPermissionButton from './EditPermissionButton';

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
    title: <HeaderCell title="Permission" />,
    dataIndex: 'Permission',
    key: 'Permission',
    width: 100,

    render: (_: string, row: any) => (
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          key={row?._id}
          rounded="lg"
          variant="outline"
          className="border-gray-200 font-normal text-gray-500"
        >
          {row?.name}
        </Badge>
      </div>
    ),
  },

  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'role_description',
    key: 'role_description',
    width: 150,
    render: (_: string, row: any) => (
      <Text className="text-sm">
        {ReactHtmlParser(row?.description || '-')}
      </Text>
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
        <EditPermissionButton editData={row as any} />
        <DeletePermission
          title={`Delete the Permission`}
          description={`Are you sure you want to delete this ${`${row?.name} `} Permission ?`}
          admin_id={row?._id}
        />
      </div>
    ),
  },
];
