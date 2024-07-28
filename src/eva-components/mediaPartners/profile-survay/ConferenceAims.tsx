'use client';

import React, { useState } from 'react';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { Checkbox } from '@/components/ui/checkbox';
const ConferenceAims = () => {
  const [values, setValues] = useState<string[]>([]);

  return (
    <>
      <div className=" mt-16">
        <div className="font-inter text-xl font-semibold text-black">
          <p>Conference Aims</p>
        </div>
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            className="mt-14 grid  gap-10 lg:grid-cols-2"
          >
            <Checkbox
              name="app_notification"
              label="Learning / Education at the conference program"
              value="news_updates"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="One-to-One meetings with existing customers"
              value="tips_tutorials"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="To discover new aviation products and services"
              value="user_research"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="One-to-One meetings with potential customers"
              value="meetings"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Promoting a specific product or service"
              value="specific"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="General networking with industry business connections"
              value="networking"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="New business and lead generation"
              value="business"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Procuring new GSE equipment "
              value="Procuring"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
          </CheckboxGroup>
        </div>
      </div>
      <div className="mt-24">
        <div className="font-inter text-xl font-semibold text-black">
          <p>Which region are you responsible for? </p>
        </div>
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            className="mt-14 grid  grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5"
          >
            <Checkbox
              name="app_notification"
              label="Africa"
              value="news_updates"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Europe"
              value="tips_tutorials"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="SE Asia"
              value="user_research"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Caribbean"
              value="meetings"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="South America"
              value="specific"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Middle East"
              value="networking"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="North America"
              value="business"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Australia & Pacific"
              value="Procuring"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Global"
              value="Global"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Asia"
              value="Asia"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
          </CheckboxGroup>
        </div>
      </div>
      <div className="mt-24">
        <div className="font-inter text-xl font-semibold text-black">
          <p>What are of handling are you involved in?</p>
        </div>
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            className="mt-14 grid  grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            <Checkbox
              name="app_notification"
              label="Cargo"
              value="Cargo"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Passenger"
              value="Passenger"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Ramp"
              value="Ramp"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
          </CheckboxGroup>
        </div>
      </div>
      <div className="mt-24">
        <div className="font-inter text-xl font-semibold text-black">
          <p>What are your responsibilities?</p>
        </div>
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            className="mt-14 grid  grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
          >
            <Checkbox
              name="app_notification"
              label="Cargo Procurement"
              value="news_updates"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Finance / Banking / Legal"
              value="tips_tutorials"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Ground Service Provider"
              value="user_research"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Contract Management"
              value="meetings"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Ground Handling Services Procurement "
              value="specific"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="GSE Procurement"
              value="networking"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="HR"
              value="business"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="IT Procurement"
              value="Procuring"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Operations"
              value="Global"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Planning / Strategy"
              value="Asia"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Operations"
              value="Global"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Planning / Strategy"
              value="Planning / Strategy"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Project Management"
              value="Project Management"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Purchasing"
              value="Purchasing"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Safety"
              value="Safety"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Sales / Marketing"
              value="Sales / Marketing"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Section Management"
              value="Section Management"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
            <Checkbox
              name="app_notification"
              label="Training"
              value="Training"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
            />
          </CheckboxGroup>
        </div>
      </div>
    </>
  );
};

export default ConferenceAims;
