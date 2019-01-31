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
        SaveKycCount: (kycCount) => {
            dispatch(ActionCreator.SaveKycCount(kycCount));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)


