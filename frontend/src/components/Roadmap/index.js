import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveRefRoadmap: (ref_roadmap) => {
            dispatch(ActionCreator.SaveRefRoadmap(ref_roadmap));
        },
    }
}

export default connect(null, mapDispatchToProps)(Container)