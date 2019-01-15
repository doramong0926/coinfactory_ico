import actionTypes from "../actionTypes";
const initialState = {
    kyc : null,
    kycCount: null,
}

export default (state = initialState, action) => {
    switch (action.type) {        
        case actionTypes.KYC_SAVE_KYC:
            return Object.assign({}, state, {                
                kyc: action.payload.kyc,
            });

        case actionTypes.KYC_SAVE_KYC_COUNT:
            return Object.assign({}, state, {                
                kycCount: action.payload.kycCount,
            });

        default: 
            return state;
    }
}