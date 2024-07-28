import { Title } from '@/components/ui/text';
import Breadcrumb from '@/components/ui/breadcrumb';
import cn from '@/utils/class-names';

export type PageHeaderTypes = {
  title: string;
  className?: string;
};

export default function PageHeader({
  title,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="mt-5 flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          <Title as="h2" className="text-[22px] lg:text-2xl 4xl:text-[26px]">
            {title}
          </Title>
        </div>
        {children}
      </div>
    </header>
  );
}
