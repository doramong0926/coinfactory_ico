import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ShowDefaultSpinner: () => {
            dispatch(ActionCreator.ShowDefaultSpinner());
        },
        HideDefaultSpinner: () => {
            dispatch(ActionCreator.HideDefaultSpinner());
        },
        SaveRefContact: (ref_contact) => {
            dispatch(ActionCreator.SaveRefContact(ref_contact));
        },
    }
}

export default connect(null, mapDispatchToProps)(Container)

