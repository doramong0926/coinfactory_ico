import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, config } = state;
    return {
        pathname: location.pathname,
        whitepaper: config.whitepaper,
    };
};

export default connect(mapStateToProps, null)(Container)