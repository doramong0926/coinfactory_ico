import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { config } = state;
    return {
        currentRound: config.currentRound,
        roundList: config.roundList,
        roundSupplyList: config.roundSupplyList,
        investmentInfo: config.investmentInfo,
        ref_tokenSale: config.ref_tokenSale,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveRefTokenSale: (ref_tokenSale) => {
            dispatch(ActionCreator.SaveRefTokenSale(ref_tokenSale));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)