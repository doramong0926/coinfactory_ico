import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, kyc, router: { location } } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        username: user.username,
        token: user.token,
        kyc: kyc.kyc,
        pathname: location.pathname,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout: () => {
            dispatch(ActionCreator.Logout());
        },
        SaveKyc: (kyc) => {
            dispatch(ActionCreator.SaveKyc(kyc));
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

export default connect(mapStateToProps, mapDispatchToProps)(Container)