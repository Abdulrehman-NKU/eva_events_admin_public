'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import UploadMultiFiles from './UploadMultiFiles';
import { UploadApi } from 'utils/api/Upload';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import * as Yup from 'yup';
import { EventListType } from '@/eva-components/type/userListType';
import { getEventParamsDetails } from '../../view/all/getData';
import { usePathname } from 'next/navigation';
import { log } from 'console';
import { useRouter } from 'next/router';
import { eventAction } from '../../../../../redux/slice/event';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  data: any[];
  editData?: EventListType;
}

const UploadNewImageModal: React.FC<Props> = ({ data, editData }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  let createEventGalleriesModal = useSelector(
    (state: any) => state?.event?.createEventGalleriesModal
  );
  const [state, setState] = useState<any>({
    isLoading: false,
    selectedImages: [],
    drag: false,
    editSelectedImages: editData?.poster_images || [],
  });

  const initialValues = {};
  const validationSchema = Yup.object({});

  const posterImageHandler = async () => {
    let poster_Id_Array: string[] = [];
    let formData = new FormData();

    for (let i = 0; i < state?.selectedImages?.length; i++) {
      formData.append(`file`, state?.selectedImages[i]);
    }
    let res = await UploadApi.uploadPosterImage(formData);
    if (res.response_code === ResponseCodes.UPLOAD_SUCCESS) {
      poster_Id_Array = res.data.data.map((data: any) => {
        return data?._id;
      });
    } else {
      toast.error('Image upload failed please reload!');
    }

    return poster_Id_Array;
  };

  const onSubmitHandler = async (values: any) => {
    setState({
      ...state,
      isLoading: true,
    });
    if (state.selectedImages.length > 0) {
      let poster_id_array = await posterImageHandler();
      eventFormApi(values, poster_id_array);
    } else {
      eventFormApi(values, []);
    }
  };

  const eventFormApi = async (values: any, poster_id_array: string[]) => {
    let formData = new FormData();

    if(!poster_id_array || !poster_id_array?.length) {
      toast.error('Please select at least one image');
      setState({
        ...state,
        isLoading: false,
      });
      return;
    }

    if (poster_id_array?.length > 0) {
      for (let i = 0; i < poster_id_array.length; i++) {
        formData.append(`poster_images[]`, poster_id_array[i]);
      }
    }

    state.editSelectedImages = [...data];
    if (state?.editSelectedImages?.length > 0) {
      for (let i = 0; i < state?.editSelectedImages?.length; i++) {
        formData.append(`poster_images[]`, state?.editSelectedImages[i]?._id);
      }
    }

    let { event_id } = getEventParamsDetails(pathname);
    const res = await EventsApiServices.editEvent(formData, event_id);
    switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        formik.resetForm();
        toast.success('Uploaded image successfully');
        dispatch(eventAction.resetImagesList());
        onClose();
        setState({
          ...state,
          isLoading: false,
          selectedImages: [],
        });
        break;
      case ResponseCodes.UPLOAD_FAILED:
        toast.error(res?.data?.message);
        setState({
          ...state,
          isLoading: false,
        });
        break;
      default:
        toast.error('Internal server error please reload!');
        setState({
          ...state,
          isLoading: false,
        });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const onClose = () => {
    dispatch(eventAction?.setCreateEventGalleriesModal());
    formik.resetForm();
    setState({
      ...state,
      selectedImages: [],
    });
  };

  const onCancel = () => {
    onClose();
  };

  const onDropfileUploadHandler = (e: any) => {
    e.preventDefault();
    let dropFiles = e?.dataTransfer?.files;

    if (state?.selectedImages === null) {
      setState({
        ...state,
        selectedImages: [...dropFiles],
        drag: false,
      });
    } else {
      setState({
        ...state,
        selectedImages: [...state?.selectedImages, ...dropFiles],
        drag: false,
      });
    }
    (e.target as HTMLInputElement).value = '';
  };
  const onDragOverfileUploadHandler = (e: any) => {
    e.preventDefault();
  };

  const onDragEnterfileUploadHandler = () => {
    setState({
      ...state,
      drag: true,
    });
  };

  return (
    <>
      {createEventGalleriesModal && (
        <div
          onDrop={onDropfileUploadHandler}
          onDragOver={onDragOverfileUploadHandler}
          onDragEnter={onDragEnterfileUploadHandler}
        >
          <Modal
            isOpen={createEventGalleriesModal}
            onClose={onClose}
            overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
            customSize="1300px"
          >
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-grow flex-col gap-6 p-8 @container lg:px-24  lg:pb-9 lg:pt-28 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
            >
              <UploadMultiFiles state={state} setState={setState} />
              {state.isLoading && (
                <div className="absolute left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-white bg-opacity-75 p-4">
                  <span className="font-poppins py-3  text-center text-2xl font-normal leading-loose tracking-normal text-black">
                    Updating Event Details <br /> Please wait...
                  </span>
                  <span className="ml-2 animate-spin">&#10240;</span>
                </div>
              )}
              <div className="mt-3 flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="w-full @xl:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={state?.isLoading}
                  className="w-full @xl:w-auto"
                >
                  Done
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default UploadNewImageModal;
