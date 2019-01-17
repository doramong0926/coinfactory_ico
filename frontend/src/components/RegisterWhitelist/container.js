import React, { Component } from "react";
import RegisterWhitelist from "./presenter";
import PropTypes from "prop-types";
import { 
    GetParentString, 
    AddWhiteList, 
    RemoveWhiteList, 
} from "./../../utils/web3Control";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            tempkey: null,
            temp_string: null,
            isEnableRegisterWhitelist: false,
            isEnableRemoveWhitelist: false,
            visibleRegisterWhitelist: false,
            visibleRemoveWhitelist: false,
            visibleErrorModal: false,
            visibleSuccessModal: false,
            resultTxid: null,
            whitelist: null,
            whitelistForRemove: null,
        };    
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,        
        pathname: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        username: PropTypes.string,
        icoWalletList: PropTypes.object,
        tempkey: PropTypes.string,
        temp_string: PropTypes.string,
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
        if (this.props.temp_string !== undefined && this.props.temp_string !== null) {
            this.setState({
                temp_string: this.props.temp_string,
            })
        }
        this._IsEnableControl();            
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null && nextProps.icoWalletList !== undefined) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })
            this._IsEnableControl();            
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/icoinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
                this._IsEnableControl();            
            }
        }

        if (this.props.tempkey === null && nextProps.tempkey !== null) {
            this.setState({
                tempkey: nextProps.tempkey,
            })
            this._IsEnableControl();            
        } else if (this.props.tempkey !== null && this.props.tempkey !== nextProps.tempkey) {
            this.setState({
                tempkey: nextProps.tempkey,
            })
            this._IsEnableControl();            
        }

        if (this.props.temp_string === null && nextProps.temp_string !== null) {
            this.setState({
                temp_string: nextProps.temp_string,
            })
            this._IsEnableControl();            
        } else if (this.props.temp_string !== null && this.props.temp_string !== nextProps.temp_string) {
            this.setState({
                temp_string: nextProps.temp_string,
            })
            this._IsEnableControl();            
        }
    }

    render() {
        return (
            <RegisterWhitelist 
                handleOnOpenRegisterWhitelistModal={this._handleOnOpenRegisterWhitelistModal}                
                handleOnCloseRegisterWhitelistModal={this._handleOnCloseRegisterWhitelistModal}
                handleOnOpenRemoveWhitelistModal={this._handleOnOpenRemoveWhitelistModal}                
                handleOnCloseRemoveWhitelistModal={this._handleOnCloseRemoveWhitelistModal}
                handleOnRegisterWhitelist={this._handleOnRegisterWhitelist}
                handleOnRemoveWhitelist={this._handleOnRemoveWhitelist}
                visibleRegisterWhitelist={this.state.visibleRegisterWhitelist}
                visibleRemoveWhitelist={this.state.visibleRemoveWhitelist}
                isEnableRegisterWhitelist={this.state.isEnableRegisterWhitelist}
                isEnableRemoveWhitelist={this.state.isEnableRemoveWhitelist}
                temp_string={this.state.temp_string}
                visibleErrorModal={this.state.visibleErrorModal}
                handleCloseErrorModal={this._handleCloseErrorModal}
                visibleSuccessModal={this.state.visibleSuccessModal}
                handleCloseSuccessModal={this._handleCloseSuccessModal}
                resultTxid={this.state.resultTxid}
                handleInputChange={this._handleInputChange}
                whitelist={this.state.whitelist}
                whitelistForRemove={this.state.whitelistForRemove}
            />
        )
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        })
        setTimeout(() => {
           this._IsEnableControl(); 
        }, );
    }

    _handleOnOpenRegisterWhitelistModal = () => {
        this.setState({
            visibleRegisterWhitelist: true,
        })
    }

    _handleOnCloseRegisterWhitelistModal = () => {
        this.setState({
            visibleRegisterWhitelist: false,
        })
    }

    _handleOnOpenRemoveWhitelistModal = () => {
        this.setState({
            visibleRemoveWhitelist: true,
        })
    }

    _handleOnCloseRemoveWhitelistModal = () => {
        this.setState({
            visibleRemoveWhitelist: false,
        })
    }

    _handleCloseErrorModal = () => {
        this.setState({
            visibleErrorModal: false,
        })
    }

    _handleCloseSuccessModal = () => {
        this.setState({
            visibleSuccessModal: false,
        })
    }

    _handleOnRegisterWhitelist = async (result) => {
        this.setState({
            visibleRegisterWhitelist: false,
        })
        if (result === true) {
            const parentString = GetParentString(this.props.tempkey, this.props.temp_string);         
            if (parentString !== null) {
                const whitelistArray = this.state.whitelist.split(",")
                try {
                    const txid = await AddWhiteList(                        
                        parentString,
                        this.state.icoWalletList.icoWallet, 
                        this.state.icoWalletList.ownerWallet,
                        whitelistArray,
                    );
                    this.setState({
                        visibleSuccessModal: true,
                        resultTxid: txid,
                        whitelist: null,
                    })
                } catch(err) {   
                    console.log(err)                 
                    this.setState({
                        visibleErrorModal: true,
                        whitelist: null,
                    })
                }
            } else {
                this.setState({
                    visibleErrorModal: true,
                    whitelist: null,
                })
            }
        } else {
            this.setState({
                visibleErrorModal: true,
                whitelist: null,
            })
        }
    }

    _handleOnRemoveWhitelist = async (result) => {
        this.setState({
            visibleRemoveWhitelist: false,
        })
        if (result === true) {
            const parentString = GetParentString(this.props.tempkey, this.props.temp_string);         
            if (parentString !== null) {
                try {
                    const txid = await RemoveWhiteList(                        
                        parentString,
                        this.state.icoWalletList.icoWallet, 
                        this.state.icoWalletList.ownerWallet,
                        this.state.whitelistForRemove,
                    );
                    this.setState({
                        visibleSuccessModal: true,
                        resultTxid: txid,
                        whitelistForRemove: null,
                    })
                } catch(err) {   
                    console.log(err)                 
                    this.setState({
                        visibleErrorModal: true,
                        whitelistForRemove: null,
                    })
                }   
            } else {
                this.setState({
                    visibleErrorModal: true,
                    whitelistForRemove: null,
                })
            }
        } else {
            this.setState({
                visibleErrorModal: true,
                whitelistForRemove: null,
            })
        }
    }

    _IsEnableControl = () => {
        setTimeout(() => {
            if (this.state.temp_string !== null && this.state.tempkey !== null && this.state.icoWalletList !== null
                && this.state.whitelist !== null && this.state.whitelist !== "") {
                this.setState({
                    isEnableRegisterWhitelist: true,
                })
            } else {
                this.setState({
                    isEnableRegisterWhitelist: false,
                })
            }

            if (this.state.temp_string !== null && this.state.tempkey !== null && this.state.icoWalletList !== null
                && this.state.whitelistForRemove !== null && this.state.whitelistForRemove !== "") {
                this.setState({
                    isEnableRemoveWhitelist: true,
                })
            } else {
                this.setState({
                    isEnableRemoveWhitelist: false,
                })
            }
        }, );
    }
}

export default Container;