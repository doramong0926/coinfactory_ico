import React from "react";
import PropTypes from "prop-types";
import { 
    Header,
    Grid,
    Responsive
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const EmailActivation = (props, context) => {
    return (
        <div>
            <Responsive {...Responsive.onlyMobile}>
                <div className={styles.RootDivisionMobile}>
                    <Grid className={styles.Grid}>
                        <Grid.Column className={styles.Column}>
                            <VerifyResult {...props} /> 
                        </Grid.Column>
                    </Grid>
                </div>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <div className={styles.RootDivision}>
                    <Grid className={styles.Grid}>
                        <Grid.Column className={styles.Column}>
                            <VerifyResult {...props} /> 
                        </Grid.Column>
                    </Grid>
                </div>
            </Responsive>
        </div>
    )
}

const VerifyResult = (props, context) => {
    if (props.isLoading) {
        return (
            <div className={styles.Text}>
                <Header>{context.t("이메일 인증 중입니다.")}</Header>
            </div>
        )
    } else if (props.activation === true) {
        return (
            <div className={styles.Text}>
                <Header>{context.t("이메일 인증 에 성공하였습니다.")}</Header>
                <Header>{props.verifyedEmailAddress}</Header>
            </div>
        )
    } else if (props.activation === false) {
        return (
            <div className={styles.Text}>
            <Header>{context.t("이메일 인증 에 실패하였습니다.")}</Header>
            <Header>{context.t("운영팀으로 연락 부탁드립니다.")}</Header>
        </div>
        )
    }
}

EmailActivation.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    activation: PropTypes.bool.isRequired,
    verifyedEmailAddress: PropTypes.string.isRequired,
}

EmailActivation.contextTypes = {
    t: PropTypes.func.isRequired
};

VerifyResult.contextTypes = {
    t: PropTypes.func.isRequired
};

VerifyResult.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    activation: PropTypes.bool.isRequired,
}

export default EmailActivation;
