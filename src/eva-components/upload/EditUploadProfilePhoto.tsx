import React, { useState } from 'react';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Spinner from '@/components/ui/spinner';
import { type } from 'os';
import Constatnts from '../constatnt';
import { AllUsersApi } from 'utils/api/user/AllUsers';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { getImageUrl } from '../userDetails/userDetails';

const EditUploadProfilePhoto = ({ state, setState, formik, type, id }: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setState({
      ...state,
      profilePhoto: selectedFile,
    });
    formik.setFieldValue('profilePhotoErrorHandling', 'image');
  };

  const handleRemovePhoto = () => {
    setState({
      ...state,
      profilePhoto: null,
    });
    formik.setFieldValue('profilePhotoErrorHandling', '');
    const fileInput = document.getElementById('fileInput');
    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = '';
    }
  };

  const handleDeletePhoto = async (delete_type: string, delete_id: string) => {
    console.log('delelete');

    setState({
      ...state,
      deletePhotoLoading: true,
    });

    let res = await AllUsersApi.deleteProfileImage(delete_type, delete_id);

    if (res?.response_code === ResponseCodes.DELETE_SUCCESS) {
      toast.success('Profile image delete successfully');
      setState({
        ...state,
        deletePhotoLoading: false,
        editProfilePhoto: '',
      });
      formik.setFieldValue('profilePhotoErrorHandling', '');
    } else {
      toast.error('Internal server error please reload!');
      setState({
        ...state,
        deletePhotoLoading: false,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <label
          htmlFor="fileInput"
          className={`relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border border-gray-200 @2xl:h-40 @2xl:w-40 ${
            formik?.errors?.profilePhotoErrorHandling ? 'border-red-500' : ''
          }`}
        >
          {getImageUrl(state?.editProfilePhoto) ? (
            <>
              <a href={getImageUrl(state?.editProfilePhoto)} target="_blank">
                <img
                  src={getImageUrl(state?.editProfilePhoto)}
                  alt="Selected"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </a>
            </>
          ) : state?.profilePhoto !== null ? (
            <>
              <a
                href={URL.createObjectURL(state?.profilePhoto)}
                target="_blank"
              >
                <img
                  src={URL.createObjectURL(state.profilePhoto)}
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
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            disabled={state?.editProfilePhoto ? true : false}
          />
        </label>
        {state?.profilePhoto && (
          <button
            className="ml-2 rounded-full bg-white p-1"
            onClick={handleRemovePhoto}
          >
            <DeleteForeverIcon />
          </button>
        )}

        {state?.editProfilePhoto && (
          <>
            <div
              className={`ml-2 rounded-full bg-white p-1 ${
                state?.deletePhotoLoading ? 'pointer-events-none' : ''
              }`}
              onClick={() => handleDeletePhoto(type, id)}
            >
              {state?.deletePhotoLoading ? (
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

export default EditUploadProfilePhoto;
