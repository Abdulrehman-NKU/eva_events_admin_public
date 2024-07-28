'use client';

import { useCallback, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TrashIcon from '@/components/icons/trash';
import { ActionIcon } from '@/components/ui/action-icon';
import { customFields } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import { PiPlusBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { eventLocationAction } from '../../../redux/slice/eventLocation';
interface CustomField {
  id: any;
}

export interface eventLocation {
  location_code: string;
  location_name: string;
  id: string;
}
export default function CustomFields() {
  // const { control, register } = useFormContext();

  // const { fields, append, remove } = useFieldArray({
  //   name: 'customFields',
  const dispatch = useDispatch();
  let eventLocationArray = useSelector(
    (state: any) => state?.eventLocation?.eventLocationArray
  );
  // });
  const [fields, setFields] = useState<CustomField[]>([]);

  const addCustomField = () => {
    // setFields([...fields, { id: fields.length }]);
    dispatch(eventLocationAction.addEventLocationArray());
  };

  const removeCustomField = (removeId: string) => {
    // setFields(fields.filter((_, i) => i !== index));
    dispatch(eventLocationAction?.removeLocation({ remove_id: removeId }));
  };

  console.log('eventLocationArray>>>', eventLocationArray);

  const onChangeLocationName = (e: any, id: string) => {
    dispatch(
      eventLocationAction?.setLocationName({
        locationName: e.target.value,
        setId: id,
      })
    );
  };

  const onChangeLocationCode = (e: any, id: string) => {
    dispatch(
      eventLocationAction?.setLocationCode({
        locationCode: e.target.value,
        setId: id,
      })
    );
  };

  // const addCustomField = useCallback(() => append([...customFields]), [append]);

  return (
    <>
      {eventLocationArray.map((location: eventLocation) => (
        <div key={location?.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="Location Name"
            placeholder={`Location Name ${location?.id}`}
            className="flex-grow"
            onChange={(e) => onChangeLocationName(e, location?.id)}
          />
          <Input
            label="Location Code"
            placeholder={`Location code ${location?.id}`}
            className="flex-grow"
            onChange={(e) => onChangeLocationCode(e, location?.id)}
          />
          {location?.id > '1' && (
            <ActionIcon
              onClick={() => removeCustomField(location?.id)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} />
        And New Location
      </Button>
    </>
  );
}
