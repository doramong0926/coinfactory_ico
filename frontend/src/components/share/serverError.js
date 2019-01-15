
const serverErrorTypes = {    
    LOGIN_EMAIL_IS_NOT_VERIFIED: "E-mail is not verified.",
    SIGN_UP_EMAIL_SENT: "Verification e-mail sent.",
    SIGN_UP_EMAIL_EXIST: "A user is already registered with this e-mail address.",
    SIGN_UP_USERNAME_EXIST: "A user with that username already exists.",
    SIGN_UP_PASSWORD_IS_TOO_SHORT: "This password is too short. It must contain at least 8 characters.",
    SIGN_UP_TWO_PASSWORD_IS_NOT_MATCH: "The two password fields didn't match.",
    SIGN_UP_PASSWORD_IS_ONLY_NUMERIC: "This password is entirely numeric.",
    SIGN_UP_PASSWORD_IS_TOO_COMMON: "This password is too common.",
    KYC_EMAIL_VERIFICATION_ALREADY_DONE: "Email verification is already done.",
    KYC_EMAIL_ALREADY_USED: "This email is already be used.",
    KYC_WALLET_ALREADY_USED: "This wallet address is already be used.",
    KYC_MOBILE_NUMBER_ALREADY_USED: "This mobile number is already be used.",
    KYC_MOBILE_NUMBER_TWILIO_ERROR: "Fail to put mobile_number. Please check twilio.",
    KYC_FAIL_TO_PUT: "Fail to put kyc",
};
    
export default serverErrorTypes;