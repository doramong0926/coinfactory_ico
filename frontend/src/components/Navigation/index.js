import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";
import { setLanguage } from "redux-i18n"

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, config, i18nState} = state;
    return {
        pathname: location.pathname,
        isLoggedIn: user.isLoggedIn,
        username: user.username,
        whitepaper: config.whitepaper,
        lang: i18nState.lang,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout: () => {
            dispatch(ActionCreator.Logout());
        },
        DeleteJwt: () => {
            dispatch(ActionCreator.DeleteJwt());
        },
        DeleteUsername: () => {
            dispatch(ActionCreator.DeleteUsername());
        },
        DeleteEmail: () => {
            dispatch(ActionCreator.DeleteEmail());
        },
        SaveKyc: (kyc) => {
            dispatch(ActionCreator.SaveKyc(kyc));
        },
        SaveProfile: (profile) => {
            dispatch(ActionCreator.SaveProfile(profile));
        },
        setLanguage: (launage) => {
            dispatch(setLanguage(launage));
        },
        SaveHomeLocation: (profile) => {
            dispatch(ActionCreator.SaveHomeLocation(profile));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);