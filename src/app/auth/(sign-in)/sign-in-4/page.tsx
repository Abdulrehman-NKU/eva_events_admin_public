import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import SignInForm from './sign-in-form';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(''),
};

export default function SignInPage() {
  return (
    <AuthWrapperFour
      title={
        <>
          Welcome Back! <br /> Sign in with your credentials.
        </>
      }
      isSignIn
      isSocialLoginActive={false}
    >
      <SignInForm />
    </AuthWrapperFour>
  );
}
