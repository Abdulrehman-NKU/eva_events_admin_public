import UnderlineShape from '@/components/shape/underline';
import Image from 'next/image';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import NewPasswordCreateForm from './new-password-create-form';

export default function NewPasswordCreate() {
  return (
    <AuthWrapperOne
      title={
        <>
          Create new {' '}
          <span className="relative inline-block">
            password!
            <UnderlineShape className="absolute -bottom-2 end-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      description=""
      bannerTitle=""
      bannerDescription=""
      isSocialLoginActive={false}
      pageImage={
        <div className="relative mx-auto aspect-[4.3/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={'/static/images/Group 25.png'}
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            // className="object-cover"
          />
        </div>
      }
    >
      <NewPasswordCreateForm />
    </AuthWrapperOne>
  );
}
