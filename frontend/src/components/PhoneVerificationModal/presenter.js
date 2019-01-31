import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Input,
    Button,
    Icon,
    Segment,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const PhoneVerificationModal = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={props.size}
            dimmer={'blurring'}
            basic
            style={{textAlign:'center', color:'black'}}
        >
            <Segment className={styles.Segment}>
                <Modal.Header>
                    <h2>{context.t("전화번호 인증")}</h2>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <div className={styles.TimeoutDivision}>
                            <p className={styles.TimeoutText}>{`${context.t("남은시간")} : ${props.confirmTimeout} ${context.t("초")}`}</p>
                        </div>
                        <div className={styles.InputDivision}>
                            <Input 
                                type='text' 
                                value={props.inputNumber === null || props.inputNumber === '' ? "" : props.inputNumber}
                                onChange={props.handleInputChange}
                                readOnly={!props.isEnableSubmit}
                                className={styles.InputBox}      
                                focus     
                            />                            
                        </div>                        
                    </Modal.Description>
                </Modal.Content>
                <Modal.Content>
                    <Modal.Description>
                        <div className={styles.Message}>
                            {
                                props.mobileVerificationError === true 
                                ? (
                                    <div className={styles.ErrorMessage}>
                                        <p>{context.t("정확한 인증 코드를 확인후 다시 입력해주세요.")}</p>                                    
                                    </div>
                                )
                                : (
                                    <div className={styles.ReadyMessage}>
                                        <p>{context.t("휴대폰으로 전송된 4자리 인증 코드를 입력해주세요.")}</p>                                                            
                                    </div>
                                )
                            }
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        className={styles.Button} 
                        onClick={props.handleClickResend}
                        disabled={props.ReRequestTimeOut !== 0}
                    >
                        <Icon name='checkmark' />{`${context.t('인증번호 다시 받기')} (${props.ReRequestTimeOut} ${context.t('초')})`}
                    </Button>
                </Modal.Actions>
            </Segment>
        </Modal>
    )    
}

PhoneVerificationModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    isEnableSubmit: PropTypes.bool.isRequired,
    confirmNumber: PropTypes.string,
    confirmTimeout: PropTypes.number.isRequired,
    handleClickResend: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputNumber: PropTypes.string,
    mobileVerificationError: PropTypes.bool.isRequired,
    ReRequestTimeOut: PropTypes.number.isRequired,
}

PhoneVerificationModal.contextTypes = {
    t: PropTypes.func.isRequired
};




export default PhoneVerificationModal;
