import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, config, router: { location }, } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        icoFundAmount: config.icoFundAmount,
        token: user.token,
        pathname: location.pathname,
        username: user.username,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout: () => {
            dispatch(ActionCreator.Logout());
        },
        SaveHomeLocation: (profile) => {
            dispatch(ActionCreator.SaveHomeLocation(profile));
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)


