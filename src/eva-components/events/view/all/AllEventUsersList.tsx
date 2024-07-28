'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { Button } from '@/components/ui/button';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from './columns';
import ResponseCodes from 'utils/response-codes';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';

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

const AllEventUsersList = ({
  data = [],
  loading,
  type,
  totalDocs,
  paginationHandler,
  perPageCount,
  resetCurrentPage,
}: {
  data: any[];
  loading?: boolean;
  type: string;
  totalDocs: number;
  paginationHandler: any;
  perPageCount: number;
  resetCurrentPage: boolean;
}) => {
  const [pageSize, setPageSize] = useState(perPageCount);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    listData: [],
    isLoadingDelete: false,
  });

  const [sendingEventInvitation, setSendingEventInvitation] = useState(false);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  // const onDeleteItem = useCallback((id: string) => {
  //
  //   // handleDelete(id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onDeleteItem = (id: string) => {
    // getEventParamsDetails
  };

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
  } = useTable(data, pageSize, filterState, resetCurrentPage);

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
        type,
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

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  const onChangePaginate = (page: number) => {
    handlePaginate(page);
    paginationHandler(page);
  };

  const sendEventInviteToSelectedUsers = async () => {
    let pathnameArray = pathname.split('/');
    let type = pathnameArray[3];
    let eventId = pathnameArray[2];

    setSendingEventInvitation(true);

    let res = await EventsApiServices.SendInvite(
      { user_ids: selectedRowKeys },
      type,
      eventId
    );

    if (res?.response_code === ResponseCodes.SUCCESS) {
      toast.success('Invitation send successfully.');
      setTimeout(() => {
        dispatch(eventAction?.setResetEventUsersList());
      }, 2000);
    } else if (res?.response_code === ResponseCodes.FAILED) {
      toast.error(res?.data?.message);
    } else if (res?.response_code === ResponseCodes.NOT_FOUND) {
      toast.error(res?.data?.message);
    } else {
      toast.error('Internal server error!');
    }

    setSendingEventInvitation(false);
    setSelectedRowKeys([]);
  };

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
          pageSize: perPageCount,
          // setPageSize,
          total: totalDocs,
          current: currentPage,
          onChange: (page: number) => onChangePaginate(page),
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
        // filterElement={
        //   <FilterElement
        //     filters={filters}
        //     isFiltered={isFiltered}
        //     updateFilter={updateFilter}
        //     handleReset={handleReset}
        //   />
        // }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {}}
          >
            <Button
              isLoading={sendingEventInvitation}
              onClick={() => sendEventInviteToSelectedUsers()}
              size="sm"
              className="dark:bg-gray-300 dark:text-gray-800"
            >
              Send Invite To {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Users' : 'User'}
            </Button>
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
};

export default AllEventUsersList;
