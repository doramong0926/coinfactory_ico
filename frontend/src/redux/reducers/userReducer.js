import actionTypes from "../actionTypes";
import { 
    LOCAL_STORE_JWT, 
    LOCAL_STORE_USERNAME,
    LOCAL_STORE_EMAIL,
    LOCAL_STORE_REFERRAL_QUERY,
    LOCAL_STORE_REMEMBERME,
    LOCAL_STORE_TEMPKEY,
} from "../../config/constants"

const initialState = {
    isLoggedIn: (localStorage.getItem(LOCAL_STORE_JWT) ? true : false) || false,
    username: (localStorage.getItem(LOCAL_STORE_USERNAME) ? localStorage.getItem(LOCAL_STORE_USERNAME) : null) || null,
    email: (localStorage.getItem(LOCAL_STORE_EMAIL) ? localStorage.getItem(LOCAL_STORE_EMAIL) : null) || null,
    token: localStorage.getItem(LOCAL_STORE_JWT),    
    referralQuery: (localStorage.getItem(LOCAL_STORE_REFERRAL_QUERY) ? localStorage.getItem(LOCAL_STORE_REFERRAL_QUERY) : null) || null,
    profile: null,
    rememberme: (localStorage.getItem(LOCAL_STORE_REMEMBERME) ? localStorage.getItem(LOCAL_STORE_REMEMBERME) : null) || null,
    tempkey: (localStorage.getItem(LOCAL_STORE_TEMPKEY) ? localStorage.getItem(LOCAL_STORE_TEMPKEY) : null) || null,
}

export default (state = initialState, action) => {
    switch (action.type) {        
        case actionTypes.USER_SAVE_TEMP_KEY:
            localStorage.setItem(LOCAL_STORE_TEMPKEY, action.payload.tempkey);
            return Object.assign({}, state, {                
                tempkey: action.payload.tempkey,
            });

        case actionTypes.USER_SAVE_REMEMBER_ME:
            localStorage.setItem(LOCAL_STORE_REMEMBERME, action.payload.email);
            return Object.assign({}, state, {                
                referralQuery: action.payload.email,
            });

        case actionTypes.USER_SAVE_REFERRAL_QUERY:
            localStorage.setItem(LOCAL_STORE_REFERRAL_QUERY, action.payload.referralQuery);
            return Object.assign({}, state, {                
                referralQuery: action.payload.referralQuery,
            });

        case actionTypes.USER_SAVE_PROFILE:
            return Object.assign({}, state, {                
                profile: action.payload.profile,
            });

        case actionTypes.USER_LOG_IN:
            return Object.assign({}, state, {
                isLoggedIn: true,
            });

        case actionTypes.USER_LOG_OUT:
            return Object.assign({}, state, {
                isLoggedIn: false,
            });

        case actionTypes.USER_SAVE_JWT:
            localStorage.setItem(LOCAL_STORE_JWT, action.payload.token);
            return Object.assign({}, state, {
                // isLoggedIn: true,
                token: action.payload.token,
            });

        case actionTypes.USER_DELETE_JWT:
            localStorage.removeItem(LOCAL_STORE_JWT);
            return Object.assign({}, state, {
                // isLoggedIn: false,
                token: null,
            });

        case actionTypes.USER_SAVE_USERNAME:
            localStorage.setItem(LOCAL_STORE_USERNAME, action.payload.username);
            return Object.assign({}, state, {
                username: action.payload.username,
            });

        case actionTypes.USER_DELETE_USERNAME:
            localStorage.removeItem(LOCAL_STORE_USERNAME);
            return Object.assign({}, state, {
                username: null,
            });

        case actionTypes.USER_SAVE_EMAIL:
            localStorage.setItem(LOCAL_STORE_EMAIL, action.payload.email);
            return Object.assign({}, state, {
                email: action.payload.email,
            });

        case actionTypes.USER_DELETE_EMAIL:
            localStorage.removeItem(LOCAL_STORE_EMAIL);
            return Object.assign({}, state, {
                email: null,
            });

        default: 
            return state;
    }
}
