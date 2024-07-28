import cn from '@/utils/class-names';
import InfoSideBar from '../navigation/InfoSideBar';

interface FormGroupProps {
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function InfoLayout({
  className,

  children,
}: FormGroupProps) {
  return (
    <div className={cn('grid gap-5 @3xl:grid-cols-12', className)}>
      <div className="col-span-2  max-md:col-span-full  max-3xl:col-span-4  max-4xl:col-span-3 " >
        <InfoSideBar />
      </div>
      {children && (
        <div className="col-span-full grid gap-4 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
          {children}
        </div>
      )}
    </div>
  );
}
