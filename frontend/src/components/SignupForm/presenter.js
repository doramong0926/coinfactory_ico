import React from "react";
import PropTypes from "prop-types";
import { Segment,  Header, Checkbox, Button, Input, Icon, Form, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import StandardModal from "./../StandardModal";
import BasicModal from "./../BasicModal";
import styles from "./styles.module.scss";

const SignupForm = (props, context) => {
    const termsTitle = context.t("약관 & 정책")
    const termsContents = [
        {
            title: context.t("약관"),
            text: [
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
                context.t("1. 저는 평생 블루코츠 코인에 충성하며 살것을 맹세 합니다."),
            ]
        },
        {
            title: context.t("약관"),
            text: [
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
                context.t("1. 저는 블루코츠 산것을 절대 후회하지 않고 살것을 맹세합니다."),
            ]
        },
    ];

    const modalTitle = context.t("회원가입 실패")

    const modalContents = [
        {
            title: null,
            text: [
                context.t("회원가입에 실패하였습니다."),
                context.t(`${props.signupFailReason}`)
            ]
        },
    ];
    return (
        <React.Fragment>
            {(props.SignupSuccessEmail === null
                ? (
                    <div className={styles.InputContainer}>
                        <Header as='h2' textAlign='center' className={props.isMobile?styles.HeaderTextMobile : styles.HeaderText}>
                            {context.t("회원가입")}
                        </Header>
                        <p className={styles.InputDescriptionText}>
                            {context.t("패스워드는 하나이상의 숫자와 8자리의 이상의 문자를 사용해 주세요.")}
                        </p>
                        <Form size='large' error onSubmit={props.handleSubmit}>
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
                                        value={props.password1}
                                        onChange={props.handleInputChange}
                                        name='password1'
                                        className={props.isMobile === true ? styles.InputBoxMobile : styles.InputBox}
                                    />
                                </div>
                                <div>
                                    <Icon name='lock' />
                                    <Input 
                                        type='password' 
                                        placeholder={context.t('비밀번호 확인')}
                                        value={props.password2}
                                        onChange={props.handleInputChange}
                                        name='password2'
                                        className={props.isMobile === true ? styles.InputBoxMobile : styles.InputBox}
                                    />
                                </div>
                                <div className={styles.CheckBoxContainer}>
                                    <Checkbox 
                                        onClick={props.handelClickAgreeTerms} 
                                        className={props.isMobile === true ? styles.CheckBoxMobile : styles.CheckBox}
                                    />
                                    <span>{context.t('저는 다음의 ')}</span>
                                    <span onClick={props.handleOnClickTerms} className={styles.TermsText}>{context.t('약관 및 정책 ')}</span>
                                    <span>{context.t(' 을 이해했고 이에 모두 동의합니다.')}</span>
                                    <StandardModal 
                                        visible = {props.visibleTermsModal}
                                        handleClose = {props.handleCloseTermsModal}
                                        size={"tiny"} 
                                        title={termsTitle} 
                                        contents={termsContents}
                                    />
                                </div>                                     
                            </Segment>
                            <div className={styles.ButtonContainer}>
                                <Button 
                                    fluid={true} 
                                    type='submit'
                                    disabled={!props.isEnableSubmit}
                                    className={styles.SubmitButton}
                                >
                                    {context.t('회원가입')}
                                </Button>    
                            </div>
                        </Form>
                        <div className={styles.ToggleTextBox}>
                            {context.t("계정이 이미 있으신가요?")} 
                            <span 
                                className={styles.LoginText}                        
                                onClick={props.changeMode}>{context.t('로그인')}
                            </span>
                        </div>                             
                    </div>
                )
            :   (
                    <div className={styles.InputContainer}>
                        <Segment basic className={styles.SuccessSegment}>
                            <p className={styles.WelcomeText}>{context.t("환영합니다!")}</p>
                            <p className={styles.WelcomeText}>{context.t("이메일을 인증해주세요.")}</p>
                            <Image className={styles.SuccessEmailImage} src={require('images/icons/signup_sucess_send_email.png')} />
                            <p className={styles.DescriptionText}>{context.t("아래 주소로 인증 메일을 전송했습니다.")}</p>
                            <p className={styles.EmailText}>{props.SignupSuccessEmail}</p>
                            <p className={styles.DescriptionText}>{context.t("회원가입 완료를 위하여 전송된 메일에 포함된 링크를 클릭해주세요.")}</p>
                            <div className={styles.ButtonContainer}>
                                <Button 
                                    fluid={true} 
                                    className={styles.SubmitButton}
                                    onClick={props.changeMode}
                                >
                                    {context.t('로그인')}
                                </Button>   
                            </div>
                            <div className={styles.ResendEmailText}>
                                <span>{context.t("이메일을 받지 못하셨습니까? ")}</span>
                                <span className={styles.ResentText}>{context.t("재전송")}</span>
                            </div>
                        </Segment>
                    </div>
                )
            )}
            <BasicModal 
                visible = {props.visibleResultModal}
                handleClose = {props.handleCloseResultModal}
                size={"mini"} 
                title={modalTitle}
                contents={modalContents}
            />
        </React.Fragment>
    )
};

SignupForm.propTypes = {
    signupFailReason: PropTypes.string,
    email: PropTypes.string.isRequired,
    password1: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    visibleTermsModal: PropTypes.bool.isRequired,
    visibleResultModal: PropTypes.bool.isRequired,
    handleCloseTermsModal: PropTypes.func.isRequired,
    handleCloseResultModal: PropTypes.func.isRequired,
    handleOnClickTerms: PropTypes.func.isRequired,
    handelClickAgreeTerms: PropTypes.func.isRequired,
    isEnableSubmit: PropTypes.bool.isRequired,
    formErrorMessage: PropTypes.string.isRequired,
    changeMode: PropTypes.func.isRequired,
    SignupSuccessEmail: PropTypes.string,
    isMobile: PropTypes.bool.isRequired,
}

SignupForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SignupForm;