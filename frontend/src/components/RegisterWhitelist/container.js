import React, { Component } from "react";
import RegisterWhitelist from "./presenter";
import PropTypes from "prop-types";
import { GetParentString, AddWhiteList } from "./../../utils/web3Control";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            tempkey: null,
            temp_string: null,
            isEnableControl: false,
            visibleIcoControlModal: false,
            visibleErrorModal: false,
            visibleSuccessModal: false,
            resultTxid: null,
            whitelist: null,
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
                handleOnOpenIcoControlModal={this._handleOnOpenIcoControlModal}                
                handleCloseIcoControlModal={this._handleCloseIcoControlModal}
                handleOnRegisterWhitelist={this._handleOnRegisterWhitelist}
                visibleIcoControlModal={this.state.visibleIcoControlModal}
                isEnableControl={this.state.isEnableControl}
                temp_string={this.state.temp_string}
                visibleErrorModal={this.state.visibleErrorModal}
                handleCloseErrorModal={this._handleCloseErrorModal}
                visibleSuccessModal={this.state.visibleSuccessModal}
                handleCloseSuccessModal={this._handleCloseSuccessModal}
                resultTxid={this.state.resultTxid}
                handleInputChange={this._handleInputChange}
                whitelist={this.state.whitelist}
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

    _handleOnOpenIcoControlModal = () => {
        this.setState({
            visibleIcoControlModal: true,
        })
    }

    _handleCloseIcoControlModal = () => {
        this.setState({
            visibleIcoControlModal: false,
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
            visibleIcoControlModal: false,
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

    _IsEnableControl = () => {
        setTimeout(() => {
            if (this.state.temp_string !== null && this.state.tempkey !== null && this.state.icoWalletList !== null
                && this.state.whitelist !== null && this.state.whitelist !== "") {
                this.setState({
                    isEnableControl: true,
                })
            } else {
                this.setState({
                    isEnableControl: false,
                })
            }
        }, );
    }
}

export default Container;