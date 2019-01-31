import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, config, router: { location }, } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        icoWalletList: config.icoWalletList,
        pathname: location.pathname,
        token: user.token,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout: () => {
            dispatch(ActionCreator.Logout());
        },
        SaveProfile: (profile) => {
            dispatch(ActionCreator.SaveProfile(profile));
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
        ShowDefaultSpinner: () => {
            dispatch(ActionCreator.ShowDefaultSpinner());
        },
        HideDefaultSpinner: () => {
            dispatch(ActionCreator.HideDefaultSpinner());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)