import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import {
    Segment,
    Menu,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import DashBoard from "../DashBoard";
import IcoInfo from "../IcoInfo";
import UserInfo from "../UserInfo";
import ConfirmModal from "./../ConfirmModal"

import Auth from "../Auth";



const Admin = (props, context) => {
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

    return(            
        <React.Fragment>
            <div className={styles.RootDivision}>
                <Menu className={styles.MenuBox}>
                    <Menu.Item 
                        as={Link}
                        to={'/superman/'}
                        name={'Dashboard'}
                        onClick={
                            () => {
                                props.handleOnClickMenuItem("dashboard")
                            } 
                        }                
                        className={styles.MenuItem}
                    /> 
                    <Menu.Item 
                        as={Link}
                        to={'/superman/icoinfo/'}
                        name={'ICO infomation'}
                        onClick={
                            () => {
                                props.handleOnClickMenuItem("icoinfo")
                            } 
                        }                
                        className={styles.MenuItem}
                    />
                    <Menu.Item 
                        as={Link}
                        to={'/superman/userinfo/'}
                        name={'User infomation'}
                        onClick={
                            () => {
                                props.handleOnClickMenuItem("userinfo")
                            } 
                        }                
                        className={styles.MenuItem}
                    />  
                    <Menu.Item 
                        name={'Logout'}
                        onClick={
                            () => {
                                props.handleOnClickMenuItem("logout")
                            } 
                        }                
                        className={styles.MenuItem}
                    />  
                </Menu>
                <Segment basic vertical className={styles.RootSegment}>
                    <Switch>
                        <Route exact path="/superman" component={props.isLoggedIn === true ? DashBoard : Auth } />
                        <Route exact path="/superman/icoinfo/" component={props.isLoggedIn === true ? IcoInfo : Auth } />
                        <Route exact path="/superman/userInfo/" component={props.isLoggedIn === true ? UserInfo : Auth } />
                    </Switch>
                </Segment>
            </div>
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

Admin.propTypes = {    
    handleOnClickMenuItem: PropTypes.func.isRequired,
    visibleLogoutConfirmModal: PropTypes.bool.isRequired,
    handleCloseLogoutModal: PropTypes.func.isRequired,
    handleLogoutConfirm: PropTypes.func.isRequired,
    currentRound: PropTypes.object,
    is_superuser: PropTypes.bool.isRequired,
    is_staff: PropTypes.bool.isRequired,
}

Admin.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Admin;