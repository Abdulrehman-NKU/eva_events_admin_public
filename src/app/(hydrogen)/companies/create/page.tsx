import React from 'react';
import CompaniesEventCreateForm from '@/eva-components/companies/form/CompaniesEventCreateForm';
import PageHeader from '@/eva-components/page-header';

const pageHeader = {
  title: 'Create Company',
};

const Company = () => {
  return (
    <>
      <PageHeader title={pageHeader.title}>
        {/* <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link> */}
      </PageHeader>
      <CompaniesEventCreateForm />
    </>
  );
};

export default Company;
