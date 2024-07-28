export const geteventsSelectedDataFilter = (data: any) => {
  let updateList;

  if (data?.length > 0) {
    updateList = data?.map(({ _id, name }: { _id: string; name: string }) => {
      return {
        name: name,
        id: _id,
      };
    });
  } else {
    updateList = [];
  }

  return updateList;
};
