import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        pathname: location.pathname,
        token: user.token,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ShowDefaultSpinner: () => {
            dispatch(ActionCreator.ShowDefaultSpinner());
        },
        HideDefaultSpinner: () => {
            dispatch(ActionCreator.HideDefaultSpinner());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)