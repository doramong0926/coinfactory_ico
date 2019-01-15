import React from "react";
import PropTypes from "prop-types";
import { Segment,  Button, Input, Icon, Form, Header, Checkbox } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import BasicModal from "../BasicModal"
import styles from "./styles.module.scss";

const LoginForm = (props, context) => {
    const modalTitle = context.t("로그인 실패");
    const modalContents = [
        {
            title: null,
            text: [
                context.t("로그인에 실패하였습니다."),
                context.t(`${props.loginFailReason}`),
            ]
        },
    ];

    return (
        <div className={styles.InputContainer}>
            <Header as='h2' textAlign='center' className={props.isMobile?styles.HeaderTextMobile : styles.HeaderText}>
                {context.t("로그인")}
            </Header>
            <p className={styles.InputDescriptionText}>
                {context.t("KYC 인증과 등록을 위해 지금 바로 BLUECOTS 싸이트에 로그인하세요.")}
            </p>
            <Form size='large' onSubmit={props.handleSubmit}>
                <Segment basic className={styles.InputFormContainer}>
                    <div>
                        <Icon name='mail' />
                        <Input 
                            type='email' 
                            placeholder={context.t('이메일 주소 (계정 아이디로 사용)')}
                            value={props.email}
                            onChange={props.handleInputChange}
                            name='email'
                            className={props.isMobile === true ? styles.InputBoxMobile : styles.InputBox}
                        />
                    </div>
                    <div>
                        <Icon name='lock' />
                        <Input 
                            type='password' 
                            placeholder={context.t('비밀번호')}
                            value={props.password}
                            onChange={props.handleInputChange}
                            name='password'
                            className={props.isMobile === true ? styles.InputBoxMobile : styles.InputBox}
                        />
                    </div>
                    <div className={styles.CheckBoxContainer}>
                        <Checkbox 
                            onClick={props.handelClickRememberMe} 
                            className={props.isMobile === true ? styles.CheckBoxMobile : styles.CheckBox}
                            checked={props.isRememberme}
                        />
                        <span onClick={props.handelClickRememberMe} className={styles.TermsText}>{context.t('아이디 저장')}</span>
                    </div>   
                </Segment>
                <div className={styles.SubmitButtonContainer}>
                    <Button 
                        fluid={true} 
                        type='submit'
                        disabled={!props.isEnableSubmit}
                        className={styles.SubmitButton}
                    >
                        {context.t('로그인')}
                    </Button>                                       
                </div>
            </Form>
            <div className={styles.ForgotButtonContainer}>
                <Button 
                    fluid={true} 
                    onClick={props.handleClickForgotPassword}
                    className={styles.ForgotButton}
                >
                    {context.t('비밀번호 찾기')}
                </Button>
            </div>   
            <div className={styles.ToggleTextBox}>
                {context.t("아직 계정이 없으신가요?")} 
                <span 
                    className={styles.SignupText}                        
                    onClick={props.changeMode}>{context.t('회원가입')}
                </span>
            </div> 
            <BasicModal 
                visible = {props.visibleErrorModal}
                handleClose = {props.handleCloseErrorModal}
                size={"mini"} 
                title={modalTitle}
                contents={modalContents}                    
            />
        </div>
    )
}

LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    isEnableSubmit: PropTypes.bool.isRequired,
    changeMode: PropTypes.func.isRequired,
    loginFailReason: PropTypes.string,
    isMobile: PropTypes.bool.isRequired,
    handleClickForgotPassword: PropTypes.func.isRequired,
    handelClickRememberMe: PropTypes.func.isRequired,
    isRememberme: PropTypes.bool.isRequired,
}

LoginForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default LoginForm;