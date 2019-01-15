import { connect } from "react-redux";
import Container from "./container"

const mapStateToProps = (state, ownProps) => {
    const { config, router: { location }, } = state;
    return {
        icoWalletList: config.icoWalletList,
        pathname: location.pathname,
    };
};

export default connect(mapStateToProps, null)(Container)


