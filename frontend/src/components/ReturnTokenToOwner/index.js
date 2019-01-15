import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, config, router: { location }, } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        icoWalletList: config.icoWalletList,
        pathname: location.pathname,
        username: user.username,
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


