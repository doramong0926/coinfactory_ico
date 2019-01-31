import React, { Component } from "react";
import RegisterTempKey from "./presenter";
import PropTypes from "prop-types";
import CryptoJS from 'crypto-js';

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            token: null,
            tempkeyInputValue: null,
            isEnableSubmitTempkey: false,
            password1: null,
            password2: null,
            is_superuser: this.props.is_superuser,
            visibleModal: false,
            saveResult: false,
        };    
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        pathname: PropTypes.string,
        SaveTempkey: PropTypes.func.isRequired,
        token: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        username: PropTypes.string,
        saveTempString: PropTypes.func.isRequired,
        fetchTempString: PropTypes.func.isRequired,
        is_superuser: PropTypes.bool.isRequired,
        Logout: PropTypes.func.isRequired,
        DeleteJwt: PropTypes.func.isRequired,
        DeleteUsername: PropTypes.func.isRequired,
        DeleteEmail: PropTypes.func.isRequired,
        SaveKyc: PropTypes.func.isRequired,
    }

    componentDidMount () {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.setState({
                token: this.props.token,
            })
        }
        setTimeout(() => {
            this.props.fetchTempString();        
        }, );
    }

    componentWillReceiveProps (nextProps) {
        if ((this.props.token === null && nextProps.token !== null)
            || (this.props.token !== null && this.props.token !== nextProps.token !== null)) {
            this.setState({
                token: nextProps.token,
            })
        }

        if (this.props.is_superuser !== nextProps.is_superuser) {
            this.setState({
                is_superuser: nextProps.is_superuser,
            })
        }
    }

    render() {
        return (
            <RegisterTempKey 
                tempkeyInputValue={this.state.tempkeyInputValue}
                handleInputChange={this._handleInputChange}
                password1={this.state.password1}
                password2={this.state.password2}
                isEnableSubmitTempkey={this.state.isEnableSubmitTempkey}
                handleOnSubmitTempkey={this._handleOnSubmitTempkey}
                handleRemoveTempkey={this._handleRemoveTempkey}
                visibleModal={this.state.visibleModal}
                saveResult={this.state.saveResult}
                handleCloseModal={this._handleCloseModal}
            />
        )
    }

    _handleCloseModal = () => {
        this.setState({
            visibleModal: false,
            saveResult: false,
        })
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        })
        setTimeout(() => {
           this._checkIsEnable(); 
        }, );
    }

    _checkIsEnable = () => {
        if ((this.state.tempkeyInputValue !== null && this.state.tempkeyInputValue !== '') 
            && (this.state.password1 !== null && this.state.password1 !== '')
            && (this.state.password2 !== null && this.state.password2 !== '')
            && (this.state.password1 === this.state.password2)
            && (this.state.is_superuser === true)){
            this.setState({
                isEnableSubmitTempkey: true,
            })
        } else {
            this.setState({
                isEnableSubmitTempkey: false,
            })
        }
    }

    _handleOnSubmitTempkey = () => {        
        this._saveTempString("save");        
    }

    _handleRemoveTempkey = () => {
        this._saveTempString("remove");              
    }

    _DeleteUserInfo = () => { 
        this.props.DeleteJwt();
        this.props.DeleteUsername();
        this.props.DeleteEmail();
        this.props.SaveKyc(null);
        this.props.SaveProfile(null);
        this.props.Logout();
    }

    _saveTempString = (cmdType) => {
        // event.preventDefault();
        this.props.ShowDefaultSpinner();
        let stringValue = ""
        if (cmdType === "save") {    
            stringValue = CryptoJS.AES.encrypt(this.state.password1, process.env.REACT_APP_MAGIC_KEY).toString();
        }
        fetch(`/users/${this.props.username}/tempstring/`, {
            method: "PUT",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                temp_string: stringValue,
            })
        })
        .then( response => {
            if (response.status === 401){
                this._DeleteUserInfo();
                this.props.SaveTempkey('');
                this.setState({
                    password1: null,
                    password2: null,
                    tempkeyInputValue: null,
                    visibleModal: true,
                    saveResult: false,
                })
                this.props.HideDefaultSpinner();
                setTimeout(() => {
                    this.props.fetchTempString();    
                }, );
            } else {
                return response.json();
            }
        })
        .then(json => {            
            if (json.status === '1') {
                if (cmdType === "save") {
                    this.props.SaveTempkey(CryptoJS.AES.encrypt(this.state.tempkeyInputValue, this.state.password1).toString());                        
                    this.setState({
                        saveResult: true,
                    })
                } else {
                    this.props.SaveTempkey('');
                    this.setState({
                        saveResult: false,
                    })
                }
            } else {
                this.props.SaveTempkey("");    
                this.setState({
                    saveResult: false,
                })
            }      
            setTimeout(() => {
                this.props.fetchTempString();    
            }, );
            this.setState({
                password1: null,
                password2: null,
                tempkeyInputValue: null,
                visibleModal: true,
            })
            this.props.HideDefaultSpinner()
        })
        .catch (
            err => {
                console.log(err);                
                this.setState({
                    password1: null,
                    password2: null,
                    tempkeyInputValue: null,
                    visibleModal: true,
                    saveResult: false,
                })
                this.props.HideDefaultSpinner();
            }
        )
    }
}

export default Container;