import actionTypes from '../actionTypes';


export const SaveInternalIcoTransactions = (internal_transaction_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_INTERNAL_ICO_TRANSACTIONS,
        payload: {
            internal_transaction_list
        }
    };
}

export const SaveIcoTransactions = (transaction_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_ICO_TRANSACTIONS,
        payload: {
            transaction_list
        }
    };
}

export const SaveHomeLocation = (home_location) => {
    return {
        type: actionTypes.CONFIG_SAVE_HOME_LOCATION,
        payload: {
            home_location
        }
    };
}

export const SaveRefWhatis = (ref_whatis) => {
    return {
        type: actionTypes.CONFIG_SAVE_REF_WHATIS,
        payload: {
            ref_whatis
        }
    };
}

export const SaveRefTokenSale = (ref_tokenSale) => {
    return {
        type: actionTypes.CONFIG_SAVE_REF_TOKEN_SALE,
        payload: {
            ref_tokenSale
        }
    };
}

export const SaveRefRoadmap = (ref_roadmap) => {
    return {
        type: actionTypes.CONFIG_SAVE_REF_ROADMAP,
        payload: {
            ref_roadmap
        }
    };
}

export const SaveRefTeam = (ref_team) => {
    return {
        type: actionTypes.CONFIG_SAVE_REF_TEAM,
        payload: {
            ref_team
        }
    };
}

export const SaveRefPartner = (ref_partner) => {
    return {
        type: actionTypes.CONFIG_SAVE_REF_PARTNER,
        payload: {
            ref_partner
        }
    };
}

export const SaveRefContact = (ref_contact) => {
    return {
        type: actionTypes.CONFIG_SAVE_REF_CONTACT,
        payload: {
            ref_contact
        }
    };
}
export const SaveBackgroundImage = (backgroundImage) => {
    return {
        type: actionTypes.CONFIG_SAVE_BG_IMAGE,
        payload: {
            backgroundImage
        }
    };
}

export const SaveIcoWalletList = (icoWalletList) => {
    return {
        type: actionTypes.CONFIG_SAVE_ICO_WALLET_LIST,
        payload: {
            icoWalletList
        }
    };
}

export const SaveCurrentRound = (currentRound) => {
    return {
        type: actionTypes.CONFIG_SAVE_CURRENT_ROUND,
        payload: {
            currentRound
        }
    };    
}

export const SaveRoundList = (roundList) => {
    return {
        type: actionTypes.CONFIG_SAVE_ROUND_LIST,
        payload: {
            roundList
        }
    };    
}

export const SaveWhitepaper = (whitepaper) => {
    return {
        type: actionTypes.CONFIG_SAVE_WHITEPAPER,
        payload: {
            whitepaper
        }
    };    
}

export const SaveInvestmentInfo = (investmentInfo) => {
    return {
        type: actionTypes.CONFIG_SAVE_INVESTMENT_INFO,
        payload: {
            investmentInfo
        }
    };    
}

export const SaveIcoFundAmount = (icoFundAmount) => {
    return {
        type: actionTypes.CONFIG_SAVE_ICO_FUND_AMOUNT,
        payload: {
            icoFundAmount
        }
    };    
}

export const SaveRoundSupplyList = (roundSupplyList) => {
    return {
        type: actionTypes.CONFIG_SAVE_ROUND_SUPPLY_LIST,
        payload: {
            roundSupplyList
        }
    };    
}

export const SaveRoundBonusList = (roundBonusList) => {
    return {
        type: actionTypes.CONFIG_SAVE_ROUND_BONUS_LIST,
        payload: {
            roundBonusList
        }
    };    
}




