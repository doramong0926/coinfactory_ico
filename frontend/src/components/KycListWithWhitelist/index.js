import { connect } from "react-redux";
import Container from "./container"

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
        // SaveKycCount: (kycCount) => {
        //     dispatch(ActionCreator.SaveKycCount(kycCount));
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)