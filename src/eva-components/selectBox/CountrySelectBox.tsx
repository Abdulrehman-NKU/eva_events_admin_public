import React from 'react';
import Select from '@/components/ui/select';
import { PiCaretUpDown } from 'react-icons/pi';
import { countries } from '../CountriesSelecteData';

const CountrySelectBox = ({
  formik,
  label,
}: {
  formik: any;
  label?: string;
}) => {
  const onChangeCountry = (selectedCountry: any) => {
    formik.setFieldValue('country', selectedCountry);
  };
  const countriesOptions = countries.map((country) => ({
    value: country.country_name,
    name: country.country_name,
  }));
  return (
    <div>
      <Select
        name="country"
        label={label || 'Country'}
        placeholder=" Select country"
        labelClassName="text-gray-900"
        dropdownClassName="p-2 gap-1 grid"
        value={formik.values.country}
        onChange={onChangeCountry}
        options={countriesOptions}
        getOptionValue={(option) => option.value}
        suffix={<PiCaretUpDown className="h-5 w-5" />}
        displayValue={(selected) =>
          countriesOptions.find((c) => c.value === selected)?.name ?? ''
        }
        error={formik?.errors?.country}
      />
    </div>
  );
};

export default CountrySelectBox;
