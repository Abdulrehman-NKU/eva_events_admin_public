import cn from '@/utils/class-names';
import dayjs from 'dayjs';

interface DateCellProps {
  startTime: Date;
  endTime: Date;
  className?: string;
  timeFormat?: string;
}

export default function DetailsTime({
  startTime,
  endTime,
  className,
  timeFormat = 'h:mm A',
}: DateCellProps) {
  function formatDate(date?: Date, format: string = 'DD MMM, YYYY'): string {
    if (!date) return '';
    return dayjs(date).format(format);
  }

  return (
    <div className={cn(className, 'grid gap-1')}>
      <time>
        {formatDate(startTime, timeFormat)}
        <span>&nbsp;To&nbsp;</span>
        {formatDate(endTime, timeFormat)}
      </time>
    </div>
  );
}
