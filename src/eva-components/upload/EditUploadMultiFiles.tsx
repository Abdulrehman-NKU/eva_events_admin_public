import React, { ChangeEvent, useState } from 'react';
import cn from '@/utils/class-names';
import UploadIcon from '@/components/shape/upload';
import { Text } from '@/components/ui/text';
import { ActionIcon } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import { getImageUrl } from '../userDetails/userDetails';

const EditUploadMultiFiles = ({ state, setState }: any) => {
  const removeFile = (id: string) => {
    const result = state?.selectedImages.filter(
      (data: any) => data?.lastModified !== id
    );

    setState({
      ...state,
      selectedImages: result,
    });
  };

  const onChangeFileUpload = (e: any) => {
    const selectedFile = e?.target?.files;
    if (state?.selectedImages?.length > 0) {
      setState({
        ...state,
        selectedImages: [...state?.selectedImages, ...selectedFile],
      });
    } else {
      setState({
        ...state,
        selectedImages: [...selectedFile],
      });
    }
    (e.target as HTMLInputElement).value = '';
  };

  const removeEditFile = (id: string, state: any) => {
    const result = state?.editSelectedImages?.filter(
      (data: any) => data?._id !== id
    );

    console.log('state>>>', state);

    setState({
      ...state,
      editSelectedImages: result,
    });
  };

  const getName = (nameString: string) => {
    let updateName = nameString;
    let nameLength = nameString?.length;
    let nameArray = nameString?.split('.');

    if (nameLength > 25) {
      let nameSlice = nameArray[0]?.slice(0, 20);
      let nameSubstr = nameArray[0].substr(nameArray[0]?.length - 3);
      updateName = `${nameSlice}...${nameSubstr}.${nameArray[1]}`;
      // console.log('nameSlice>>>', { nameArray, nameSlice, updateName });
    }

    return updateName;
  };

  return (
    <>
      <div
        className={cn('relative col-span-full rounded-md border')}
        style={{ background: state.drag ? 'lightGray' : '' }}
      >
        <div
          className={cn(
            'flex cursor-pointer items-center justify-center gap-4 px-6 py-5 transition-all duration-300'
          )}
        >
          {/* <input {...getInputProps()} /> */}
          <div className="">
            <input
              type="file"
              className="absolute left-0 top-0 min-h-full min-w-full cursor-pointer opacity-0 outline-none"
              accept="image/*"
              onChange={onChangeFileUpload}
              //   value={selectFiles}
              id="file_input_id"
              value=""
              multiple
            />
          </div>

          <UploadIcon className="h-12 w-12" />
          <Text className="text-base font-medium">
            {state.drag ? 'Drop images' : 'Select multiple files'}
          </Text>
        </div>
      </div>

      <>
        {state?.editSelectedImages?.length > 0 &&
          state?.editSelectedImages?.map((selectFile: any) => (
            <div
              className="flex w-full flex-grow items-center justify-between rounded border px-3 py-3 text-black dark:bg-red-50"
              key={selectFile._id}
            >
              <div className="flex items-center">
                <div className="relative h-16 min-w-16 rounded border px-2 py-1 dark:bg-red-50">
                  <img
                    src={getImageUrl(selectFile?.file_url)}
                    alt="Selected"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p
                  className={cn(
                    'ml-4 line-clamp-3 [&_label.block>span]:font-medium'
                  )}
                >
                  {getName(selectFile?.file_name)}
                </p>
              </div>
              <div className="ml-2 flex h-full flex-col items-end justify-between	">
                <div onClick={() => removeEditFile(selectFile?._id, state)}>
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'Delete Item'}
                    className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </ActionIcon>
                </div>

                <a href={selectFile?.file_url} target="_blank">
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'Delete Item'}
                    className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
                  >
                    <div>
                      <DownloadingOutlinedIcon />
                    </div>
                  </ActionIcon>
                </a>
              </div>
            </div>
          ))}
      </>

      <>
        {state?.selectedImages.length > 0 &&
          state?.selectedImages?.map((selectFile: any) => (
            <div
              className="flex w-full flex-grow items-center justify-between rounded border px-3 py-3 text-black dark:bg-red-50"
              key={selectFile._id}
            >
              <div className="flex items-center">
                <div className="relative h-16 min-w-16 rounded border px-2 py-1 dark:bg-red-50">
                  <img
                    src={URL.createObjectURL(selectFile)}
                    alt="Selected"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p
                  className={cn(
                    'ml-4 line-clamp-3 [&_label.block>span]:font-medium'
                  )}
                >
                  {getName(selectFile?.name)}
                </p>
              </div>
              <div className="ml-2 flex h-full flex-col items-end justify-between	">
                <div onClick={() => removeFile(selectFile?.lastModified)}>
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'Delete Item'}
                    className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </ActionIcon>
                </div>

                <a href={URL.createObjectURL(selectFile)} target="_blank">
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'Delete Item'}
                    className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
                  >
                    <div>
                      <DownloadingOutlinedIcon />
                    </div>
                  </ActionIcon>
                </a>
              </div>
            </div>
          ))}
      </>
    </>
  );
};

export default EditUploadMultiFiles;