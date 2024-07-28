import React, { useState } from 'react';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Spinner from '@/components/ui/spinner';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { getImageUrl } from '../userDetails/userDetails';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { useParams } from 'next/navigation';

const EditEventLogo = ({ state, setState, formik, type, id }: any) => {
  const params = useParams();

  const eventId = params?.id;

  console.log('params', params);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    setState({
      ...state,
      updatedEventLogo: selectedFile,
    });

    // formik.setFieldValue('profilePhotoErrorHandling', 'image');
  };

  const handleRemovePhoto = () => {
    setState({
      ...state,
      updatedEventLogo: null,
    });
    // formik.setFieldValue('profilePhotoErrorHandling', '');
    const fileInput = document.getElementById('event-logo-input');
    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = '';
    }
  };

  const handleDeletePhoto = async (delete_type: string, delete_id: string) => {
    setState({
      ...state,
      isDeletingLogo: true,
    });


    let res = await EventsApiServices.deleteEventLogo({
      event_id: eventId as string,
    });

  

    if (res?.response_code === ResponseCodes.DELETE_SUCCESS) {
      toast.success('Event logo delete successfully');
      setState({
        ...state,
        isDeletingLogo: false,
        eventLogo: '',
        updatedEventLogo: null,
      });
      // formik.setFieldValue('profilePhotoErrorHandling', '');
    } else {
      toast.error(
        'Something went wrong while deleting the event logo, please try again!'
      );
      setState({
        ...state,
        isDeletingLogo: false,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <label
          htmlFor="event-logo-input"
          className={`relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border border-gray-200 @2xl:h-40 @2xl:w-40 ${
            formik?.errors?.profilePhotoErrorHandling ? 'border-red-500' : ''
          }`}
        >
          {getImageUrl(state?.eventLogo) ? (
            <>
              <a href={getImageUrl(state?.eventLogo)} target="_blank">
                <img
                  src={getImageUrl(state?.eventLogo)}
                  alt="Selected"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </a>
            </>
          ) : state?.updatedEventLogo !== null ? (
            <>
              <a
                href={URL.createObjectURL(state?.updatedEventLogo)}
                target="_blank"
              >
                <img
                  src={URL.createObjectURL(state.updatedEventLogo)}
                  alt="Selected"
                  className="absolute inset-0 h-full w-full cursor-zoom-in object-cover	"
                />
              </a>
            </>
          ) : (
            <>
              <CloudUploadRoundedIcon className="h-8 w-8" />
              <p className="text-xs">Drop or select file</p>
            </>
          )}
          <input
            id="event-logo-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            disabled={state?.eventLogo ? true : false}
          />
        </label>

        {state?.updatedEventLogo && (
          <button
            className="ml-2 rounded-full bg-white p-1"
            onClick={handleRemovePhoto}
          >
            <DeleteForeverIcon />
          </button>
        )}

        {state?.eventLogo && (
          <>
            <div
              className={`ml-2 rounded-full bg-white p-1 ${
                state?.isDeletingLogo ? 'pointer-events-none' : ''
              }`}
              onClick={() => handleDeletePhoto(type, id)}
            >
              {state?.isDeletingLogo ? (
                <Spinner size="sm" />
              ) : (
                <DeleteForeverIcon />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditEventLogo;
