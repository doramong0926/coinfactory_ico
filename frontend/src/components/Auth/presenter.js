import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./../LoginForm"
import SignupForm from "./../SignupForm"
import { Grid, Responsive } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { AUTH_MODE } from "./../../config/constants"
import styles from "./styles.module.scss";

const Auth = (props, context) => {
    return ( 
        <div className={props.mode === AUTH_MODE.LOGIN ? styles.RootContainerSignin : styles.RootContainerSignup}>
            <Responsive {...Responsive.onlyMobile}>
                <div className={styles.DivisionMobile}>
                    <Grid className={styles.Grid} verticalAlign='middle'>
                        <Grid.Column className={styles.GridColumnMobile}>
                            {props.mode === AUTH_MODE.LOGIN && <LoginForm isMobile={true} changeMode={props.changeMode}/>}
                            {props.mode === AUTH_MODE.SIGNUP && <SignupForm isMobile={true} changeMode={props.changeMode}/>}
                        </Grid.Column>
                    </Grid>
                </div>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <div className={styles.Division}>
                    <Grid className={styles.Grid} verticalAlign='middle'>
                        <Grid.Column className={styles.GridColumn}>
                            {props.mode === AUTH_MODE.LOGIN && <LoginForm isMobile={false} changeMode={props.changeMode}/>}
                            {props.mode === AUTH_MODE.SIGNUP && <SignupForm isMobile={false} changeMode={props.changeMode}/>}
                        </Grid.Column>
                    </Grid>
                </div>
            </Responsive>
        </div>
    )
}
Auth.propTypes = {
    changeMode: PropTypes.func.isRequired,
};

Auth.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Auth;
