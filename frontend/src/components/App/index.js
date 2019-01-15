import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, spinner, config } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        username: user.username,
        token: user.token,
        visibleDefaultSpinner: spinner.visibleDefaultSpinner,
        pathname: location.pathname,
        icoWalletList: config.icoWalletList,
        icoFundAmount: config.icoFundAmount,
        whitepaper: config.whitepaper,
        currentRound: config.currentRound,
        backgroundImage: config.backgroundImage,
        home_location: config.home_location,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout: () => {
            dispatch(ActionCreator.Logout());
        },
        SaveProfile: (profile) => {
            dispatch(ActionCreator.SaveProfile(profile));
        },
        DeleteJwt: () => {
            dispatch(ActionCreator.DeleteJwt());
        },
        DeleteUsername: () => {
            dispatch(ActionCreator.DeleteUsername());
        },
        DeleteEmail: () => {
            dispatch(ActionCreator.DeleteEmail());
        },
        SaveKyc: (kyc) => {
            dispatch(ActionCreator.SaveKyc(kyc));
        },
        SaveIcoWalletList: (icoWalletList) => {
            dispatch(ActionCreator.SaveIcoWalletList(icoWalletList));
        },
        SaveInvestmentInfo: (investmentInfo) => {
            dispatch(ActionCreator.SaveInvestmentInfo(investmentInfo));
        },
        SaveIcoFundAmount: (icoFundAmount) => {
            dispatch(ActionCreator.SaveIcoFundAmount(icoFundAmount));
        },
        SaveWhitepaper: (whitepaper) => {
            dispatch(ActionCreator.SaveWhitepaper(whitepaper));
        },
        SaveCurrentRound: (currentRound) => {
            dispatch(ActionCreator.SaveCurrentRound(currentRound));
        },
        SaveRoundSupplyList: (roundSypplyList) => {
            dispatch(ActionCreator.SaveRoundSupplyList(roundSypplyList));
        },
        SaveRoundBonusList: (roundBonusList) => {
            dispatch(ActionCreator.SaveRoundBonusList(roundBonusList));
        },
        SaveRoundList: (roundList) => {
            dispatch(ActionCreator.SaveRoundList(roundList));
        },        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)


