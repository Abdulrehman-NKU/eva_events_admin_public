import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import ScheduleDateAndTime from './ScheduleDateAndTime';
import styles from './ViewScheduleTable.module.scss';

const ViewScheduleTable = ({ listsData }: { listsData: any[] }) => {
  let rescheduleMeetingModalId = useSelector(
    (state: RootState) => state?.usersList?.rescheduleMeetingModalId
  );
  const getLableDate = (lableDate: string) => {
    let momentDateArray = moment(lableDate).format('MMMM Do YYYY')?.split(' ');
    let dateFilterArray = new Date(lableDate)?.toString()?.split(' ');

    return `${dateFilterArray[0]} ${momentDateArray[1]} ${momentDateArray[0]}`;
  };

  // const getLoginUserStatusUi = (requestedUsersList: any) => {
  //   let user_id = LocalStorageHelpers?.getUserId();
  //   let result = requestedUsersList.filter(
  //     (list: any) => list?.user_id == user_id
  //   );
  //   let userStatus = result[0]?.meeting_status;
  //   return <p className={`${userStatus}_color`}>{userStatus}</p>;
  // };

  const getUserName = (data: any) => {
    let userName;

    if (data?.first_name) {
      userName = `${data?.first_name} ${data?.last_name}`;
    } else {
      userName = data?.sponsor_name;
    }
    return userName;
  };
  console.log('listsData>>', listsData);

  return (
    <>
      <div className="users-meetings-list-page">
        <div className={styles.view_schedule_main_contain}>
          <table className={styles.customers}>
            <thead>
              <tr>
                <th
                  className="time-column"
                  style={{
                    width: 200,
                  }}
                >
                  Time
                </th>
                <th>Requestor</th>
                <th>Details</th>
                {/* <th>Status</th> */}
                {/* <th></th> */}
              </tr>
            </thead>

            {listsData?.map((list) => (
              <tbody key={list?.date}>
                <div className={styles.date_text}>
                  {/* <p>Tues 22nd February</p> */}
                  <p>{getLableDate(list?.date)}</p>
                </div>

                {list?.meetings?.map((meeting: any) => (
                  <tr key={meeting?._id}>
                    <td>
                      <div className={styles.meeting_time_container}>
                        <ScheduleDateAndTime
                          meeting_start_time={meeting?.meeting_start_time}
                          meeting_end_time={meeting?.meeting_end_time}
                        />
                      </div>
                    </td>

                    <td>
                      <div className={styles.meeting_name_contain}>
                        <p className={styles.name}>
                          {`${meeting?.requestor_first_name} ${meeting?.requestor_last_name}`}
                        </p>
                        <p className={styles.company_name}>
                          {meeting?.requestor_company_name || '-'}
                        </p>
                      </div>
                    </td>

                    <td>
                      <div className={styles.event_program_info}>
                        <div className={styles.meeting_names_container}>
                          {meeting?.requested_users_details?.map(
                            (requested_user: any) => (
                              <div
                                className={styles.meeting_name_contain}
                                key={requested_user?._id}
                              >
                                <p className={styles.name}>
                                  {getUserName(requested_user)}
                                  {/* Prakash kalsariya */}
                                </p>
                                <p className={styles.company_name}>
                                  {requested_user?.company_name || '-'}
                                </p>
                              </div>
                            )
                          )}
                        </div>

                        <p className={styles.comments}>
                          {meeting?.meeting_notes}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
      {/* {rescheduleMeetingModalId && <RescheduleMeetingModal />} */}
    </>
  );
};

export default ViewScheduleTable;
