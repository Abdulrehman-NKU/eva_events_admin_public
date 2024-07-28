import PageHeader from '@/app/shared/page-header';
import SpeakersForm from '@/eva-components/speakers/SpeakersForm';
import React from 'react';

const CreateSpeakers = () => {
  const pageHeader = {
    title: 'Create Speakers',
    breadcrumb: [],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <Link href={routes.user.createAdmin} className="w-full @lg:w-auto">
              <Button
                tag="span"
                className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Add Admin
              </Button>
            </Link>
          </div> */}
      </PageHeader>

      {/* <ProductsTable data={productsData} /> */}
      <SpeakersForm />
    </>
  );
};

export default CreateSpeakers;
