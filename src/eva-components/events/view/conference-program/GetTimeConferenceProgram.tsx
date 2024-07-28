import cn from '@/utils/class-names';
import dayjs from 'dayjs';

interface DateCellProps {
  time_from:Date;
  time_to: Date;
  timeFormat?: string;
}

export default function GetTimeConferenceProgram({
  time_from,
  time_to,
  timeFormat = 'h:mm A',
}: DateCellProps) {
  function formatDate(date?: Date, format: string = 'DD MMM, YYYY'): string {
    if (!date) return '';
    return dayjs(date).format(format);
  }

  return (
    <div className={cn('grid gap-1')}>
      <time className={cn('text-[13px] text-gray-500')}>
        {formatDate(time_from, timeFormat)}
        <span>&nbsp;To&nbsp;</span>
        {formatDate(time_to, timeFormat)}
      </time>
    </div>
  );
}
