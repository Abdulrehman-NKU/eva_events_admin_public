import Image from 'next/image';
import { PiPhone } from 'react-icons/pi';
import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { customer } from '@/app/shared/logistics/customer-profile/data';
import { AiOutlineMail } from 'react-icons/ai';
import { ExhibitorDetailType } from '@/eva-components/type/propsType';
import UserProfilePhoto from '@/eva-components/userProfilePhoto/UserProfilePhoto';

export default function UserInfo({
  exhibitorDetail,
  className,
}: {
  exhibitorDetail: ExhibitorDetailType;
  className?: string;
}) {
  return (
    <>
      <div className="grid items-start gap-4 @xl:grid-cols-[80px_1fr] @2xl:grid-cols-[128px_1fr] md:gap-6 ">
        <UserProfilePhoto userData={exhibitorDetail as any} />
        <div className="grid grid-cols-2 gap-1 md:gap-1">
          <article>
            <div className="flex items-center gap-2.5">
              <Title as="h3" className="text-lg xl:text-xl">
                {`${
                  exhibitorDetail?.exhibitor_name ?? exhibitorDetail?.first_name
                }`}
              </Title>
            </div>
            <p>
              <a href={`mailto:${exhibitorDetail?.email}`}>
                {exhibitorDetail?.email}
              </a>
            </p>
          </article>
          <article className="flex flex-wrap items-center justify-end gap-3">
            {exhibitorDetail?.phone && (
              <a
                href={`tel:+${exhibitorDetail?.phone_country_code}${exhibitorDetail?.phone}`}
              >
                <Button variant="outline" className="flex items-center gap-1">
                  <PiPhone size={18} />
                  Call
                </Button>
              </a>
            )}

            <a href={`mailto:${exhibitorDetail?.email}`}>
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
