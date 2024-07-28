import cn from '@/utils/class-names';
import { Title, Text } from '@/components/ui/text';
import { Avatar, AvatarProps } from '@/components/ui/avatar';
import Link from 'next/link';
import { routes } from '@/config/routes';

interface AvatarCardProps {
  src: string;
  name: string;
  className?: string;
  description?: string;
  avatarProps?: AvatarProps;
  event_id?: string;
}

export default function AvatarCard({
  src,
  name,
  className,
  description,
  avatarProps,
  event_id = '#',
}: AvatarCardProps) {
  console.log('>>>src', src);

  return (
    <Link href={routes.event.eventDetails(event_id)}>
      <figure className={cn('flex items-center gap-3', className)}>
        <Avatar name={name} src={src} {...avatarProps} />
        <figcaption className="grid gap-0.5">
          <Text className="font-lexend text-sm font-medium text-gray-900 hover:text-blue-500 dark:text-gray-700">
            {name}
          </Text>
          {description && (
            <Text className="text-[13px] text-gray-500">{description}</Text>
          )}
        </figcaption>
      </figure>
    </Link>
  );
}
