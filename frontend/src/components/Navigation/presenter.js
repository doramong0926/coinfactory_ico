import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Container,
    Image,
    Menu,
    Responsive,
    Segment,
    Visibility,
    Button,
    Sidebar,
    Icon,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import BasicModal from "./../BasicModal";
import ConfirmModal from "../ConfirmModal";
import HomeHeading from "./../HomeHeading"
import styles from "./styles.module.scss";
import Language from "./../Language";

const Navigation = (props, context) => {
    const logoutConfirmButtonString = context.t("로그아웃");
    const logoutConfirmModalTitle = context.t("로그아웃");
    const logoutConfirmModalContents = [
        {
            title: null,
            text: [
                context.t("지금 바로 로그아웃 하시겠습니까?"),
            ]
        },
    ];
    const errorModalTitle = context.t("로그인 상태 확인");
    const errorModalContents = [
        {
            title: null,
            text: [
                context.t("해당 서비스는 로그인이 필요한 서비스 입니다."),
                context.t("로그인 페이지로 이동하겠습니다."),
            ]
        },
    ];
    return (
        <React.Fragment>
            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                <NavBarMobile {...props} />
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
                <NavBarDesktop {...props} />
            </Responsive>
            <BasicModal 
                visible = {props.visibleErrorModal}
                handleClose = {props.handleCloseErrorModal}
                size={"mini"} 
                title={errorModalTitle}
                contents={errorModalContents}
            />
            <ConfirmModal 
                visible = {props.visibleLogoutConfirmModal}
                handleClose = {props.handleCloseLogoutModal}
                handleConfirm = {props.handleLogoutConfirm}
                buttonString = {logoutConfirmButtonString}
                size={"mini"} 
                title={logoutConfirmModalTitle}
                contents={logoutConfirmModalContents}                
            />
        </React.Fragment>
    )
}

const NavBarDesktop = (props, context) => {
    return (   
        <React.Fragment>
            <Visibility  onUpdate={props.handleVisibilityUpdate}>
                <Segment
                    basic
                    textAlign='center'
                    className={getClassnameWithPathname(false, props.pathname)}
                >
                    <Menu 
                        text secondary fixed={props.fixedMenu ? 'top' : null}
                        className={props.fixedMenu ? styles.MenuFixed: styles.Menu}
                    >
                        <Container className={styles.Container}>
                            <LeftLogoItem {...props} />
                            <Menu.Menu position="right">
                                <DefaultMenuItem {...props} />
                                <SpecialMenuItem {...props} mobile={false} /> 
                            </Menu.Menu>
                        </Container>
                    </Menu>        
                    { props.pathname==="/" ? <HomeHeading mobile={false}/> : null }
                </Segment>
            </Visibility>
            {props.children}
        </React.Fragment>
    )
};

const NavBarMobile = (props, context) => (  
    <React.Fragment>
        <Visibility  onUpdate={props.handleVisibilityUpdate}>
            <Sidebar
                as={Menu}
                animation="overlay"
                direction='top'
                icon="labeled"
                inverted
                vertical
                visible={props.visible}
                width='thin'
                color="blue"
                className={styles.Sidebar}
                fixed='top'
            >
                <Menu.Menu position="right">
                    <DefaultMenuItem {...props} />
                    <SpecialMenuItem {...props} mobile={true}/>
                </Menu.Menu>
            </Sidebar>
            <Segment
                basic
                inverted
                textAlign='center'
                className={getClassnameWithPathname(true, props.pathname)}
                vertical                    
            >
                <Menu 
                    text secondary fixed={props.fixedMenu ? 'top' : null}
                    className={props.fixedMenu ? styles.MenuFixed: styles.Menu}
                >
                    <Container className={styles.Container}>              
                        <LeftLogoItem {...props} />
                        <BurgerItem {...props} />                                  
                    </Container> 
                </Menu> 
                <Sidebar.Pushable>
                    <Sidebar.Pusher            
                        onClick={props.handlePusher}
                        // style={{ minHeight: "100vh"}}
                        className={styles.SidebarPusher}
                    >
                        { props.pathname==="/" ? <HomeHeading mobile={true}/> : null }
                        {props.children}                
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Segment>
        </Visibility>
    </React.Fragment>     
);

const LeftLogoItem = (props) => {
    return (
        <Menu.Item 
            header
            as={Link}
            to={'/'}
            onClick={
                () => {
                    props.handleOnClickMenuItem("home")
                } 
            }
            className={styles.LeftLogoMenuItem}
        >
            <Image 
                size="mini" 
                className={styles.LeftLogoImage}
                src={require("images/bluecots-logo-with-text-365x90.png")} 
            />
        </Menu.Item>
    )
}

const BurgerItem = (props) => {
    return (
        <Menu.Item 
            onClick={props.handleToggle} 
            position="right"
            className={styles.BugerItem}
            
        >
            <Icon size="large" name="sidebar" />
        </Menu.Item>
    )
}

const DefaultMenuItem = (props, context) => {
    return (
        <React.Fragment>
            <Menu.Item 
                as={Link}
                to={'/'}
                name={context.t("블루코츠 소개")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("whatis")
                    } 
                }
                className={styles.MenuItem}
            />  
            <Menu.Item 
                as={Link}
                to={'/'}
                name={context.t("토큰판매")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("tokensale")
                    } 
                }                
                className={styles.MenuItem}
            />   
            <Menu.Item 
                as={Link}
                to={'/'}
                name={context.t("로드맵")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("roadmap")
                    } 
                }
                className={styles.MenuItem}
            />   
            <Menu.Item 
                as={Link}
                to={'/'}
                name={context.t("팀")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("team")
                    } 
                }
                className={styles.MenuItem}
            />    
            <Menu.Item 
                as={Link}
                to={'/'}
                name={context.t("파트너")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("partner")
                    } 
                }
                className={styles.MenuItem}
            />   
            <Menu.Item 
                as={Link}
                to={'/'}
                name={context.t("연락처")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("contact")
                    } 
                }
                className={styles.MenuItem}
            />   
            <Menu.Item 
                as={Link}
                to={'/buytoken'}
                name={context.t("토큰 구입")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("buytoken")
                    } 
                }
                className={styles.MenuItem}
            />  
            <Menu.Item 
                as={Link}
                to={'/kyc'}
                name={context.t("KYC")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("kyc")
                    } 
                }
                className={styles.MenuItem}
            />    
            <Menu.Item 
                as={Link}
                to={'/profile'}
                name={context.t("프로파일")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("profile")
                    } 
                }
                className={styles.MenuItem}
            />      
        </React.Fragment>
    )
}

const SpecialMenuItem = (props, context) => {
    return (
        <React.Fragment>            
            <Menu.Item 
                key={'language'}
                className={styles.MenuItemLanguage}
            >
                <Language 
                    onlyFlag={props.mobile === true ? false : true} 
                    onSelected={props.handleToggle}
                />
            </Menu.Item>
            <Menu.Item 
                as={Link}
                to={props.isLoggedIn ? "/" : "auth"}                
                onClick={
                    () => {
                        props.handleOnClickMenuItem(props.isLoggedIn ? "logout" : "auth")
                    } 
                }
                className={styles.MenuItemButton}
            >
                <Button 
                    size='big' 
                    color='blue'
                    className={styles.Button}
                >
                    {props.isLoggedIn ? context.t("로그아웃") : context.t("로그인")}                                        
                </Button>          
            </Menu.Item>
            <Menu.Item      
                className={styles.MenuItemButton}
            >
                <Button 
                    size='big' 
                    color='blue'
                    target="pdf-frame"
                    className={styles.Button}
                    onClick={
                        () => {
                            props.handleOnClickMenuItem("whitepaper")
                        } 
                    }
                >
                    {context.t("백서")}
                    {/* <a href={props.whitepaper} target="pdf-frame">{context.t("백서")}</a> */}
                </Button>
            </Menu.Item>
        </React.Fragment>
    )
}

const getClassnameWithPathname = (isMobile, pathname) => {        
    switch(pathname) {
        case '/' :
            if (isMobile === false) {
                return styles.DesktopSegmentHome
            } else {
                return styles.MobileSegmentHome
            }            
        default:
            if (isMobile === false) {
                return styles.DesktopSegment
            } else {
                return styles.MobileSegment
            }
    }   
}

Navigation.propTypes = {
    visible:  PropTypes.bool.isRequired,
    handleOnClickMenuItem: PropTypes.func.isRequired,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    handleCloseLogoutModal: PropTypes.func.isRequired,
    handleLogoutConfirm: PropTypes.func.isRequired,
    visibleLogoutConfirmModal: PropTypes.bool.isRequired,
    children: PropTypes.any,
    fixedMenu: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    whitepaper: PropTypes.string,
    handlePusher: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleVisibilityUpdate: PropTypes.func.isRequired,
}

Navigation.contextTypes = {
    t: PropTypes.func.isRequired
};

NavBarDesktop.contextTypes = {
    t: PropTypes.func.isRequired
};

NavBarMobile.contextTypes = {
    t: PropTypes.func.isRequired
};

DefaultMenuItem.contextTypes = {
    t: PropTypes.func.isRequired
};

SpecialMenuItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Navigation;
