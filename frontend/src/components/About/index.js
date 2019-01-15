import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveRefWhatis: (ref_whatis) => {
            dispatch(ActionCreator.SaveRefWhatis(ref_whatis));
        },
    }
}

export default connect(null, mapDispatchToProps)(Container)

