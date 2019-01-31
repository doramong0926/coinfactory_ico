import React, { Component } from "react";
import PropTypes from "prop-types"
import LoginForm from "./presenter";
import "isomorphic-fetch";
import serverErrorTypes from "./../share/serverError.js";
import { BACKGROUND_IMAGE_TYPE } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            email: '',
            password: '',
            visibleErrorModal: false,
            isEnableSubmit: false,
            loginFailReason: null,
            isRememberme: false,
        }
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    static porpTypes = {
        Login: PropTypes.func.isRequired,
        SaveJwt: PropTypes.func.isRequired,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        changeMode: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired,
        rememberme: PropTypes.string,
        SaveRememberMe: PropTypes.func.isRequired,
        SaveBackgroundImage: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.SaveBackgroundImage(BACKGROUND_IMAGE_TYPE.LOGIN)
        if (this.props.rememberme !== null && this.props.rememberme !== undefined && this.props.rememberme !== "") {
            this.setState({
                email: this.props.rememberme,
                isRememberme: true,
            })
        }
    }

    render() {
        const { email, password} = this.state;
        return (
            <LoginForm 
                email={email} 
                password={password} 
                handleInputChange = {this._handleInputChange}
                handleSubmit = {this._handleSubmit}
                visibleErrorModal = {this.state.visibleErrorModal}
                handleCloseErrorModal = {this._handleCloseErrorModal}
                isEnableSubmit = {this.state.isEnableSubmit}
                changeMode = {this.props.changeMode}
                loginFailReason = {this.state.loginFailReason}
                isMobile = {this.props.isMobile}
                handleClickForgotPassword = {this._handleClickForgotPassword}
                handelClickRememberMe = {this._handelClickRememberMe}
                isRememberme = {this.state.isRememberme}
            />
        )
    }

    _handelClickRememberMe = () => {
        const isRememberme = this.state.isRememberme;
        if (isRememberme === true) {
            this.props.SaveRememberMe('');
        }
        this.setState({
            isRememberme: !isRememberme,
        })
    }

    _isEnableSubmit = () => {
        const { email, password } = this.state;
        if (email === "" || password === "") {
            this.setState({
                isEnableSubmit: false
            })
        } else {
            this.setState({
                isEnableSubmit: true
            })
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        })
        setTimeout(() => {
            this._isEnableSubmit()
        }, );
    }

    _handleCloseErrorModal = () => {
        this.setState({
            visibleErrorModal: false,
        })
    }

    _handleSubmit = (event) => {
        const {email, password} = this.state;
        this.props.ShowDefaultSpinner();
        // event.preventDefault();
        fetch("/rest-auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email: email,               
                password: password,                
            })
        })
        .then(
            response => response.json()
        )
        .then(json => {
            this.props.HideDefaultSpinner();
            if (json.token && json.user) {
                this.props.SaveJwt(json.token);
                this.props.SaveUsername(json.user.username);
                this.props.SaveEmail(json.user.email);
                this.props.Login();
                if (this.state.isRememberme) {
                    this.props.SaveRememberMe(json.user.email);
                }
            } else {
                this._setModalText(json)
                this.setState({
                    email: "",
                    password: "",
                    visibleErrorModal: true,
                })
            }
        })
        .catch (
            err => {
                console.log(err);
                this.props.HideDefaultSpinner()
            }
        )
    }

    _handleClickForgotPassword = () => {
        // const {email} = this.state;
        // this.props.ShowDefaultSpinner();
        // // event.preventDefault();
        // fetch("/rest-auth/password/reset/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ 
        //         email: email,                   
        //     })
        // })
        // .then(
        //     response => response.json()
        // )
        // .then(json => {
        //     this.props.HideDefaultSpinner();
        //     if (json.token && json.user) {
        //         this._setModalText(null)
        //         this.setState({
        //             email: "",
        //             password: "",
        //             visibleErrorModal: true,
        //         })
        //     } else {
        //         this._setModalText(json)
        //         this.setState({
        //             email: "",
        //             password: "",
        //             visibleErrorModal: true,
        //         })
        //     }
        // })
        // .catch (
        //     err => {
        //         console.log(err);
        //         this.props.HideDefaultSpinner()
        //     }
        // )
    }

    _setModalText = (json) => {
        if (json === null) {
            this.setState({
                loginFailReason: this.context.t("이메일 전송이 성공하였습니다. \n이메일을 통해 패스워드를 초기화 해주세요."),
                email: "",
                password1: "",
                password2: "",
            })
        }else if (json.non_field_errors !== undefined) {
            switch (json.non_field_errors.toString()) {
                case serverErrorTypes.LOGIN_EMAIL_IS_NOT_VERIFIED.toString():
                    this.setState({
                        loginFailReason: this.context.t("이메일 인증이 완료되지 않았습니다."),
                        email: "",
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        loginFailReason: this.context.t("이메일과 패스워드를 정확히 입력해 주세요."),
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