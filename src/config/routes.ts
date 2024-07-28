export const routes = {
  eCommerce: {
    dashboard: '/ecommerce',
    products: '/ecommerce/products',
    createProduct: '/ecommerce/products/create',
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: '/ecommerce/orders',
    createOrder: '/ecommerce/orders/create',
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: '/ecommerce/reviews',
    shop: '/ecommerce/shop',
    cart: '/ecommerce/cart',
    checkout: '/ecommerce/checkout',
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },

  // users: {
  //   dashboard: '/users',
  //   admins: '/users',
  //   exhibitors: '/users',
  //   delegates: '/users',
  //   sponsors: '/users',
  //   speakers: '/users',
  //   mediaPartners: '/users',
  // },
  searchAndFilter: {
    realEstate: '/search/real-estate',
    nft: '/search/nft',
    flight: '/search/flight',
  },

  event: {
    events: '/events',
    createEvents: '/events/create',
    eventDetails: (event_id: string) => `/events/${event_id}/event-details`,
    eventExhibitors: (event_id: string) => `/events/${event_id}/exhibitors`,
    eventSponsors: (event_id: string) => `/events/${event_id}/sponsors`,
    eventDelegates: (event_id: string) => `/events/${event_id}/delegates`,
    eventSpeakers: (event_id: string) => `/events/${event_id}/speakers`,
    eventMediapartners: (event_id: string) =>
      `/events/${event_id}/mediapartners`,
    eventgalleries: (event_id: string) => `/events/${event_id}/event-galleries`,
    eventDetailView: (event_id: string, type: string) =>
      `/events/${event_id}/${type}`,
    editEvent: (event_id: string) => `/events/edit/${event_id}`,
    createHotel: '/events/hotels/create',
    editHotel: (id: string) => `/events/hotels/edit/${id}`,
    createNetworkingEvent: (event_id: string) =>
      `/events/${event_id}/networking-events/create`,
    editNetworkingEvent: (id: string) => `/events/networking-event/edit/${id}`,
    hotelDetailView: (id: string, type: string) =>
      `/events/hotels/${id}/${type}`,
    networkingEventView: (
      events_id: string,
      networking_event_id: string,
      type: string
    ) =>
      `/events/${events_id}/networking-events/view/${networking_event_id}/${type}`,

    conferenceProgramsEventView: (
      events_id: string,
      conference_program_id: string,
      type: string
    ) =>
      `/events/${events_id}/conference-program/view/${conference_program_id}/${type}`,

    hotelsList: '/events/hotels',
    eventUserInfo: (id: string, user_type: string, route_type: string) =>
      `/events/${id}/${user_type}?info=${route_type}`,
    conferenceProgramDateView: (event_id: string, date: string) =>
      `/events/${event_id}/conference-program?date=${date}`,
  },

  myProfile: {
    profileSetting: '/profile/profile-settings',
    changePassword: '/profile/change-password',
  },

  industries: {
    industries: '/industries',
    createindustries: '/industries/create',
  },

  user: {
    admin: '/user/admins',
    createAdmin: '/user/admins/create',
    exhibitors: '/user/exhibitors',
    createexhibitors: '/user/exhibitors/create',
    delegates: '/user/delegates',
    createdelegates: '/user/delegates/create',
    sponsors: '/user/sponsors',
    createsponsors: '/user/sponsors/create',
    speakers: '/user/speakers',
    createspeakers: '/user/speakers/create',
    mediaPartners: '/user/media-partners',
    createmediaPartners: '/user/media-partners/create',
    admindetailsview: (id: string) => `/user/admins/${id}/admin-details`,
    exhibitordetailsview: (id: string) =>
      `/user/exhibitors/${id}/exhibitors-details`,
    eventexhibitorlist: (id: string) =>
      `/user/exhibitors/${id}/exhibitors-events`,
    delegatesdetailsview: (id: string) =>
      `/user/delegates/${id}/delegates-details`,
    eventedelegateslist: (id: string) =>
      `/user/delegates/${id}/delegates-events`,
    speakersdetailsview: (id: string) =>
      `/user/speakers/${id}/speakers-details`,
    eventespeakerslist: (id: string) => `/user/speakers/${id}/speakers-events`,
    mediaPartnerdetailsview: (id: string) =>
      `/user/media-partners/${id}/media-partners-details`,
    eventemediaPartnerlist: (id: string) =>
      `/user/media-partners/${id}/media-partners-events`,
    sponsorsdetailsview: (id: string) =>
      `/user/sponsors/${id}/sponsors-details`,
    eventsponsorslist: (id: string) => `/user/sponsors/${id}/sponsors-events`,
    userDetailsView: (users_type: string, user_id: string, path_type: string) =>
      `/user/${users_type}/${user_id}/${users_type}-${path_type}`,
    editUser: (id: string, type: string) => `/user/${type}/edit/${id}`,
    userDetailsViewViaEvent: (users_type: string, user_id: string) =>
      `/user/${users_type}/${user_id}/${users_type}-details`,
    exhibitorProfileSurvey: (id: string) =>
      `/user/exhibitors/${id}/exhibitors-profile-surveys`,
    delegatesProfileSurvey: (id: string) =>
      `/user/delegates/${id}/delegates-profile-surveys`,
    speakersProfileSurvey: (id: string) =>
      `/user/speakers/${id}/speakers-profile-surveys`,
    mediaPartnerProfileSurvey: (id: string) =>
      `/user/media-partners/${id}/media-partners-profile-surveys`,
    sponsorsProfileSurvey: (id: string) =>
      `/user/sponsors/${id}/sponsors-profile-surveys`,
  },

  profileSurvey: {
    profilesurvey: '/profile-survey',
  },

  companies: {
    companie: '/companies',
    createcompanie: '/companies/create',
    editCompanieEvent: (id: string) => `/companies/edit/${id}`,
  },

  // profileSurveyNew: {
  //   profileSurveyNew: '/profileSurvay',
  // },

  support: {
    dashboard: '/support',
    inbox: '/support/inbox',
    supportCategory: (category: string) => `/support/inbox/${category}`,
    messageDetails: (id: string) => `/support/inbox/${id}`,
    snippets: '/support/snippets',
    createSnippet: '/support/snippets/create',
    viewSnippet: (id: string) => `/support/snippets/${id}`,
    editSnippet: (id: string) => `/support/snippets/${id}/edit`,
    templates: '/support/templates',
    createTemplate: '/support/templates/create',
    viewTemplate: (id: string) => `/support/templates/${id}`,
    editTemplate: (id: string) => `/support/templates/${id}/edit`,
  },
  logistics: {
    dashboard: '/logistics',
    shipmentList: '/logistics/shipments',
    customerProfile: '/logistics/customer-profile',
    createShipment: '/logistics/shipments/create',
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  executive: {
    dashboard: '/executive',
  },
  analytics: '/analytics',
  financial: {
    dashboard: '/financial',
  },
  file: {
    dashboard: '/file',
    manager: '/file-manager',
    upload: '/file-manager/upload',
    create: '/file-manager/create',
  },
  pos: {
    index: '/point-of-sale',
  },
  eventCalendar: '/event-calendar',
  rolesPermissions: '/roles-permissions',
  staffRoles: '/staff-roles',
  staffPermissions: '/staff-permissions',

  invoice: {
    home: '/invoice',
    create: '/invoice/create',
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
  },
  widgets: {
    cards: '/widgets/cards',
    icons: '/widgets/icons',
    charts: '/widgets/charts',
    maps: '/widgets/maps',
    banners: '/widgets/banners',
  },
  tables: {
    basic: '/tables/basic',
    collapsible: '/tables/collapsible',
    enhanced: '/tables/enhanced',
    pagination: '/tables/pagination',
    search: '/tables/search',
    stickyHeader: '/tables/sticky-header',
  },
  multiStep: '/multi-step',
  forms: {
    profileSettings: '/forms/profile-settings',
    notificationPreference: '/forms/profile-settings/notification',
    personalInformation: '/forms/profile-settings/profile',
    newsletter: '/forms/newsletter',
  },
  emailTemplates: '/email-templates',
  profile: '/profile',
  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp1: '/auth/sign-up-1',
    signUp2: '/auth/sign-up-2',
    signUp3: '/auth/sign-up-3',
    signUp4: '/auth/sign-up-4',
    signUp5: '/auth/sign-up-5',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn4: '/auth/sign-in-4',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword4: '/auth/forgot-password-4',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp4: '/auth/otp-4',
    otp5: '/auth/otp-5',
  },
  loginsignIn: '/signin',
  login: '/login',
  forgotPassword: '/forgot-password',
  dashboard: '/dashboard',
};
