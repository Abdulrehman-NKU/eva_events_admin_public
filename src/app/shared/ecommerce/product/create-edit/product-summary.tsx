import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { DatePicker } from '@/components/ui/datepicker';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Basic information"
      description="Add basic information for the event here"
      className={cn(className)}
    >
      <Input
        label="Name"
        placeholder="Name"
        {...register('name')}
        error={errors.name?.message as string}
      />
      <div className="[&>.react-datepicker-wrapper]:w-full">
        <Controller
          name="createDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              inputProps={{ label: 'Event Date' }}
              placeholderText="Select Date"
              selected={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      {/* <Input
        label="Event Date*"
        placeholder="Event Date"
        {...register('sku')}
        error={errors.sku?.message as string}
      /> */}

      {/* <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={typeOption}
            value={value}
            onChange={onChange}
            label="Product Type"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />

      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Categories"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      /> */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
}
