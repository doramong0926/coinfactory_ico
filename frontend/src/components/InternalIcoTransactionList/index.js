import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { config } = state;
    return {
        internal_transaction_list: config.internal_transaction_list,
        icoWalletList: config.icoWalletList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveInternalIcoTransactions: (internal_transaction_list) => {
            dispatch(ActionCreator.SaveInternalIcoTransactions(internal_transaction_list));
        },           
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)