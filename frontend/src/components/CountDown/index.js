import { connect } from "react-redux";
import Container from "./container"

const mapStateToProps = (state, ownProps) => {
    const { config } = state;
    return {
        currentRound: config.currentRound,
        roundList: config.roundList,
    };
};

export default connect(mapStateToProps, null)(Container)