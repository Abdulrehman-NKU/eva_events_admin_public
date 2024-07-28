'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { getColumns } from './columns';
import IndustriesEditModal from '../edit/IndustriesEditModal';
import ControlledTable from '@/eva-components/roles-permissions/staff-permissions';
const FilterElement = dynamic(
  () => import('@/app/shared/ecommerce/product/product-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  status: '',
};

export default function IndustryListPage({
  data = [],
  loading,
  handleDeleteSuccess,
  handlePagination,
  paginationState = {
    limit: 10,
    page: 1,
    totalRecords: 0,
  },
}: {
  data: any[];
  loading: boolean;
  handleDeleteSuccess: () => void;
  handlePagination: ({ page, limit }: { page: any; limit: any }) => void;
  paginationState: {
    limit: number;
    page: number;
    totalRecords: number;
  };
}) {
  const [pageSize, setPageSize] = useState(paginationState.limit);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    // handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        onDeleteSuccess: handleDeleteSuccess,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const handlePaginationChange = ({
    limit,
    page,
  }: {
    limit: any;
    page: any;
  }) => {
    handlePagination({
      page,
      limit,
    });
  };

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <>
      <ControlledTable
        variant="modern"
        isLoading={loading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: paginationState.limit,
          setPageSize: (size) => {
            handlePaginationChange({
              limit: size,
              page: 1,
            });
          },
          total: paginationState.totalRecords,
          current: paginationState.page,
          onChange: (page: number) => {
            handlePaginationChange({
              limit: paginationState.limit,
              page: page,
            });
          },
        }}
        // filterOptions={{
        //   searchTerm,
        //   onSearchClear: () => {
        //     handleSearch('');
        //   },
        //   onSearchChange: (event) => {
        //     handleSearch(event.target.value);
        //   },
        //   hasSearched: isFiltered,
        //   hideIndex: 1,
        //   columns,
        //   checkedColumns,
        //   setCheckedColumns,
        //   enableDrawerFilter: true,
        // }}
        filterElement={
          <FilterElement
            filters={filters}
            isFiltered={isFiltered}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        // tableFooter={
        //   <TableFooter
        //     checkedItems={selectedRowKeys}
        //     handleDelete={(ids: string[]) => {
        //       setSelectedRowKeys([]);
        //       // handleDelete(ids);
        //     }}
        //   >
        //     <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
        //       Download {selectedRowKeys.length}{' '}
        //       {selectedRowKeys.length > 1 ? 'Products' : 'Product'}
        //     </Button>
        //   </TableFooter>
        // }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />

      <IndustriesEditModal />
    </>
  );
}
