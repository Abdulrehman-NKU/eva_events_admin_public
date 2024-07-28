import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import SignUpForm from './sign-up-form';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(''),
};

export default function SignUpPage() {
  return (
    <AuthWrapperFour
      title="Welcome to our site! Please Sign in to continue."
      isSocialLoginActive={false}
    >
      <SignUpForm />
    </AuthWrapperFour>
  );
}
