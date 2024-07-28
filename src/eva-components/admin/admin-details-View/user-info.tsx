import Image from 'next/image';
import { PiPhone } from 'react-icons/pi';
import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { AiOutlineMail } from 'react-icons/ai';
import { AdminDetailType, AdminType } from '@/eva-components/type/propsType';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './UserInfo.module.scss';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

export default function UserInfo({
  adminDetail,
  className,
}: {
  adminDetail: AdminDetailType;
  className?: string;
}) {
  return (
    <>
      <div className="grid items-start gap-4 @xl:grid-cols-[80px_1fr] @2xl:grid-cols-[128px_1fr] md:gap-6 ">
        <div>
          <figure
            className={`relative -mt-8 h-20 w-20 rounded-full border-4 border-white drop-shadow  @2xl:h-32 @2xl:w-32  ${styles.profile_image}`}
          >
            {/* <span className="absolute bottom-1.5 right-1.5 z-10 h-3 w-3 rounded-full border-2 border-white bg-[#11A849] @2xl:bottom-2.5 @2xl:right-2.5 @3xl:h-4 @3xl:w-4 @4xl:bottom-2 @4xl:right-2" /> */}

            {adminDetail?.profile_image ? (
              <Image
                src={getImageUrl(adminDetail?.profile_image)}
                alt=""
                fill
                priority
                className="cover rounded-full bg-gray-100		"
              />
            ) : (
              <div className={styles.demo_image}>
                <AccountCircleIcon />
              </div>
            )}
          </figure>
        </div>
        <div className="grid grid-cols-2 gap-1 md:gap-1">
          <article>
            <div className="flex items-center gap-2.5">
              <Title as="h3" className="text-lg xl:text-xl">
                {`${adminDetail?.first_name} ${adminDetail?.last_name}`}
              </Title>
            </div>
            <p>
              <a href={`mailto:${adminDetail?.email}`}>{adminDetail?.email}</a>
            </p>
          </article>
          <article className="flex flex-wrap items-center justify-end gap-3">
            {adminDetail?.phone && (
              <a
                href={`tel:+${adminDetail?.phone_country_code}${adminDetail?.phone}`}
              >
                <Button variant="outline" className="flex items-center gap-1">
                  <PiPhone size={18} />
                  Call
                </Button>
              </a>
            )}

            <a href={`mailto:${adminDetail?.email}`}>
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
