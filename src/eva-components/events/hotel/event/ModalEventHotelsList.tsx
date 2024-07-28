import { useEffect, useState } from 'react';
import { Title, Text } from '@/components/ui/text';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SimpleBar from '@/components/ui/simplebar';
import { ExhibitorType } from '@/eva-components/type/userListType';
import Spinner from '@/components/ui/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import { Empty } from 'rizzui';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

export default function ModalEventHotelsList({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
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
          data?.map((item: any) => <FollowerRow row={item} key={item._id} />)
        )}
      </SimpleBar>
    </>
  );
}

function FollowerRow({ row }: { row: any }) {
  const [state, setState] = useState({
    button: false,
    buttonType: 'Add',
    rowData: row,
  });

  const dispatch = useDispatch();

  const addHotelsIdArray = useSelector(
    (state: any) => state?.event?.addHotelsIdArray
  );

  const onClickAddAndRemoveHandler = (id: string) => {
    if (state?.button) {
      const result = addHotelsIdArray.filter(
        (addUsersId: string) => addUsersId !== id
      );
      dispatch(eventAction?.setAddHotelsIdArray({ idsArray: result }));
    } else {
      if (addHotelsIdArray.length === 0) {
        dispatch(eventAction?.setAddHotelsIdArray({ idsArray: [id] }));
      } else {
        dispatch(
          eventAction?.setAddHotelsIdArray({
            idsArray: [...addHotelsIdArray, id],
          })
        );
      }
    }
    setState({
      ...state,
      button: !state?.button,
    });
  };

  const selectedIdCheck = (id: string) => {
    if (addHotelsIdArray.length > 0) {
      const result = addHotelsIdArray?.filter(
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

  console.log('addUsersIdArray>>>', addHotelsIdArray);

  return (
    <div className="flex items-center justify-between pb-3 pt-2 lg:pb-5 lg:first:pt-4">
      <div className="flex items-center gap-2">
        <Avatar
          size="lg"
          name={row?.hotel_name}
          src={getImageUrl(row?.hotel_images[0]?.file_url)}
        />
        <Text className="font-lexend font-medium capitalize text-gray-900">
          {row?.hotel_name}
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
