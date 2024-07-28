/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
'use client';

import { useEffect, useState } from 'react';
import cn from '@/utils/class-names';
import FormFooter from '@/eva-components/form-footer';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import { PhoneNumber } from '@/components/ui/phone-input';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SelectBox from '@/components/ui/select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import { AdminApi } from 'utils/api/user/Admin';
import { PiCaretUpDown } from 'react-icons/pi';
import { CircularProgress } from '@mui/material';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { routes } from '@/config/routes';
import { usePathname, useRouter } from 'next/navigation';
import { ActionIcon } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import Spinner from '@/components/ui/spinner';
import { emailFormate, getImageUrl } from '@/eva-components/userDetails/userDetails';

interface state {
  isLoading: boolean;
  selectedPhoto: any;
  isLoadingRole: boolean;
  roleList: any[];
  editProfilePhoto: string;
  deletePhotoLoading: boolean;
}

interface initialValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rolesSelectData: any[];
  dialCode: string;
}

const EditAdminForm = ({ editData }: { editData: any }) => {
  const [state, setState] = useState<state>({
    isLoading: false,
    selectedPhoto: null,
    isLoadingRole: false,
    roleList: [],
    editProfilePhoto: editData?.profile_image || '',
    deletePhotoLoading: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  let phone_number = `${editData?.phone_country_code}${editData?.phone}`;

  let updateList;
  if (editData?.roles?.length > 0) {
    updateList = editData?.roles?.map(
      ({ _id, role_name }: { _id: string; role_name: string }) => {
        return {
          name: role_name,
          value: _id,
        };
      }
    );
  } else {
    updateList = [];
  }

  const initialValues = {
    firstName: editData?.first_name || '',
    lastName: editData?.last_name || '',
    email: editData?.email || '',
    phoneNumber: phone_number || '',
    rolesSelectData: updateList,
    dialCode: editData?.phone_country_code || '',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    setState({
      ...state,
      selectedPhoto: selectedFile,
    });

    console.log('Selected file:', selectedFile);
  };

  const handleRemovePhoto = () => {
    setState({
      ...state,
      selectedPhoto: null,
    });
    const fileInput = document.getElementById('fileInput');
    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = '';
    }
  };

  const onSubmitHandler = async (values: initialValues) => {
    setState({
      ...state,
      isLoading: true,
    });
    let admin_id = editData?._id;
    let length = values?.dialCode.length;
    let phoneNumber = values?.phoneNumber?.slice(length);
    let formData = new FormData();
    formData.append('first_name', values.firstName);
    formData.append('last_name', values.lastName);
    formData.append('email', emailFormate(values?.email));

    for (let i = 0; i < values.rolesSelectData.length; i++) {
      formData.append(`roles[${i}]`, values?.rolesSelectData[i]?.value);
    }

    if (values?.phoneNumber) {
      formData.append('phone_country_code', values.dialCode);
      formData.append('phone', phoneNumber);
    }

    if (!state?.editProfilePhoto) {
      if (state?.selectedPhoto !== null) {
        formData.append('profile_image', state?.selectedPhoto);
      }
    }

    let res = await AdminApi.updateAdmin(formData, admin_id);
	
	switch (res?.response_code) {
      case ResponseCodes.UPDATE_SUCCESS:
        router.push(routes?.user?.admin);
        break;
      case ResponseCodes.UPLOAD_FAILED:
        toast.error(res?.data?.message);
        break;
      case ResponseCodes.ALREADY_EXIST:
        toast.error(res?.data?.message);
        break;
      default:
        toast.error('Internal server error');
    }

    formik.resetForm();
    setState({
      ...state,
      isLoading: false,
      selectedPhoto: null,
      editProfilePhoto: '',
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required(messages.firstNameRequired),
      lastName: Yup.string().required(messages.lastNameRequired),
      email: Yup.string()
        .email(messages.invalidEmail)
        .required(messages.emailIsRequired),
      phoneNumber: Yup.string().optional(),
      rolesSelectData: Yup.array()
        .min(1, 'Min one value required!')
        .required(messages?.roleIsRequired),
      dialCode: Yup.string(),
    }),
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const getRoleApi = async () => {
    setState({
      ...state,
      isLoadingRole: true,
    });

    let res = await AdminApi.getRoles();

    console.log('res>>>', res);

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      let updateList = res?.data?.data?.map(
        ({ _id, role_name }: { _id: string; role_name: string }) => {
          return {
            name: role_name,
            value: _id,
          };
        }
      );

      setState({
        ...state,
        isLoadingRole: false,
        roleList: updateList,
      });
    } else {
      toast.error(res?.data?.data?.message);
    }
  };

  const onChangeNumber = (value: any, data: any) => {
    formik.setFieldValue('phoneNumber', value);
    formik.setFieldValue('dialCode', data?.dialCode);
  };

  const onChnageSelectBox = (e: any) => {
    let updateRolesArray = [];

    console.log('onChnageSelectBox>>', e);

    const checkValue = formik.values?.rolesSelectData.filter(
      (data: any) => data?.value === e?.value
    );

    if (checkValue.length == 0) {
      if (formik?.values?.rolesSelectData.length > 0) {
        updateRolesArray = [...formik.values.rolesSelectData, e];
      } else {
        updateRolesArray = [e];
      }
      formik.setFieldValue('rolesSelectData', updateRolesArray);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    console.log('delelete');

    setState({
      ...state,
      deletePhotoLoading: true,
    });

    let res = await AdminApi.deleteProfilePhoto(id);

    if (res?.response_code === ResponseCodes.DELETE_SUCCESS) {
      toast.success('Profile image delete successfully');
      setState({
        ...state,
        deletePhotoLoading: false,
        editProfilePhoto: '',
      });
    } else {
      toast.success('Internal server error please reload!');
      setState({
        ...state,
        deletePhotoLoading: false,
      });
    }
  };

  const roleDelete = (id: string) => {
    const result = formik.values?.rolesSelectData.filter(
      (data: any) => data?.value !== id
    );
    formik.setFieldValue('rolesSelectData', result);
  };

  useEffect(() => {
    getRoleApi();
  }, []);

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn('[&_label.block>span]:font-medium')}
      >
        <div className="mb-10  grid gap-7 divide-y divide-dashed divide-gray-200 border-t bg-white @2xl:gap-9 @3xl:gap-11 dark:bg-gray-50">
          <FormGroup
            title="Personal Info"
            description="Add personal Info here"
            className="pt-8"
          >
            <Input
              name="firstName"
              placeholder="First Name"
              label="First Name*"
              className="flex-grow"
              onChange={formik.handleChange}
              error={formik.errors.firstName}
              value={formik.values.firstName}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              label="Last Name*"
              className="flex-grow"
              onChange={formik.handleChange}
              error={formik.errors.lastName}
              value={formik.values.lastName}
            />

            <Input
              name="email"
              placeholder="Email"
              label="Email*"
              className="flex-grow"
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
            />

            <PhoneNumber
              country="gb"
              label="Phone number"
              className="flex-grow"
              onChange={onChangeNumber}
              error={formik.errors.phoneNumber}
              value={formik.values.phoneNumber}
            />
          </FormGroup>
          <FormGroup
            title="Select Role"
            description="Please select admin role here"
            className="pt-8"
          >
            <SelectBox
              placeholder="Select role"
              options={state?.roleList}
              label="Select role*"
              name="role"
              className="col-span-full"
              onChange={onChnageSelectBox}
              getOptionValue={(option) => option}
              error={formik?.errors?.rolesSelectData as any}
              suffix={
                state?.isLoadingRole ? (
                  <CircularProgress
                    size={18}
                    style={{ marginTop: 5 }}
                    color="inherit"
                    className="h-5 w-5 "
                  />
                ) : (
                  <PiCaretUpDown className="h-5 w-5" />
                )
              }
              disabled={state?.isLoadingRole}
            />

            <>
              {formik?.values?.rolesSelectData?.map((role: any) => (
                <div className="flex w-full flex-grow items-center justify-between rounded border	px-2 py-1 text-black dark:bg-red-50">
                  <p>{role?.name}</p>
                  <div onClick={() => roleDelete(role?.value)}>
                    <ActionIcon
                      size="sm"
                      variant="outline"
                      aria-label={'Delete Item'}
                      className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </ActionIcon>
                  </div>
                </div>
              ))}
            </>
          </FormGroup>

          <FormGroup
            title="Upload Photo"
            description="This will be displayed on your profile"
            className="pt-8"
          >
            <div className="flex items-center">
              <label
                htmlFor="fileInput"
                className="relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border border-gray-200 @2xl:h-40 @2xl:w-40"
              >
                {getImageUrl(state?.editProfilePhoto) ? (
                  <>
                    <img
                      src={getImageUrl(state?.editProfilePhoto)}
                      alt="Selected"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </>
                ) : state?.selectedPhoto !== null ? (
                  <>
                    <img
                      src={URL.createObjectURL(state?.selectedPhoto)}
                      alt="Selected"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
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
              {state?.selectedPhoto && (
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
                    onClick={() => handleDeletePhoto(editData?._id)}
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
          </FormGroup>
        </div>

        <FormFooter isLoading={state?.isLoading} submitBtnText={'Update'} />
      </form>
    </div>
  );
};

export default EditAdminForm;
