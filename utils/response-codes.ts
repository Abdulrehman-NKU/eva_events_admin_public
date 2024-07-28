class ResponseCodes {
  static REGISTRATION_REQUIRED = 'REGISTRATION_REQUIRED';
  static INSUFFICIENT_MYLOCREDITS = 'INSUFFICIENT_MYLOCREDITS';
  static TRANSACTION_DONE = 'TRANSACTION_DONE';
  static VALID_BALANCE = 'VALID_BALANCE';
  static INVALID_TOKEN = 'INVALID_TOKEN';
  static ACCESS_TOKEN_REQUIRED = 'ACCESS_TOKEN_REQUIRED';
  static ACCESS_TOKEN_CREATION_FAILED = 'ACCESS_TOKEN_CREATION_FAILED';
  static UNAUTHORIZED = 'UNAUTHORIZED';
  static INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
  static USER_NOT_FOUND = 'USER_NOT_FOUND';
  static EXIST_USER = 'EXIST_USER';
  static INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
  static REGISTER_SUCCESS = 'REGISTER_SUCCESS';
  static REGISTER_FAILED = 'REGISTER_FAILED';
  static ALLREADY_EXIST = 'ALLREADY_EXIST';
  static ALREADY_EXIST = 'ALREADY_EXIST';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  static LOGIN_FAILED = 'LOGIN_FAILED';
  static CREATE_SUCCESS = 'CREATE_SUCCESS';
  static EDIT_SUCCESS = 'EDIT_SUCCESS';
  static EDIT_FAILED = 'EDIT_FAILED';
  static CREATE_FAILED = 'CREATE_FAILED';
  static UPDATE_SUCCESS = 'UPDATE_SUCCESS';
  static UPDATE_FAILED = 'UPDATE_FAILED';
  static DELETE_SUCCESS = 'DELETE_SUCCESS';
  static DELETE_FAILED = 'DELETE_FAILED';
  static PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
  static PAYMENT_FAILED = 'PAYMENT_FAILED';
  static UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
  static UPLOAD_FAILED = 'UPLOAD_FAILED';
  static SOMETHING_WENT_WRONG = 'SOMETHING_WENT_WRONG';
  static EXPERT_APPROVAL_PENDING = 'EXPERT_APPROVAL_PENDING';
  static EXPERT_APPROVAL_REJECTED = 'EXPERT_APPROVAL_REJECTED';
  static VERIFY_SUCCESS = 'VERIFY_SUCCESS';
  static VERIFY_FAILED = 'VERIFY_FAILED';
  static NOT_VERIFIED = 'NOT_VERIFIED';
  static MAIL_SENDED_SUCCESS = 'MAIL_SENDED_SUCCESS';
  static MAIL_SENDED_FAILED = 'MAIL_SENDED_FAILED';
  static PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
  static REFFERRAL_SUCCESS = 'REFFERRAL_SUCCESS';
  static VERIFICATION_OTP_SENT = 'VERIFICATION_OTP_SENT';
  static MAIL_ALLREADY_SENT = 'MAIL_ALLREADY_SENT';
  static OTP_IS_INCORRECT = 'OTP_IS_INCORRECT';
  static INVALID_MOBILE_NUMBER = 'INVALID_MOBILE_NUMBER';
  static INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER';
  static GET_SUCCESS = 'GET_SUCCESS';
  static GET_FAILED = 'GET_FAILED';
  static NOT_FOUND = 'NOT_FOUND';
  static EXPERT_NOT_FOUND = 'EXPERT_NOT_FOUND';
  static VALIDATION_FAILED = 'VALIDATION_FAILED';
  static USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

  static SUCCESS = 'SUCCESS';
  static FAILED = 'FAILED';

  static CONFIRM_PASSWORD_NOT_MATCH = 'CONFIRM_PASSWORD_NOT_MATCH';
  static PASSWORD_CHANGE_FAILED = 'PASSWORD_CHANGE_FAILED';
  static WRONG_PASSWORD = 'WRONG_PASSWORD';


  static REGISTRATION_CONFORMATION_MAIL_NOT_SENT =
    'REGISTRATION_CONFORMATION_MAIL_NOT_SENT';

  /**
   * Questions
   *
   */

  static QUESTION_IS_CANCELLED = 'QUESTION_IS_CANCELLED';

  // appointment
  static APPOINTMENT_NOT_FOUND = 'APPOINTMENT_NOT_FOUND';

  /**
   * Socket responses
   *
   */

  static INCOMING_QUESTIONS_ARE_UPDATED = 'INCOMING_QUESTIONS_ARE_UPDATED';
  static failedWhileJoiningTheRoom = (room: string) =>
    `FAILED_JOINING_THE_ROOM_${room}`;

  static failedWhileLeavingTheRoom = (room: string) =>
    `FAILED_LEAVING_THE_ROOM_${room}`;

  static DIRECT_QUESTION_IS_ADDED_TO_INCOMING_QUESTIONS =
    'DIRECT_QUESTION_IS_ADDED_TO_INCOMING_QUESTIONS';

  static UPDATE_INCOMING_QUESTION_STATS = 'UPDATE_INCOMING_QUESTIONS_STATS';

  /**
   * Economy responses
   */

  static WALLET_CREATION_FAILED = 'WALLET_CREATION_FAILED';
  static WALLET_NOT_FOUND = 'WALLET_NOT_FOUND';
  static CREDITS_CREDIT_SUCCESS = 'CREDITS_CREDIT_SUCCESS';

  /**
   * Credits Packages
   *
   */

  static CREDITS_PACKAGE_NOT_FOUND = 'CREDITS_PACKAGE_NOT_FOUND';

  /**
   * SMS responses
   */

  static SMS_SENT_SUCCESS = 'SMS_SENT_SUCCESS';
  static SMS_SENT_FAILED = 'SMS_SENT_FAILED';
}

export default ResponseCodes;
