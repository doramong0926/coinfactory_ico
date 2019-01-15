import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    return {
        rememberme: user.rememberme,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Login: () => {
            dispatch(ActionCreator.Login());
        },
        SaveJwt: (token) => {
            dispatch(ActionCreator.SaveJwt(token));
        },
        SaveUsername: (username) => {
            dispatch(ActionCreator.SaveUsername(username));
        },
        SaveEmail: (email) => {
            dispatch(ActionCreator.SaveEmail(email));
        },
        ShowDefaultSpinner: () => {
            dispatch(ActionCreator.ShowDefaultSpinner());
        },
        HideDefaultSpinner: () => {
            dispatch(ActionCreator.HideDefaultSpinner());
        },
        SaveRememberMe: (email) => {
            dispatch(ActionCreator.SaveRememberMe(email));
        },
        SaveBackgroundImage: (backgroundImage) => {
            dispatch(ActionCreator.SaveBackgroundImage(backgroundImage));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);