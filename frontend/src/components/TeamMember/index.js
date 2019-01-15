import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveRefTeam: (ref_team) => {
            dispatch(ActionCreator.SaveRefTeam(ref_team));
        },
    }
}

export default connect(null, mapDispatchToProps)(Container)