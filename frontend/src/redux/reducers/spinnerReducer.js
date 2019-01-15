import actionTypes from "../actionTypes";
const initialState = {
    visibleDefaultSpinner: false,
}

export default (state = initialState, action) => {
    switch (action.type) {        
        case actionTypes.SPINNER_SHOW_DEFAULT_SPINNER:
            return Object.assign({}, state, {                
                visibleDefaultSpinner: true,
            });

        case actionTypes.SPINNER_HIDE_DEFAULT_SPINNER:
            return Object.assign({}, state, {                
                visibleDefaultSpinner: false,
            });

        default: 
            return state;
    }
}
