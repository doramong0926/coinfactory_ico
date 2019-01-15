import actionTypes from './../actionTypes';

export const SaveTempkey = (tempkey) => {
    return {
        type: actionTypes.USER_SAVE_TEMP_KEY,
        payload: {
            tempkey
        }
    };
}

export const SaveRememberMe = (email) => {
    return {
        type: actionTypes.USER_SAVE_REMEMBER_ME,
        payload: {
            email
        }
    };
}

export const SaveReferralQuery = (referralQuery) => {
    return {
        type: actionTypes.USER_SAVE_REFERRAL_QUERY,
        payload: {
            referralQuery
        }
    };
}

export const SaveProfile = (profile) => {
    return {
        type: actionTypes.USER_SAVE_PROFILE,
        payload: {
            profile
        }
    };
}

export const Login = () => {
    return {
        type: actionTypes.USER_LOG_IN,
    };
}

export const Logout = () => {
    return {
        type: actionTypes.USER_LOG_OUT,
    };
}

export const SaveJwt = (token) => {
    return {
        type: actionTypes.USER_SAVE_JWT,
        payload: {
            token
        }
    };
}

export const DeleteJwt = () => {
    return {
        type: actionTypes.USER_DELETE_JWT,
    }
}

export const SaveUsername = (username) => {
    return {
        type: actionTypes.USER_SAVE_USERNAME,
        payload: {
            username
        }
    };
}

export const DeleteUsername = () => {
    return {
        type: actionTypes.USER_DELETE_USERNAME,
    };
}

export const SaveEmail = (email) => {
    return {
        type: actionTypes.USER_SAVE_EMAIL,
        payload: {
            email
        }
    };
}

export const DeleteEmail = () => {
    return {
        type: actionTypes.USER_DELETE_EMAIL,
    };
}

