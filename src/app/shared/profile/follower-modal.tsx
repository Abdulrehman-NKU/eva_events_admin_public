import { useState } from 'react';
import { Title, Text } from '@/components/ui/text';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SimpleBar from '@/components/ui/simplebar';
import { ExhibitorType } from '@/eva-components/type/userListType';

export default function FollowerModal({ data }: any) {
  return (
    <>
      <SimpleBar className="-mr-3 h-[400px] pr-3 md:h-[450px]">
        {data?.map((item: any) => <FollowerRow row={item} key={item.id} />)}
      </SimpleBar>
    </>
  );
}

function FollowerRow({ row }: any) {
  const [state, setState] = useState(false);
  return (
    <div className="flex items-center justify-between pb-3 pt-2 lg:pb-5 lg:first:pt-4">
      <div className="flex items-center gap-2">
        <Avatar size="lg" name={row.name} src={row.avatar} />
        <Text className="font-lexend font-medium capitalize text-gray-900">
          {row.name}
        </Text>
      </div>
      <Button
        size="sm"
        rounded="pill"
        variant={state ? 'solid' : 'flat'}
        onClick={() => setState(() => !state)}
        className="font-medium capitalize md:h-9 md:px-4"
      >
        {state ? 'Remove' : 'Add'}
      </Button>
    </div>
  );
}
