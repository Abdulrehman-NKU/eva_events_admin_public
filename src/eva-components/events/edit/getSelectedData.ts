import Constatnts from '@/eva-components/constatnt';

export const getUserSelectedData = (data: any, type: string) => {
  console.log('data>>>', data);
  let updateList = [];
  switch (type) {
    case Constatnts.exhibitor:
      if (data?.length > 0) {
        updateList = data.map(
          ({
            _id,
            first_name,
            last_name,
          }: {
            _id: string;
            first_name: string;
            last_name: string;
          }) => {
            return {
              name: `${first_name} ${last_name}`,
              id: _id,
            };
          }
        );
      } else {
        updateList = [];
      }

      break;

    case Constatnts.sponsor:
      if (data?.length > 0) {
        updateList = data?.map(
          ({ _id, sponsor_name }: { _id: string; sponsor_name: string }) => {
            return {
              name: sponsor_name,
              id: _id,
            };
          }
        );
      } else {
        updateList = [];
      }

      break;

    case Constatnts.delegate:
      if (data?.length > 0) {
        updateList = data?.map(
          ({
            _id,
            first_name,
            last_name,
          }: {
            _id: string;
            first_name: string;
            last_name: string;
          }) => {
            return {
              name: `${first_name} ${last_name}`,
              id: _id,
            };
          }
        );
      } else {
        updateList = [];
      }

      break;

    case Constatnts.speaker:
      if (data?.length > 0) {
        updateList = data?.map(
          ({
            _id,
            first_name,
            last_name,
          }: {
            _id: string;
            first_name: string;
            last_name: string;
          }) => {
            return {
              name: `${first_name} ${last_name}`,
              id: _id,
            };
          }
        );
      } else {
        updateList = [];
      }
      break;
    case Constatnts.mediaPartner:
      if (data?.length > 0) {
        updateList = data?.map(
          ({
            _id,
            first_name,
            last_name,
          }: {
            _id: string;
            first_name: string;
            last_name: string;
          }) => {
            return {
              name: `${first_name} ${last_name}`,
              id: _id,
            };
          }
        );
      } else {
        updateList = [];
      }

      break;

    default:
    // code block
  }

  return updateList;
};
