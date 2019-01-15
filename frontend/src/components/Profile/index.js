import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, config, router: { location } } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        profile: user.profile,
        username: user.username,
        token: user.token,
        pathname: location.pathname,
        icoWalletList: config.icoWalletList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveProfile: (profile) => {
            dispatch(ActionCreator.SaveProfile(profile));
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