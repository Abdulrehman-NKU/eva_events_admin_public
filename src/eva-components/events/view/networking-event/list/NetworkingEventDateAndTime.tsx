import cn from '@/utils/class-names';
import dayjs from 'dayjs';

interface DateCellProps {
  date: Date;
  startTime: Date;
  endTime: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
}

export default function NetworkingEventDateAndTime({
  date,
  startTime,
  endTime,
  className,
  timeClassName,
  dateClassName,
  dateFormat = 'MMMM D, YYYY',
  timeFormat = 'h:mm A',
}: DateCellProps) {
  function formatDate(date?: Date, format: string = 'DD MMM, YYYY'): string {
    if (!date) return '';
    return dayjs(date).format(format);
  }

  return (
    <div className={cn(className, 'grid gap-1')}>
      <time
        dateTime={formatDate(date, 'YYYY-MM-DD')}
        className={cn('font-medium text-gray-700', dateClassName)}
      >
        {formatDate(date, dateFormat)}
      </time>
      <time
        dateTime={formatDate(date, 'HH:mm:ss')}
        className={cn('text-[13px] text-gray-500', timeClassName)}
      >
        {formatDate(startTime, timeFormat)}
        <span>&nbsp;To&nbsp;</span>
        {formatDate(endTime, timeFormat)}
      </time>
    </div>
  );
}
