import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./../Navigation";
import Spinner from "./../Spinner";
import Home from "./../Home";
import EmailActivation from "./../EmailActivation";
import Footer from "./../Footer";
import BasicModal from "./../BasicModal";
import Kyc from "../Kyc";
import BuyToken from "../BuyToken";
import Profile from "../Profile";
import Auth from "../Auth";
import Admin from "../Admin";
import styles from "./styles.module.scss";
import { BACKGROUND_IMAGE_TYPE } from "../../config/constants";

const App = (props, context) => {
    const AuthExpiredModalTitle = context.t("로그인 만료");
    const AuthExpiredModalContents = [
        {
            title: null,
            text: [
                context.t("장기간 접속되어 있어 로그인이 만료되었습니다."),
                context.t("로그인 페이지로 이동하겠습니다."),
            ]
        },
    ];
    return (
        <div className={_getRootDivisionClassName(props.backgroundImage)}
        >
            <Navigation key={1}>
                <Spinner key={2} size="small" visible={props.visibleDefaultSpinner}>
                    <Routes kye={3} isLoggedIn={props.isLoggedIn}/>
                </Spinner>
            </Navigation>
            {_renderFooter(props.isLoggedIn, props.pathname)}
            <BasicModal key={5}
                visible = {props.visibleAuthExpiredModal}
                handleClose = {props.handleCloseAuthExpiredModal}
                size={"mini"} 
                title={AuthExpiredModalTitle}
                contents={AuthExpiredModalContents}
            />            
        </div>
    );
}

const _getRootDivisionClassName = (backgroundImage) => {
    switch(backgroundImage) {
        case BACKGROUND_IMAGE_TYPE.HOME :
            return styles.RootDivisionHome;
        case BACKGROUND_IMAGE_TYPE.BUY_TOKEN :
            return styles.RootDivisionBuyToken;
        case BACKGROUND_IMAGE_TYPE.KYC :
            return styles.RootDivisionKyc;
        case BACKGROUND_IMAGE_TYPE.PROFILE :
            return styles.RootDivisionProfile;
        case BACKGROUND_IMAGE_TYPE.LOGIN :
            return styles.RootDivisionLogin;
        case BACKGROUND_IMAGE_TYPE.SIGN_UP :
            return styles.RootDivisionSignup;
        case BACKGROUND_IMAGE_TYPE.VERIFICATION :
            return styles.RootDivisionVerification;
        default: 
            return styles.RootDivisionHome;
    }
}

const _renderFooter = (isLoggedIn, pathname) => {
    if (isLoggedIn === false)
    {
        switch(pathname) {
            case '/' :
            case '/Auth':            
            // case '/buytoken' :
            // case '/kyc' :
            // case '/profile' :
                return <Footer key={4} />
            default:
                return null;
        }
    } else {
        if (pathname !== '/superman/' 
            && pathname !== '/superman/icoinfo/'
            && pathname !== '/superman/userinfo/') {
            return <Footer key={4} />
        }
        else {
            return null;
        }
    }
}

const Routes = (props) => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/buytoken" component={props.isLoggedIn === true ? BuyToken : Auth } />
        <Route exact path="/kyc" component={props.isLoggedIn === true ? Kyc  : Auth } />
        <Route exact path="/profile" component={props.isLoggedIn === true ? Profile  : Auth } />
        <Route path="/superman" component={props.isLoggedIn === true ? Admin  : Auth } />
        <Route exact path="/auth" 
            render={() => (
                props.isLoggedIn === true ? (
                    <Redirect to="/"/>
                ) : (
                    <Auth />
                )
            )}/>
        <Route exact path="/email_activation/users/:uidb64/:token/email_activation" component={EmailActivation} />
        <Route exact path="/email_activation/:email/:key/" component={EmailActivation} />
    </Switch>
);

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    visibleDefaultSpinner: PropTypes.bool.isRequired,
    pathname: PropTypes.any.isRequired,
    handleCloseAuthExpiredModal: PropTypes.func.isRequired,
    visibleAuthExpiredModal: PropTypes.bool.isRequired,
    backgroundImage: PropTypes.number,
    home_location: PropTypes.string,
}

App.contextTypes = {
    t: PropTypes.func.isRequired
};

export default App;
