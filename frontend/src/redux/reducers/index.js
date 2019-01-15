
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { i18nState } from "redux-i18n";
import UserReducer from "./userReducer";
import SpinnerReducer from "./spinnerReducer";
import kycReducer from "./kycReducer";
import ConfigReducer from "./configReducer";

export default (history) => combineReducers({
    user: UserReducer,
    kyc: kycReducer,
    spinner: SpinnerReducer,
    config: ConfigReducer,
    router: connectRouter(history), //router name should not be changed
    i18nState,
});