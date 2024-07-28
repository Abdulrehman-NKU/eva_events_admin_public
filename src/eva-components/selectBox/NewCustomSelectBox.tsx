import SelectBox from './select';
import { AnyARecord } from 'dns';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { ActionIcon, cn, Input } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import ResponseCodes from 'utils/response-codes';
import { AdminApi } from 'utils/api/user/Admin';
import toast from 'react-hot-toast';
import { String } from 'lodash';
import { PiCaretUpDown } from 'react-icons/pi';
import { Listbox } from '@headlessui/react';

const labelClasses = {
  size: {
    sm: 'text-xs mb-1',
    DEFAULT: 'text-sm mb-1.5',
    lg: 'text-sm mb-1.5',
    xl: 'text-base mb-2',
  },
};

const selectClasses = {
  base: 'flex items-center peer w-full transition duration-200',
  disabled: '!bg-gray-100 cursor-not-allowed !border-gray-200',
  error: '!border-red hover:!border-red focus:!border-red focus:!ring-red',
  size: {
    sm: 'px-2 py-1 text-xs h-8 leading-[32px]',
    DEFAULT: 'px-3 py-2 text-sm h-10 leading-[40px]',
    lg: 'px-4 py-2 text-base h-12 leading-[48px]',
    xl: 'px-5 py-2.5 text-base h-14 leading-[56px]',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    DEFAULT: 'rounded-md',
    lg: 'rounded-lg',
    pill: 'rounded-full',
  },
  variant: {
    active: {
      base: 'border bg-gray-0 focus:ring-[0.6px]',
      color: {
        DEFAULT:
          'border-gray-900 focus:border-gray-1000 focus:ring-gray-1000 text-gray-1000',
        primary:
          'border-primary focus:border-primary focus:ring-primary text-primary-dark',
        secondary:
          'border-secondary focus:border-secondary focus:ring-secondary text-secondary-dark',
        danger: 'border-red focus:border-red focus:ring-red text-red-dark',
        info: 'border-blue focus:border-blue focus:ring-blue text-blue-dark',
        success:
          'border-green focus:border-green focus:ring-green text-green-dark',
        warning:
          'border-orange focus:border-orange-dark focus:ring-orange-dark text-orange-dark',
      },
    },
    flat: {
      base: 'focus:ring-2 focus:bg-transparent border-0',
      color: {
        DEFAULT: 'bg-gray-200/70 focus:ring-gray-900/20 text-gray-1000',
        primary:
          'bg-primary-lighter/70 focus:ring-primary/30 text-primary-dark',
        secondary:
          'bg-secondary-lighter/70 focus:ring-secondary/30 text-secondary-dark',
        danger: 'bg-red-lighter/70 focus:ring-red/30 text-red-dark',
        info: 'bg-blue-lighter/70 focus:ring-blue/30 text-blue-dark',
        success: 'bg-green-lighter/70 focus:ring-green/30 text-green-dark',
        warning: 'bg-orange-lighter/80 focus:ring-orange/30 text-orange-dark',
      },
    },
    outline: {
      base: 'bg-transparent focus:ring-[0.6px] border border-gray-300',
      color: {
        DEFAULT:
          'hover:border-gray-1000 focus:border-gray-1000 focus:ring-gray-1000',
        primary: 'hover:border-primary focus:border-primary focus:ring-primary',
        secondary:
          'hover:border-secondary focus:border-secondary focus:ring-secondary',
        danger: 'hover:border-red focus:border-red focus:ring-red',
        info: 'hover:border-blue focus:border-blue focus:ring-blue',
        success: 'hover:border-green focus:border-green focus:ring-green',
        warning: 'hover:border-orange focus:border-orange focus:ring-orange',
      },
    },
    text: {
      base: 'border-0 focus:ring-2 bg-transparent',
      color: {
        DEFAULT: 'hover:text-gray-1000 focus:ring-gray-900/20',
        primary: 'hover:text-primary-dark focus:ring-primary/30 text-primary',
        secondary:
          'hover:text-secondary-dark focus:ring-secondary/30 text-secondary',
        danger: 'hover:text-red-600 focus:ring-red/30 text-red',
        info: 'hover:text-blue-dark focus:ring-blue/30 text-blue',
        success: 'hover:text-green-dark focus:ring-green/30 text-green',
        warning: 'hover:text-orange-dark focus:ring-orange/30 text-orange',
      },
    },
  },
};

const optionsClasses = {
  base: 'max-h-[265px] p-2 w-full overflow-auto border border-gray-100 focus:outline-none z-40 bg-gray-0 dark:bg-gray-100 [&>ul]:outline-none [&>ul]:ring-0',
  shadow: {
    sm: 'drop-shadow-md',
    DEFAULT: 'drop-shadow-lg',
    lg: 'drop-shadow-xl',
    xl: 'drop-shadow-2xl',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    DEFAULT: 'rounded-md',
    lg: 'rounded-lg',
    pill: 'rounded-xl',
  },
};

const optionClasses = {
  base: 'text-gray-900 relative cursor-pointer select-none text-sm dark:hover:bg-gray-50',
  notFound:
    'relative cursor-default select-none text-center text-gray-500 whitespace-nowrap',
  color: {
    DEFAULT: 'text-gray-900 bg-gray-100',
    primary: 'text-primary-dark bg-primary-lighter',
    secondary: 'text-secondary-dark bg-secondary-lighter',
    danger: 'text-red-dark bg-red-lighter',
    info: 'text-blue-dark bg-blue-lighter',
    success: 'text-green-dark bg-green-lighter',
    warning: 'text-orange-dark bg-orange-lighter',
  },
};

// actual select field styles
const selectFieldClasses = {
  base: 'w-full text-inherit border-0 p-0 focus:outline-none focus:ring-0',
  disabled: 'cursor-not-allowed placeholder:text-gray-500',
  clearable:
    '[&:placeholder-shown~.input-clear-btn]:opacity-0 [&:placeholder-shown~.input-clear-btn]:invisible [&:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&:not(:placeholder-shown)~.input-clear-btn]:visible',
  prefixStartPadding: {
    base: 'rtl:pl-[inherit]',
    size: {
      sm: 'pl-1.5 rtl:pr-1.5',
      DEFAULT: 'pl-2.5 rtl:pr-2.5',
      lg: 'pl-3.5 rtl:pr-3.5',
      xl: 'pl-4 rtl:pr-4',
    },
  },
  suffixEndPadding: {
    base: 'rtl:pr-[inherit]',
    size: {
      sm: 'pr-1.5 rtl:pl-1.5',
      DEFAULT: 'pr-2.5 rtl:pl-2.5',
      lg: 'pr-3.5 rtl:pl-3.5',
      xl: 'pr-4 rtl:pl-4',
    },
  },
};

const NewCustomSelectBox = ({
  formik,
  type,
}: {
  formik: any;
  type: string;
}) => {
  const [state, setState] = useState({
    roleList: [],
    isLoadingRole: false,
  });

  const roleDelete = (id: string) => {
    const result = formik.values?.rolesSelectData.filter(
      (data: any) => data?.id !== id
    );
    formik.setFieldValue('rolesSelectData', result);
  };

  const onChnageSelectBox = (e: any) => {
    let updateRolesArray = [];

    console.log('onChnageSelectBox>>', e);

    const checkValue = formik.values?.rolesSelectData.filter(
      (data: any) => data?.id === e?.value
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

  const getRoleApi = async (type: string, search: string) => {
    setState({
      ...state,
      isLoadingRole: true,
    });

    let res = await AdminApi.getRoles();

    console.log('res>>>', res);

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      let updateList = res?.data?.data.map(
        ({ _id, role_name }: { _id: string; role_name: string }) => {
          return {
            name: role_name,
            id: _id,
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

  useEffect(() => {
    getRoleApi(type, '');
  }, []);

  return (
    <>
      <div className="relative col-span-2">
        <Input
          name="address"
          label="Select role*"
          placeholder="Select role"
          // className="col-span-2"
          onChange={formik.handleChange}
          error={formik?.errors?.address}
          value={formik.values.address}
        />
        {/* <span className={cn('block whitespace-nowrap leading-normal absolute')}>
          <PiCaretUpDown className="h-5 w-5" />
        </span> */}

        <div className="flex w-full h-30 flex-grow items-center justify-between rounded border px-3 py-3 text-black dark:bg-red-50 absolute"></div>
      </div>

      <>
        {formik?.values?.rolesSelectData?.map((role: any) => (
          <div
            className="flex w-full flex-grow items-center justify-between rounded border	px-2 py-1 text-black dark:bg-red-50"
            key={role.id}
          >
            <p>{role?.name}</p>
            <div onClick={() => roleDelete(role?.id)}>
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
    </>
  );
};

export default NewCustomSelectBox;

let rolesData: any = [
  {
    name: 'Admin',
    id: '1',
  },
  {
    name: 'Exhibitor',
    id: '2',
  },
  {
    name: 'Delegate',
    id: '3',
  },
  {
    name: 'Sponsor',
    id: '4',
  },
  {
    name: 'Speaker',
    id: '5',
  },
  {
    name: 'Media Partner',
    id: '6',
  },
];
