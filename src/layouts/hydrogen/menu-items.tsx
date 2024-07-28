import { routes } from '@/config/routes';
import {
  PiUserDuotone,
  PiHouseLine,
  PiHeadset,
  PiFolderLock,
  PiCalendarPlus,
  PiListNumbers,
  PiUserGear,
} from 'react-icons/pi';

export const menuItems = [
  {
    name: 'My Staff',
  },
  // {
  //   name: 'Dashboard',
  //   href: routes.dashboard,
  //   icon: <PiFolderNotchDuotone />,
  // },
  {
    name: 'Staff Users',
    href: routes.user.admin,
    icon: <PiHeadset />,
  },
  {
    name: 'Staff Roles',
    href: routes.staffRoles,
    icon: <PiFolderLock />,
  },
  {
    name: 'Staff Permissions',
    href: routes?.staffPermissions,
    icon: <PiFolderLock />,
  },

  {
    name: 'The Event',
  },
  {
    name: 'Events',
    href: routes.event.events,
    icon: <PiCalendarPlus />,
  },
  {
    name: 'Hotels',
    href: routes.event.hotelsList,
    icon: <PiHouseLine />,
  },
  {
    name: 'Industries',
    href: routes.industries.industries,
    icon: <PiListNumbers />,
  },

  // {
  //   name: 'Users',
  //   href: '#',
  //   icon: <UserColorIcon />,
  //   dropdownItems: [
  //     {
  //       name: 'Admins',
  //       href: routes.user.admin,
  //       icon: <PiUserDuotone />,
  //     },
  //     {
  //       name: 'Exhibitors',
  //       href: routes.user.exhibitors,
  //       icon: <PiUserDuotone />,
  //     },
  //     {
  //       name: 'Delegates',
  //       href: routes.user.delegates,
  //       icon: <PiUserDuotone />,
  //     },
  //     {
  //       name: 'Sponsors',
  //       href: routes.user.sponsors,
  //       icon: <PiUserDuotone />,
  //     },
  //     {
  //       name: 'Speakers',
  //       href: routes.user.speakers,
  //       icon: <PiUserDuotone />,
  //     },
  //     {
  //       name: 'Media Partners',
  //       href: routes.user.mediaPartners,
  //       icon: <PiUserDuotone />,
  //     },
  //   ],
  // },

  {
    name: 'The People',
  },
  {
    name: 'Delegates',
    href: routes.user.delegates,
    icon: <PiUserDuotone />,
  },
  {
    name: 'Speakers',
    href: routes.user.speakers,
    icon: <PiUserDuotone />,
  },
  {
    name: 'Exhibitors',
    href: routes.user.exhibitors,
    icon: <PiUserDuotone />,
  },
  {
    name: 'Sponsors',
    href: routes.user.sponsors,
    icon: <PiUserDuotone />,
  },
  {
    name: 'Media Partners',
    href: routes.user.mediaPartners,
    icon: <PiUserDuotone />,
  },

  {
    name: 'Settings',
  },
  {
    name: 'My Admin Profile',
    href: routes?.myProfile?.profileSetting,
    icon: <PiUserGear />,
  },
  {
    name: 'Profile Survey',
    href: routes.profileSurvey.profilesurvey,
    icon: <PiUserGear />,
  },
  // {
  //   name: 'ProfileSurvey',
  //   href: routes.profileSurveyNew.profileSurveyNew,
  //   icon: <PiUserGear />,
  // },

  {
    name: 'Companies',
    href: routes.companies.companie,
    icon: <PiUserGear />,
  },
];
