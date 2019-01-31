import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { kyc, user, router: { location }, } = state;
    return {
        kycCount: kyc.kycCount,
        isLoggedIn: user.isLoggedIn,
        token: user.token,
        pathname: location.pathname,
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
        SaveKycCount: (kycCount) => {
            dispatch(ActionCreator.SaveKycCount(kycCount));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)


