export default function DetailsDate({ date }: { date: string }) {
  const getDate = (eventDate: string) => {
    let dateFilterArray = new Date(eventDate).toString().split(' ');
    let weekday = new Date(eventDate).getDay();
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = weekdays[weekday];
    let date = `${dateFilterArray[2]}`;
    let month = `${dateFilterArray[1]}`;
    let year = `${dateFilterArray[3]}`;
    let filterDate = `${day}, ${date} ${month} ${year}`;
    return filterDate;
  };

  return <>{getDate(date)}</>;
}
