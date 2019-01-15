import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, config } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        home_location: config.home_location,
        ref_tokenSale: config.ref_tokenSale,
        ref_roadmap: config.ref_roadmap,
        ref_team: config.ref_team,
        ref_partner: config.ref_partner,
        ref_contact: config.ref_contact,
        ref_whatis: config.ref_whatis,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveReferralQuery: (referralQuery) => {
            dispatch(ActionCreator.SaveReferralQuery(referralQuery));
        },
        SaveBackgroundImage: (backgroundImage) => {
            dispatch(ActionCreator.SaveBackgroundImage(backgroundImage));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)