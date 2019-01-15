import React, { Component } from "react";
import IcoInfo from "./presenter";
import PropTypes from "prop-types";
import CryptoJS from 'crypto-js';
import { GetIsIcoStarted } from "./../../utils/web3Control"

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            tempkey: null,
            token: null,
            tempkeyInputValue: null,
            isEnableSubmitTempkey: false,
            password1: null,
            password2: null,
            user_type: null,
            is_superuser: false,
            is_staff: false,
            temp_string: null,
            visible_modal: false,
            isIcoStarted: null,
        };    
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        icoWalletList: PropTypes.object,
        pathname: PropTypes.string,
        SaveTempkey: PropTypes.func.isRequired,
        Logout: PropTypes.func.isRequired,
        token: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        username: PropTypes.string,
        // tempkey: PropTypes.string,
    }

    componentDidMount () {
        if (this.props.icoWalletList !== undefined && this.props.icoWalletList !== null) {
            this.setState({
                icoWalletList: this.props.icoWalletList,
            })
        }
        if (this.props.tempkey !== undefined && this.props.tempkey !== null) {
            this.setState({
                tempkey: this.props.tempkey,
            })
        }
        if (this.props.token !== undefined && this.props.token !== null) {
            this.setState({
                token: this.props.token,
            })
        }
        setTimeout(() => {
            this._getIsIcoStarted();
            this._fetchTempString();        
        }, );
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null && nextProps.icoWalletList !== undefined) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })
            setTimeout(() => {
                this._getIsIcoStarted();    
            }, );
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/icoinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
                setTimeout(() => {
                    this._getIsIcoStarted();    
                }, );
            }
        }

        if (this.props.tempkey === null && nextProps.tempkey !== null) {
            this.setState({
                tempkey: nextProps.tempkey,
            })
        }

        if (this.props.token === null && nextProps.token !== null) {
            this.setState({
                token: nextProps.token,
            })
        }
    }

    render() {
        return (
            <IcoInfo 
                icoWalletList={this.state.icoWalletList}
                tempkeyInputValue={this.state.tempkeyInputValue}
                handleInputChange={this._handleInputChange}
                password1={this.state.password1}
                password2={this.state.password2}
                isEnableSubmitTempkey={this.state.isEnableSubmitTempkey}
                handleOnSubmitTempkey={this._handleOnSubmitTempkey}
                handleRemoveTempkey={this._handleRemoveTempkey}
                tempkey={this.state.tempkey}
                temp_string={this.state.temp_string}
                isIcoStarted={this.state.isIcoStarted}
            />
        )
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

    _getIsIcoStarted = async () => {
        if (this.state.icoWalletList !== null) {
            try {
                const result = await GetIsIcoStarted(this.state.icoWalletList.icoWallet);
                this.setState({
                    isIcoStarted: result,
                })
            } catch {
                console.log("fail to get startIco from contract.")
            }
        }
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
        .then(
            response => response.json()
        )
        .then(json => {            
            if (json.status === '1') {
                if (cmdType === "save") {
                    this.props.SaveTempkey(CryptoJS.AES.encrypt(this.state.tempkeyInputValue, this.state.password1));                        
                } else {
                    this.props.SaveTempkey('');
                }
            } else {
                this.props.SaveTempkey("");    
            }      
            setTimeout(() => {
                this._fetchTempString();    
            }, );
            this.setState({
                password1: "",
                password2: "",
                tempkeyInputValue: "",
                visible_modal: true,
            })
            this.props.HideDefaultSpinner()
        })
        .catch (
            err => {
                console.log(err);
                this.props.HideDefaultSpinner();
            }
        )
    }

    _fetchTempString = () => {
        fetch(`/users/${this.props.username}/tempstring/`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {        
                this.setState({
                    user_type: json.result.user_type,
                    is_superuser: json.result.is_superuser,
                    is_staff: json.result.is_staff,
                })
                if (json.result.temp_string !== null) {
                    const temp_string = CryptoJS.AES.decrypt(json.result.temp_string, process.env.REACT_APP_MAGIC_KEY).toString(CryptoJS.enc.Utf8)    
                    this.setState({
                        temp_string: temp_string,
                    })
                }                
            } else {
                console.log("fail to get user type")
                this.setState({
                    user_type: null,
                    is_superuser: false,
                    is_staff: false,
                })
            }            
        })
        .catch (
            err => {
                console.log(err);
            }
        )
    }
}

export default Container;