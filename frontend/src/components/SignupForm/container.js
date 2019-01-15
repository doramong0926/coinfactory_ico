import React, { Component } from "react";
import PropTypes from "prop-types"
import SignupForm from "./presenter";
import serverErrorTypes from "./../share/serverError.js";
import { REFERRAL_PREFIX, BACKGROUND_IMAGE_TYPE } from "./../../config/constants"
import "isomorphic-fetch";

class Container extends Component {    
    constructor(props, context) {
        super(props, context)
        this.state = {
            email: '',
            password1: '',
            password2: '',
            signupFailReason: null,
            visibleTermsModal: false,
            visibleResultModal: false,
            isAgreeTerms: false,
            isEnableSubmit: false,
            formErrorMessage: this.context.t("이메일/비밀번호를 입력해 주세요."),
            SignupSuccessEmail: null,
        }
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    static porpTypes = {
        Login: PropTypes.func.isRequired,
        SaveJwt: PropTypes.func.isRequired,
        ShowDefaultSpinner: PropTypes.bool.isRequired,
        HideDefaultSpinner: PropTypes.bool.isRequired,
        isLoggedIn: PropTypes.string.isRequired,
        changeMode: PropTypes.func.isRequired,
        referralQuery: PropTypes.string,
        isMobile: PropTypes.bool.isRequired,
        SaveBackgroundImage: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.SaveBackgroundImage(BACKGROUND_IMAGE_TYPE.SIGN_UP)
    }

    render() {
        const { email, password1, password2} = this.state;
        return (
            <SignupForm 
                email={email} 
                password1={password1} 
                password2={password2} 
                handleInputChange = {this._handleInputChange}
                handleSubmit = {this._handleSubmit}
                signupFailReason = {this.state.signupFailReason}
                visibleTermsModal = {this.state.visibleTermsModal}
                visibleResultModal = {this.state.visibleResultModal}
                handleCloseTermsModal = {this._handleCloseTermsModal}
                handleCloseResultModal = {this._handleCloseResultModal}
                handleOnClickTerms = {this._handleOnClickTerms}
                handelClickAgreeTerms = {this._handelClickAgreeTerms}
                isEnableSubmit = {this.state.isEnableSubmit}
                formErrorMessage = {this.state.formErrorMessage}
                changeMode = {this.props.changeMode}
                SignupSuccessEmail = {this.state.SignupSuccessEmail}
                isMobile = {this.props.isMobile}
            />
        )
    }

    _isEnableSubmit = () => {
        const { isAgreeTerms, email, password1, password2 } = this.state;
        if (email === "") {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("이메일을 입력해 주세요."),
            })
        } else if (password1 === "") {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("첫번째 비밀번호를 입력해 주세요."),
            })
        } else if (password2 === "") {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("두번째 비밀번호를 입력해 주세요."),
            })
        } else if (password1 !== password2) {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("비밀번호가 동일하지 않습니다."),
            })
        } else if (isAgreeTerms === false) {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("약관 및 정책을 확인하고 동의해 주세요."),
            })
        } else {
            this.setState({
                isEnableSubmit: true,
                formErrorMessage: this.context.t("회원가입 버튼을 눌러주세요."),
            })
        } 
    }

    _handelClickAgreeTerms = (event, data) => {
        
        this.setState({
            isAgreeTerms: data.checked,
        })
        setTimeout(() => {
            this._isEnableSubmit();    
        }, );
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        })
        setTimeout(() => {
            this._isEnableSubmit();    
        }, );
    }

    _handleOnClickTerms = () => {
        this.setState({
            visibleTermsModal: true,
        })
    }

    _handleCloseTermsModal = () => {
        this.setState({
            visibleTermsModal: false,
        })
    }

    _handleCloseResultModal = () => {
        this.setState({
            visibleResultModal: false,
        })
    }
    
    _handleSubmit = (event) => {
        const { email, password1, password2 } = this.state;
        this.props.ShowDefaultSpinner();
        // event.preventDefault();        
        const query = this.props.referralQuery !== null ? `${REFERRAL_PREFIX}${this.props.referralQuery}` : '';
        fetch(`/rest-auth/registration/${query}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password1: password1,
                password2: password2,
            })
        })        
        .then(response => response.json())
        .then(json => {
            this._setSignupResultReason(json)
            setTimeout(() => {
                if (this.state.signupFailReason !== null) {
                    this.setState({
                        visibleResultModal: true,
                    })
                }
                else {
                    this.setState({
                        SignupSuccessEmail: email,
                    })
                }
            }, );
            this.props.HideDefaultSpinner()
        })
        .catch(
            err => {
                console.log(err);
                this.props.HideDefaultSpinner()
            }
        )
    }

    _setSignupResultReason = (json) => {
        if (json.detail !== undefined) {
            if (json.detail.toString() === serverErrorTypes.SIGN_UP_EMAIL_SENT.toString()) {
                this.setState({                    
                    signupFailReason: null,
                    email: "",
                    password1: "",
                    password2: "",
                });          
            }
        }
        else if (json.email !== undefined) {
            switch (json.email.toString()) {
                case serverErrorTypes.SIGN_UP_EMAIL_EXIST.toString():
                    this.setState({
                        signupFailReason: this.context.t("동일한 이메일이 존재합니다."),
                        email: "",
                        password1: "",
                        password2: "",
                    })
                    break;

                case serverErrorTypes.SIGN_UP_PASSWORD_IS_TOO_SHORT.toString():
                    this.setState({
                        signupFailReason: this.context.t("입력하신 패스워드가 너무 짧습니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        signupFailReason: this.context.t("이메일과 패스워드를 정확히 입력해 주세요."),
                        email: "",
                        password1: "",
                        password2: "",
                    })
                    break;
            }
        }
        else if (json.password1 !== undefined) {
            switch (json.password1[0].toString()) {
                case serverErrorTypes.SIGN_UP_PASSWORD_IS_TOO_SHORT.toString():
                    this.setState({
                        signupFailReason: this.context.t("입력하신 패스워드가 너무 짧습니다."),
                        password1: "",
                        password2: "",
                    })
                    break;
                
                case serverErrorTypes.SIGN_UP_PASSWORD_IS_ONLY_NUMERIC.toString():
                    this.setState({
                        signupFailReason: this.context.t("패스워드는 최소한 한개의 문자가 포함되어야 합니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                case serverErrorTypes.SIGN_UP_PASSWORD_IS_TOO_COMMON.toString():
                    this.setState({
                        signupFailReason: this.context.t("패스워드가 너무 평범합니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        signupFailReason: this.context.t("이메일과 패스워드를 정확히 입력해 주세요."),
                        email: "",
                        password1: "",
                        password2: "",
                    })
                    break;
            }
        }
        else if (json.non_field_errors !== undefined) {
            switch (json.non_field_errors.toString()) {
                case serverErrorTypes.SIGN_UP_TWO_PASSWORD_IS_NOT_MATCH.toString():
                    this.setState({
                        signupFailReason: this.context.t("입력한 두개의 패스워드가 일치하지 않습니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        signupFailReason: this.context.t("이메일과 패스워드를 정확히 입력해 주세요."),
                        email: "",
                        password1: "",
                        password2: "",
                    })
                    break;
            }
        }
    }
}

export default Container;