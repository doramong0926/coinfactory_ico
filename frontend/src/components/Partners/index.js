import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveRefPartner: (ref_partner) => {
            dispatch(ActionCreator.SaveRefPartner(ref_partner));
        },
    }
}

export default connect(null, mapDispatchToProps)(Container)