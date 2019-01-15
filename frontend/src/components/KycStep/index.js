import { connect } from "react-redux";
import Container from "./container"

const mapStateToProps = (state, ownProps) => {
    const { user, kyc, router: { location } } = state;
    return {
        token: user.token,
        kyc: kyc.kyc,
        pathname: location.pathname,
    };
};


export default connect(mapStateToProps)(Container)


