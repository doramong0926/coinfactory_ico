import { connect } from "react-redux";
import Container from "./container"

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        token: user.token,
        pathname: location.pathname,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // SaveKycCount: (kycCount) => {
        //     dispatch(ActionCreator.SaveKycCount(kycCount));
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)