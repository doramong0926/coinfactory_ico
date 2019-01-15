import actionTypes from '../actionTypes';

export const SaveKyc = (kyc) => {
    return {
        type: actionTypes.KYC_SAVE_KYC,
        payload: {
            kyc
        }
    };
}

export const SaveKycCount = (kycCount) => {
    return {
        type: actionTypes.KYC_SAVE_KYC_COUNT,
        payload: {
            kycCount
        }
    };
}

