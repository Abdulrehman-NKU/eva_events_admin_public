// @ts-nocheck

'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import UserUrl from '@/eva-components/other/UserUrl';
import InvitationBadge from '@/eva-components/other/InvitationBadge';
import SendInvite from './columnsButton/SendInvite';
import DeletePopover from './delete-popover';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { Loader } from 'rizzui';
import moment from 'moment';
import { Checkbox } from '@/components/ui/checkbox';

const getLogo = (data: any, type: string) => {
  switch (type) {
    case 'exhibitors':
      return data?.exhibitor_logo;
      break;
    case 'sponsors':
      return data?.sponsor_logo;
      break;
    case 'speakers':
      return data?.avatar;
      break;
    case 'delegates':
      return data?.avatar;
      break;
    case 'media-partners':
      return data?.logo;
      break;
  }
};

const getName = (data: any, type: string) => {
  switch (type) {
    case 'exhibitors':
      return `${data?.exhibitor_name ?? data?.first_name} `;
      break;
    case 'sponsors':
      return data?.sponsor_name;
      break;
    case 'speakers':
      return `${data?.first_name} ${data?.last_name}`;
      break;
    case 'delegates':
      return `${data?.first_name} ${data?.last_name}`;
      break;
    case 'media-partners':
      return `${data?.first_name} ${data?.last_name}`;
      break;
  }
};

const getUrl = (data: any, type: string) => {
  switch (type) {
    case 'exhibitors':
      return data?.exhibitor_URL;
      break;
    case 'sponsors':
      return data?.sponsor_URL;
      break;
    case 'speakers':
      return data?.speaker_URL;
      break;
    case 'delegates':
      return data?.delegate_URL;
      break;
    case 'media-partners':
      return data?.mediapartner_URL;
      break;
  }
};

const getLinkedinUrl = (data: any, type: string) => {
  switch (type) {
    case 'speakers':
      return data?.speaker_linkedin;
      break;
    case 'delegates':
      return data?.delegate_linkedin;
      break;
  }
};

let getColumUrlHead = (type: string) => {
  let urlTitle = `${type} URL`;

  if (type === 'media-partners') {
    urlTitle = 'URL';
  }

  if (type !== 'delegates') {
    return {
      title: <HeaderCell title={urlTitle} />,
      dataIndex: 'email',
      key: 'email',
      width: 150,
      render: (_: string, row: any) => <UserUrl url={getUrl(row, type)} />,
    };
  } else {
    return {};
  }
};

let getColumLinkedinUrlHead = (type: string) => {
  if (type === 'delegates' || type === 'speakers') {
    return {
      title: <HeaderCell title="Linkedin" />,
      dataIndex: 'email',
      key: 'email',
      width: 150,
      render: (_: string, row: any) => (
        <UserUrl url={getLinkedinUrl(row, type)} />
      ),
    };
  } else {
    return {};
  }
};

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  type: string;
};

const LastLogin = ({ type, user_id }: { type: string; user_id: string }) => {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: true,
    invitation: true,
    last_login: '',
  });

  const getInvitationApi = async (userType: string, userId: string) => {
    let pathnameArray = pathname.split('/');
    let eventId = pathnameArray[2];

    let userTypeFix = userType.substring(0, userType.length - 1);

    if (type === 'media-partners') {
      userTypeFix = 'media_partner';
    }

    let res = await EventsApiServices.getEventInvitation(eventId, {
      user_id: userId,
      user_type: userTypeFix,
    });

    if (res?.response_code) {
      setState({
        ...state,
        invitation: res?.data?.data?.invitation,
        isLoading: false,
        last_login: res?.data?.data?.invitation_data?.last_login,
      });
    }
  };

  useEffect(() => {
    getInvitationApi(type, user_id);
  }, []);

  const renderLastLogin = () => {
    if (state.last_login) {
      return moment(state.last_login).format('DD-MM-yyyy HH:mm A');
    }

    return '-';
  };

  return (
    <>
      {state.isLoading ? (
        <div>
          <Loader variant={'threeDot'} />
        </div>
      ) : (
        <div className="flex items-center capitalize">
          <Text className={`text-sm`}>{renderLastLogin()}</Text>
        </div>
      )}
    </>
  );
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  type,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'product',
    key: 'product',
    width: 200,
    hidden: 'customer',
    render: (_: string, row: any) => (
      <AvatarCard
        src={getImageUrl(getLogo(row, type))}
        name={getName(row, type)}
        avatarProps={{
          name: getName(row, type),
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Email" />,
    dataIndex: 'email',
    key: 'email',
    width: 200,
    render: (_: string, row: any) => (
      <Text className="text-sm">{row?.email}</Text>
    ),
  },

  // getColumUrlHead(type),
  // getColumLinkedinUrlHead(type),

  {
    title: <HeaderCell title="Last Login" />,
    dataIndex: 'last_login',
    key: '',
    width: 200,
    render: (_: string, row: any) => (
      <LastLogin type={type} user_id={row?._id} />
    ),
  },
  {
    title: <HeaderCell title="invitation" />,
    dataIndex: 'Invitation',
    key: 'invitation',
    width: 120,
    render: (value: string, row: any) => (
      <InvitationBadge type={type} user_id={row?._id} />
    ),
  },
  {
    title: <HeaderCell title="Send Invite" />,
    dataIndex: 'invite',
    key: 'invite',
    width: 150,
    render: (_: string, row: any) => (
      <SendInvite type={type} user_id={row?._id} />
    ),
  },

  // {
  //   title: <HeaderCell title="Send Email" />,
  //   dataIndex: 'email',
  //   key: 'email',
  //   width: 150,
  //   render: (_: string, row: any) => (
  //     <Button className="text-lightBlack w-full cursor-pointer bg-gray-100 text-sm">
  //       Send Email
  //     </Button>
  //   ),
  // },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Asigned user'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.editUser(row?._id, type)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Asigned user'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Asigned user'}
          placement="top"
          color="invert"
        >
          <Link href={routes.user.userDetailsViewViaEvent(type, row?._id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'View Asigned user'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Remove ${type} from event `}
          description={`Are you sure you want to remove ${getName(
            row,
            type
          )} ?`}
          user_id={row?._id}
          onDelete={() => onDeleteItem(row?._id)}
        />
      </div>
    ),
  },
];
