/* eslint-disable @next/next/no-img-element */

'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { PhoneNumber } from '@/components/ui/phone-input';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import cn from '@/utils/class-names';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SelectBox from '@/components/ui/select';
import { roles } from '@/data/forms/my-details';
import { Button } from '@/components/ui/button';

interface AddressInfoProps {
  type: string;
  title?: string;
  className?: string;
}

export default function AddressInfo({
  type,
  title,
  className,
}: AddressInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
    console.log('Selected file:', selectedFile);
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = '';
    }
  };

  return (
    <>
      {title && (
        <Title as="h3" className="col-span-full font-semibold">
          {title}
        </Title>
      )}
      <div>
        <p>Update your photo and personal details here</p>
      </div>
      <div
        className={cn('grid gap-3 @lg:gap-4 @2xl:mt-7 @2xl:gap-8', className)}
      >
        <div className="grid grid-cols-1 gap-3 @lg:gap-4 @2xl:grid-cols-3">
          <div>
            <h5>Name</h5>
          </div>
          <Input
            placeholder="First Name"
            {...register(`${type}.firstName`)}
            // @ts-ignore
            error={errors?.[type]?.firstName?.message as any}
          />
          <Input
            placeholder="Last Name"
            {...register(`${type}.lastName`)}
            // @ts-ignore
            error={errors?.[type]?.lastName?.message as any}
          />
        </div>
        <div className="border-t border-gray-200"></div>

        <div className="grid grid-cols-1 gap-3 @lg:gap-4 @2xl:grid-cols-3">
          <div>
            <h5>Contact Info</h5>
          </div>
          <Controller
            name={`${type}.phoneNumber`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <PhoneNumber
                country="us"
                value={value}
                onChange={onChange}
                // @ts-ignore
                error={errors?.[type]?.phoneNumber?.message as string}
              />
            )}
          />
          <Input
            placeholder="Email"
            {...register(`${type}.email`)}
            // @ts-ignore
            error={errors?.[type]?.email?.message as string}
          />
        </div>
        <div className="border-t border-gray-200"></div>

        <div className="grid grid-cols-1 gap-3 @lg:gap-4 @2xl:grid-cols-3">
          <div>
            <h5>Upload Photo</h5>
            <p className="pt-1 text-sm">
              This will be displayed on your profile
            </p>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="fileInput"
              className="relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border border-gray-200 @2xl:h-40 @2xl:w-40"
            >
              {selectedPhoto ? (
                <>
                  <img
                    src={selectedPhoto}
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
              />
            </label>
            {selectedPhoto && (
              <button
                className="ml-2 rounded-full bg-white p-1"
                onClick={handleRemovePhoto}
              >
                <DeleteForeverIcon />
              </button>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        <div className="grid grid-cols-1 gap-3 @lg:gap-4 @2xl:grid-cols-3">
          <div>
            <h5>Role</h5>
          </div>
          <Controller
            control={control}
            name="role"
            render={({ field: { value, onChange } }) => (
              <SelectBox
                placeholder="Select Role"
                options={roles}
                onChange={onChange}
                value={value}
                // className="col-span-full"
                getOptionValue={(option) => option.value}
                displayValue={(selected) =>
                  roles?.find((r) => r.value === selected)?.name ?? ''
                }
                error={errors?.role?.message as string}
              />
            )}
          />
        </div>
        <div className="border-t border-gray-200"></div>

        <div className="flex cursor-pointer justify-end gap-2">
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
          <Button
            tag="span"
            className="w-full bg-black text-white @lg:w-auto"
            variant="outline"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
