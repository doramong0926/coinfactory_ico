import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, config } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        pathname: location.pathname,
        roundSupplyList: config.roundSupplyList,
    };
};

export default connect(mapStateToProps, null)(Container)