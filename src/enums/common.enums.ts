export class CommonEnums {
  static path = {
    event_id: 'event_id',
    redirect_url: 'redirect_url',
    event_invitation_template: 'event-invitation-template',
  };

  static url = {
    apiBasePath: 'https://api.evaevents.com/api',
    apiRoot: 'https://api.evaevents.com',
    evaLogoUrl: 'https://api.evaevents.com/images/eva-events-logo-linear.png',
  };

  static emailTemplateTypes = {
    meetingRequest: 'meeting_request',
    meetingRequestConfirmed: 'meeting_request_confirmed',
    meetingCancellation: 'meeting_cancellation',
    meetingRescheduledByRequestor: 'meeting_rescheduled_by_requestor',
    meeting_is_declined_by_user: 'meeting_is_declined_by_user',
    meeting_is_declined_confirmation_to_user:
      'meeting_is_declined_confirmation_to_user',
    event_invite_to_user: 'event_invite_to_user',
    admin_reset_password: 'admin_reset_password',
    meeting_cancelation_report_to_admin: 'meeting_cancelation_report_to_admin',
    meeting_is_cancelled_by_requestor_user_report_email_to_admin:
      'meeting_is_cancelled_by_requestor_user_report_email_to_admin',
  };

  static users = {
    ADMIN: 'admin',
    exhibitor: 'exhibitor',
    delegate: 'delegate',
    sponsor: 'sponsor',
    speaker: 'speaker',
    media_partner: 'media_partners',
    mediaPartner: 'media-partner',
    admin_label: 'Admin',
    exhibitor_label: 'Exhibitor',
    delegate_label: 'Delegate',
    sponsor_label: 'Sponsor',
    speaker_label: 'Speaker',
    media_partner_label: 'Media Partner',
  };
}
