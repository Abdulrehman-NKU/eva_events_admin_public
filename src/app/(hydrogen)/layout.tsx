'use client';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

import { useIsMounted } from '@/hooks/use-is-mounted';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { useEffect } from 'react';
import { AuthHelpers } from '@/helpers/auth.helpers';
import { AuthApi } from 'utils/api/Auth';
import ResponseCodes from 'utils/response-codes';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  const logOutApi = () => {
    localStorage.clear();
    signOut();
  };

  useEffect(() => {
    let tokenHandle = AuthHelpers?.validateAccessToken();
    if (!tokenHandle) {
      logOutApi();
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  if (layout === LAYOUT_OPTIONS.HELIUM) {
    return <HeliumLayout>{children}</HeliumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.LITHIUM) {
    return <LithiumLayout>{children}</LithiumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
    return <BerylLiumLayout>{children}</BerylLiumLayout>;
  }

  return (
    <HydrogenLayout>
      <Provider store={store}>{children}</Provider>
    </HydrogenLayout>
  );
}
