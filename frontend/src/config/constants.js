export const MOBILE_VERIFY_TIMEOUT = 120
export const MOBILE_VERIFY_RE_REQUEST_TIMEOUT = 10
export const TOKEN_DECIMALS = 18

export const HOME_PAGE_ADDRESS = "https://www.bluecots.io/";
export const AWS_S3_ADDRESS = "https://bluecots-ico-bucket.s3.amazonaws.com/";
export const WHITEPAPER = {
    ENG: "http://blcscan.cafe24app.com/doc/whitepaper_eng.pdf",
    KOR: "http://blcscan.cafe24app.com/doc/whitepaper_kor.pdf",
}

export const LOCAL_STORE_JWT = 'jwt';
export const LOCAL_STORE_USERNAME = 'username';
export const LOCAL_STORE_EMAIL = 'email';
export const LOCAL_STORE_REFERRAL_QUERY = 'referralQuery';
export const LOCAL_STORE_REMEMBERME = 'rememberme';
export const LOCAL_STORE_TEMPKEY = 'tempkey';
export const REFERRAL_PREFIX = "?ref="
export const WALLET_ADDRESS = {
    ANDROID: "https://expo.io/@doramong0926/bluecotsWallet/builds",
    IOS: "https://expo.io/@doramong0926/bluecotsWallet/builds",
}

export const FETCH_TYPE = {
    LOADING: 0,
    REFRESH: 1,
}
export const KYC_THUMNAIL_WIDTH = 480;
export const KYC_THUMNAIL_HEIGHT = 320;
export const KYC_STATUS = {
    READY: "ready",
    APPROVING: "approving",
    APPROVED: "approved",
    PENDING: "pending",
    REJECTED: "rejected",
    COMPLETED: "completed",
};

export const KYC_REJECT_REASON = {
    NONE: "none",
    PHOTO: "photo",
    MOBILE_NUMBER: "mobile_number",
    COUNTRY: "country",
}

export const ROUND_TYPE = {
    NOT_STARTED: "notstarted",
    PRESALE: "presale",
    ROUND_A: "rounda",
    ROUND_B: "roundb",
    ROUND_C: "roundc",
    PRE_ROUND_A: "prerounda",
    PRE_ROUND_B: "preroundb",
    PRE_ROUND_C: "preroundc",
}

export const ROUND_STRING = {
    PRESALE: "Presale",
    ROUND_A: "Round-A",
    ROUND_B: "Round-B",
    ROUND_C: "Round-C",
}

export const ABOUT_VIDEO_CHANNEL="youtube";
export const ABOUT_VIDEO_ID="ouR4nn1G9r4";

export const AUTH_MODE = {
    LOGIN : 0,
    SIGNUP : 1,
}

export const SOCIAL_ADDRESS = {
    TELEGRAM: "https://telegram.org/",
    FACEBOOK: "https://www.facebook.com/",
    TWITTER: "https://twitter.com/",
    INSTAGRAM: "https://www.instagram.com/",
}

export const NEWS_IMAGE_PATH = {
    NEWS_1: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    NEWS_2: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    NEWS_3: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
}

export const NEWS_LINK = {
    NEWS_1: "https://coinmarketcap.com/",
    NEWS_2: "https://coinmarketcap.com/",
    NEWS_3: "https://coinmarketcap.com/",
}

export const BACKGROUND_IMAGE_TYPE = {
    HOME: 1,
    BUY_TOKEN: 2,
    KYC: 3,
    PROFILE: 4,
    LOGIN: 5,
    SIGN_UP: 6,
    VERIFICATION: 7,
    ADMIN: 8,
}

export const COMPANY_INFO ={ 
    TEL: "+46 8888 8888",
    EMAIL: "info@bluecots.com"
}
export const NETWORK_TYPE = {
    MAINNET: 'mainnet',
    ROPSTEN: 'ropsten',
}

export const NETWORK = NETWORK_TYPE.ROPSTEN;