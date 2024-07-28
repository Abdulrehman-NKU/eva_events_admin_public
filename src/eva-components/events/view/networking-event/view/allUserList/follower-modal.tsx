import { useEffect, useState } from 'react';
import { Title, Text } from '@/components/ui/text';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SimpleBar from '@/components/ui/simplebar';
import { ExhibitorType } from '@/eva-components/type/userListType';
import Spinner from '@/components/ui/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../../../redux/slice/event';
import { Empty } from 'rizzui';

export default function FollowerModal({
  data,
  isLoading,
  type,
}: {
  data: any;
  isLoading: boolean;
  type: string;
}) {
  console.log('follower-modal>>>', data);

  return (
    <>
      <SimpleBar className="-mr-3 h-[400px] pr-3 md:h-[450px]">
        {isLoading ? (
          <div
            className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center"
            style={{ height: 423 }}
          >
            <Spinner size="xl" />
            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Loading...
            </Title>
          </div>
        ) : data.length === 0 ? (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Data</Text>
          </div>
        ) : (
          data?.map((item: any) => (
            <FollowerRow row={item} key={item._id} type={type} />
          ))
        )}
      </SimpleBar>
    </>
  );
}

function FollowerRow({ row, type }: { row: any; type: string }) {
  const [state, setState] = useState({
    button: false,
    buttonType: 'Add',
    rowData: row,
  });

  const dispatch = useDispatch();

  const addUsersIdArray = useSelector(
    (state: any) => state?.event?.addUsersIdArray
  );

  console.log('row>>>', row);

  const getName = (data: any, type: string) => {
    switch (type) {
      case 'exhibitors':
        return `${data?.first_name} ${data?.last_name}`;
        break;
      case 'sponsors':
        return data?.sponsor_name;
        break;
      case 'speakers':
        return `${data?.first_name} ${data?.last_name}`;
        break;
      case 'delegates':
        return `${data?.first_name} ${data?.last_name}`;
        break;
      case 'media-partners':
        return `${data?.first_name} ${data?.last_name}`;
        break;
    }
  };

  const getLogo = (data: any, type: string) => {
    switch (type) {
      case 'exhibitors':
        return data?.exhibitor_logo;
        break;
      case 'sponsors':
        return data?.sponsor_logo;
        break;
      case 'speakers':
        return data?.avatar;
        break;
      case 'delegates':
        return data?.avatar;
        break;
      case 'media-partners':
        return data?.logo;
        break;
    }
  };

  const onClickAddAndRemoveHandler = (id: string) => {
    if (state?.button) {
      const result = addUsersIdArray.filter(
        (addUsersId: string) => addUsersId !== id
      );
      dispatch(eventAction?.setAddUsersIdArray({ idsArray: result }));
    } else {
      if (addUsersIdArray.length === 0) {
        dispatch(eventAction?.setAddUsersIdArray({ idsArray: [id] }));
      } else {
        dispatch(
          eventAction?.setAddUsersIdArray({
            idsArray: [...addUsersIdArray, id],
          })
        );
      }
    }
    setState({
      ...state,
      button: !state?.button,
    });
  };
  const setButtonType = () => {
    if (addUsersIdArray?.length > 0) {
      let updatedRow = addUsersIdArray?.map((id: string) => {
        if (id === state?.rowData?._id) {
          return { ...state?.rowData, buttonType: 'Remove' };
        } else {
          return { ...state?.rowData, buttonType: 'Add' };
        }
      });
      setState({
        ...state,
        rowData: updatedRow[0],
      });
    } else {
      setState({
        ...state,
        rowData: { ...row, buttonType: 'Add' },
      });
    }
  };
  const selectedIdCheck = (id: string) => {
    if (addUsersIdArray.length > 0) {
      const result = addUsersIdArray?.filter(
        (addUsersId: string) => addUsersId === id
      );
      if (result.length > 0) {
        setState({
          ...state,
          button: true,
        });
      }
    }
    //  
  };

  useEffect(() => {
    selectedIdCheck(row?._id);
  }, []);

  console.log('addUsersIdArray>>>', addUsersIdArray);

  return (
    <div className="flex items-center justify-between pb-3 pt-2 lg:pb-5 lg:first:pt-4">
      <div className="flex items-center gap-2">
        <Avatar size="lg" name={getName(row, type)} src={getLogo(row, type)} />
        <Text className="font-lexend font-medium capitalize text-gray-900">
          {getName(row, type)}
        </Text>
      </div>

      <Button
        size="sm"
        rounded="pill"
        variant={state.button ? 'solid' : 'flat'}
        onClick={() => onClickAddAndRemoveHandler(row?._id)}
        className="font-medium capitalize md:h-9 md:px-4"
      >
        {state.button ? 'Remove' : 'Add'}
      </Button>
    </div>
  );
}

{
  /* <FollowerRow row={item} key={item.id} /> */
}
