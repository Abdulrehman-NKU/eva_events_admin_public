import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import ProfileSettingsNavBar from '@/eva-components/profile/ProfileSettingsNavBar';

const pageHeader = {
  title: 'Account Settings',
  breadcrumb: [],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNavBar/>
      {children}
    </>
  );
}
