import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { config } = state;
    return {
        transaction_list: config.transaction_list,
        icoWalletList: config.icoWalletList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveIcoTransactions: (transaction_list) => {
            dispatch(ActionCreator.SaveIcoTransactions(transaction_list));
        },            
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)