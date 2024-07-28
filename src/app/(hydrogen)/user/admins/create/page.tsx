import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateAdminForm from '@/eva-components/admin/CreateAdminForm';

const pageHeader = {
  title: 'Add Admin',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'User',
    },
    {
      href: routes.eCommerce.products,
      name: 'Admin',
    },
    {
      name: 'Create',
    },
  ],
};

const CreateAdmin = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
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
      <CreateAdminForm/>
        {/* <CreateEditProduct /> */}
    </>
  );
};

export default CreateAdmin;
