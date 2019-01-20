import React from "react";
import PropTypes from "prop-types";
import { Segment,  Header, Checkbox, Button, Input, Icon, Form, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import StandardModal from "./../StandardModal";
import BasicModal from "./../BasicModal";
import styles from "./styles.module.scss";

const SignupForm = (props, context) => {
    const termsTitle = context.t("블루코츠 이용약관")
    const termsContents = [
        {
            title: context.t("제 1 조 [목적]"),
            text: [
                context.t("1. 주식회사 블루코츠(이하 “회사”)가 제공하는 블루코츠토큰 서비스(이하 “서비스”)의 이용조건 및 절차, “회사”와 고객간의 권리ㆍ의무 및 책임사항, 기타 필요한 기본적인 사항을 정함으로써, 거래의 신속하고 효율적인 처리를 도모하고 거래당사자 상호간의 이해관계를 합리적으로 조정하는 것을 목적으로 합니다."),
                context.t("2. 블루코츠토큰을 이용하려면 특정 기준을 충족해야 합니다. 예를 들어, 만 18세 이상의 성인이어야 하며, 블루코츠토큰을 사용할 때 불법 행위에 가담하거나 허위 사실을 유포하거나 “회사”의 서비스나 시스템을 손상시킬 수 있는 일을 하는 등의 행위는 할 수 없습니다. 자세한 내용은 고지 내용을 참조하시기 바랍니다."),
            ]
        },
        {
            title: context.t("제 2 조 [정의]"),
            text: [
                context.t("이 약관에서 사용하는 용어의 정의는 다음과 같습니다."),
                context.t("1. '서비스'라 함은 단말기(PC, 휴대형 단말기 등의 각종 유무선 장치를 포함)에 상관없이, 고객이 이용할 수 있는 블루코츠의 암호화폐 결제 서비스 및 이와 관련된 제반 서비스를 의미합니다."),
                context.t("2. '고객'이라 함은 서비스에 접속하여 이 약관에 따라 “회사”와 이용계약을 체결하고, “회사”가 제공하는 서비스를 이용하는 고객을 말합니다."),
                context.t("4. '블루코츠토큰'이라 함은 회원이 “회사”가 제공하는 서비스(예약 시스템 사용을 통한 수수료 수익 공유 등) 이용 시 부가적인 혜택을 제공하는 “회사” 자체 발행 암호화폐를 말합니다."),
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