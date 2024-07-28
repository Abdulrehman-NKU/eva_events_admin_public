import Image from 'next/image';
import { PiPhone } from 'react-icons/pi';
import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { customer } from '@/app/shared/logistics/customer-profile/data';
import { AiOutlineMail } from 'react-icons/ai';
import { SponsorsDetailType } from '@/eva-components/type/propsType';
import UserProfilePhoto from '@/eva-components/userProfilePhoto/UserProfilePhoto';

export default function UserInfo({
  sponsorsDetail,
}: {
  sponsorsDetail: SponsorsDetailType | null;
}) {
  return (
    <>
      <div className="grid items-start gap-4 @xl:grid-cols-[80px_1fr] @2xl:grid-cols-[128px_1fr] md:gap-6 ">
        <UserProfilePhoto userData={sponsorsDetail as any} />
        <div className="grid grid-cols-2 gap-1 md:gap-1">
          <article>
            <div className="flex items-center gap-2.5">
              <Title as="h3" className="text-lg xl:text-xl">
                {`${sponsorsDetail?.representative_firstname} ${sponsorsDetail?.representative_lastname}`}
              </Title>
            </div>
            <p>
              <a href={`mailto:${sponsorsDetail?.email}`}>
                {sponsorsDetail?.email}
              </a>
            </p>
          </article>
          <article className="flex flex-wrap items-center justify-end gap-3">
            {sponsorsDetail?.phone && (
              <a
                href={`tel:+${sponsorsDetail?.phone_country_code}${sponsorsDetail?.phone}`}
              >
                <Button variant="outline" className="flex items-center gap-1">
                  <PiPhone size={18} />
                  Call
                </Button>
              </a>
            )}

            <a href={`mailto:${sponsorsDetail?.email}`}>
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
