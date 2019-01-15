import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

function mapStateToProps(state) {
    const { user } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        referralQuery: user.referralQuery,
    };
}

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
        SaveBackgroundImage: (backgroundImage) => {
            dispatch(ActionCreator.SaveBackgroundImage(backgroundImage));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);