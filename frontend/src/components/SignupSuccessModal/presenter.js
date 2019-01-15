import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Segment,
    Icon,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const SignupSuccessModal = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={"small"}
            basic
            closeIcon
        >
            <Segment className={styles.ModalContainer}>
                <p>- {context.t("이메일을 인증해 주세요")} -</p>
                <Icon name='telegram plane' size='massive' className={styles.Icon} />
                <p className={styles.WelcomeText}>{context.t("환영합니다!")}</p>
                <p>{context.t("인증을 위한 메일을 전송했습니다.")}</p>
                <p className={styles.EmailText}>{props.email}</p>
                <p className={styles.DescriptionText}>{context.t("회원가입 완료를 위해 이메일에 포함된 주소로 이동해 주세요.")}</p>
                <span>{context.t("이메일을 받지 못하셨습니까? ")}</span>
                <span className={styles.ResentText}>{context.t("이메일 재전송")}</span>
            </Segment>
        </Modal>
    )
}

SignupSuccessModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
}

SignupSuccessModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default SignupSuccessModal;
