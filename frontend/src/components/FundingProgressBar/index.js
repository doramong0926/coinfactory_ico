import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, config } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        pathname: location.pathname,
        investmentInfo: config.investmentInfo,
        icoFundAmount: config.icoFundAmount,
    };
};

export default connect(mapStateToProps, null)(Container)