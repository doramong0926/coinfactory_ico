import actionTypes from "../actionTypes";

const initialState = {
    icoWalletList : null,
    currentRound: null,
    whitepaper: null,
    investmentInfo: null,
    icoFundAmount: null,
    roundSupplyList: null,
    roundBonusList: null,
    roundList: null,
    backgroundImage: null,
    ref_tokenSale: null,
    ref_roadmap: null,
    ref_team: null,
    ref_partner: null,
    ref_contact: null,
    ref_whatis: null,
    home_location: null,
    transaction_list: null,
    internal_transaction_list: null,
}

export default (state = initialState, action) => {
    switch (action.type) {            
        case actionTypes.CONFIG_SAVE_INTERNAL_ICO_TRANSACTIONS:
        return Object.assign({}, state, {                
            internal_transaction_list: action.payload.internal_transaction_list,
        }); 
        case actionTypes.CONFIG_SAVE_ICO_TRANSACTIONS:
        return Object.assign({}, state, {                
            transaction_list: action.payload.transaction_list,
        });         
        case actionTypes.CONFIG_SAVE_HOME_LOCATION:
            return Object.assign({}, state, {                
                home_location: action.payload.home_location,
            }); 
        case actionTypes.CONFIG_SAVE_REF_WHATIS:
            return Object.assign({}, state, {                
                ref_whatis: action.payload.ref_whatis,
            }); 
        case actionTypes.CONFIG_SAVE_REF_TOKEN_SALE:
            return Object.assign({}, state, {                
                ref_tokenSale: action.payload.ref_tokenSale,
            }); 
        case actionTypes.CONFIG_SAVE_REF_ROADMAP:
            return Object.assign({}, state, {                
                ref_roadmap: action.payload.ref_roadmap,
            }); 
        case actionTypes.CONFIG_SAVE_REF_TEAM:
            return Object.assign({}, state, {                
                ref_team: action.payload.ref_team,
            }); 
        case actionTypes.CONFIG_SAVE_REF_PARTNER:
            return Object.assign({}, state, {                
                ref_partner: action.payload.ref_partner,
            }); 
        case actionTypes.CONFIG_SAVE_REF_CONTACT:
            return Object.assign({}, state, {                
                ref_contact: action.payload.ref_contact,
            }); 
        case actionTypes.CONFIG_SAVE_BG_IMAGE:
            return Object.assign({}, state, {                
                backgroundImage: action.payload.backgroundImage,
            }); 

        case actionTypes.CONFIG_SAVE_ROUND_LIST:
            return Object.assign({}, state, {                
                roundList: action.payload.roundList,
            });

        case actionTypes.CONFIG_SAVE_ROUND_SUPPLY_LIST:
            return Object.assign({}, state, {                
                roundSupplyList: action.payload.roundSupplyList,
            });

        case actionTypes.CONFIG_SAVE_ICO_WALLET_LIST:
            return Object.assign({}, state, {                
                icoWalletList: action.payload.icoWalletList,
            });

        case actionTypes.CONFIG_SAVE_CURRENT_ROUND:
            return Object.assign({}, state, {
                currentRound: action.payload.currentRound,
            });

        case actionTypes.CONFIG_SAVE_WHITEPAPER:
            return Object.assign({}, state, {
                whitepaper: action.payload.whitepaper,
            });

        case actionTypes.CONFIG_SAVE_INVESTMENT_INFO:
            return Object.assign({}, state, {
                investmentInfo: action.payload.investmentInfo,
            });

        case actionTypes.CONFIG_SAVE_ICO_FUND_AMOUNT:
            return Object.assign({}, state, {
                icoFundAmount: action.payload.icoFundAmount,
            });

        case actionTypes.CONFIG_SAVE_ROUND_BONUS_LIST:
            return Object.assign({}, state, {
                roundBonusList: action.payload.roundBonusList,
            });

            

        default: 
            return state;
    }
}