import { connect } from "react-redux";
import Container from "./container";
import { setLanguage } from "redux-i18n"

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, i18nState} = state;
    return {
        lang: i18nState.lang,
        pathname: location.pathname,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setLanguage: (launage) => {
            dispatch(setLanguage(launage));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
