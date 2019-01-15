import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, config } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        profile: user.profile,
        pathname: location.pathname,
        icoWalletList: config.icoWalletList,
    };
};

export default connect(mapStateToProps, null)(Container)