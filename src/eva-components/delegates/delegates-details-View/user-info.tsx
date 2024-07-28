import Image from 'next/image';
import { PiPhone } from 'react-icons/pi';
import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { customer } from '@/app/shared/logistics/customer-profile/data';
import { AiOutlineMail } from 'react-icons/ai';
import { DelegateDetailType } from '@/eva-components/type/propsType';
import UserProfilePhoto from '@/eva-components/userProfilePhoto/UserProfilePhoto';

export default function UserInfo({
  delegateDetail,
  className,
}: {
  delegateDetail: DelegateDetailType;
  className?: string;
}) {
  return (
    <>
      <div className="grid items-start gap-4 @xl:grid-cols-[80px_1fr] @2xl:grid-cols-[128px_1fr] md:gap-6 ">
        {/* <figure className="relative -mt-8 h-20 w-20 rounded-full border-4 border-white drop-shadow  @2xl:h-32 @2xl:w-32 ">
          <span className="absolute bottom-1.5 right-1.5 z-10 h-3 w-3 rounded-full border-2 border-white bg-[#11A849] @2xl:bottom-2.5 @2xl:right-2.5 @3xl:h-4 @3xl:w-4 @4xl:bottom-2 @4xl:right-2" />
          <Image
            src={delegateDetail?.avatar ?? ""}
            alt=""
            fill
            priority
            className="rounded-full bg-gray-100"
          />
        </figure> */}

        <UserProfilePhoto userData={delegateDetail as any} />
        <div className="grid grid-cols-2 gap-1 md:gap-1">
          <article>
            <div className="flex items-center gap-2.5">
              <Title as="h3" className="text-lg xl:text-xl">
                {`${delegateDetail?.first_name} ${delegateDetail?.last_name}`}
              </Title>
            </div>
            <p>
              <a href={`mailto:prakashkalsariya1999@gmail.com`}>
                {delegateDetail?.email}
              </a>
            </p>
          </article>
          <article className="flex flex-wrap items-center justify-end gap-3">
            {delegateDetail?.phone && (
              <a
                href={`tel:+${delegateDetail?.phone_country_code}${delegateDetail?.phone}`}
              >
                <Button variant="outline" className="flex items-center gap-1">
                  <PiPhone size={18} />
                  Call
                </Button>
              </a>
            )}

            <a href={`mailto:${delegateDetail?.email}`}>
              <Button variant="outline" className="flex items-center gap-1">
                <AiOutlineMail size={18} />
                Email
              </Button>
            </a>
          </article>
        </div>
      </div>
    </>
  );
}
