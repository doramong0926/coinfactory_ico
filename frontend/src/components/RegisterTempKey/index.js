import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        pathname: location.pathname,
        token: user.token,
        username: user.username,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout: () => {
            dispatch(ActionCreator.Logout());
        },
        SaveTempkey: (tempkey) => {
            dispatch(ActionCreator.SaveTempkey(tempkey));
        },    
        ShowDefaultSpinner: () => {
            dispatch(ActionCreator.ShowDefaultSpinner());
        },
        HideDefaultSpinner: () => {
            dispatch(ActionCreator.HideDefaultSpinner());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)


