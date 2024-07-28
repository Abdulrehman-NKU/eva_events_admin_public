'use client';
// import FileDashboard from '@/app/shared/file/dashboard';
// import { metaObject } from '@/config/site.config';

// export const metadata = {
//   ...metaObject(),
// };

// export default function FileDashboardPage() {
//   return <FileDashboard />;
// }

import { routes } from '@/config/routes';
import { AuthHelpers } from '@/helpers/auth.helpers';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isAccessTokenValid = AuthHelpers.validateAccessToken();

    if (isAccessTokenValid) {
      router.replace(routes.dashboard);
    }
  }, []);

  return <div>Home Page</div>;
};

export default Dashboard;
