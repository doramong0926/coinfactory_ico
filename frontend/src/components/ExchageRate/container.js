import React, { Component } from "react";
import ExchageRate from "./presenter";
import PropTypes from "prop-types";
import { GetParentString, SetExchangeRate, GetExchangeRate } from "./../../utils/web3Control"

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            tempkey: null,
            temp_string: null,
            isEnableControl: false,
            visibleControlIcoModal: false,
            visibleErrorModal: false,
            visibleSuccessModal: false,
            resultTxid: null,
            exchangeRate: null,
            inputRate: null,
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
            setTimeout(() => {
                this._getExchangeRate(); 
             }, );     
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
            setTimeout(() => {
                this._getExchangeRate(); 
             }, );
            this._IsEnableControl();            
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/icoinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
                setTimeout(() => {
                    this._getExchangeRate(); 
                 }, );
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
            <ExchageRate 
                handleOnOpenControlModal={this._handleOnOpenControlModal}                
                handleOnCloseControlModal={this._handleOnCloseControlModal}
                handleOnSetExchangeRate={this._handleOnSetExchangeRate}
                visibleControlIcoModal={this.state.visibleControlIcoModal}
                isEnableControl={this.state.isEnableControl}
                temp_string={this.state.temp_string}
                visibleErrorModal={this.state.visibleErrorModal}
                handleCloseErrorModal={this._handleCloseErrorModal}
                exchangeRate={this.state.exchangeRate}
                visibleSuccessModal={this.state.visibleSuccessModal}
                handleCloseSuccessModal={this._handleCloseSuccessModal}
                resultTxid={this.state.resultTxid}
                inputRate={this.state.inputRate}
                handleInputChange={this._handleInputChange}
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

    _handleOnOpenControlModal = () => {
        this.setState({
            visibleControlIcoModal: true,
        })
    }

    _handleOnCloseControlModal = () => {
        this.setState({
            visibleControlIcoModal: false,
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

    _getExchangeRate = async () => {
        if (this.state.icoWalletList !== null) {
            try {
                const result = await GetExchangeRate(this.state.icoWalletList.icoWallet);
                this.setState({
                    exchangeRate: result.toString(),
                })
            } catch {
                console.log("fail to get exchangeRate from contract.")
            }
        }
    }

    _handleOnSetExchangeRate = async (result) => {
        this.setState({
            visibleControlIcoModal: false,
        })
        if (result === true) {
            const parentString = GetParentString(this.props.tempkey, this.props.temp_string);            
            if (parentString !== null) {
                try {
                    const txid = await SetExchangeRate(
                        this.state.exchangeRate,
                        parentString,
                        this.state.icoWalletList.icoWallet, 
                        this.state.icoWalletList.ownerWallet
                    );
                    this.setState({
                        visibleSuccessModal: true,
                        resultTxid: txid,
                        inputRate: null,
                    })
                    setTimeout(() => {
                        this._getExchangeRate();
                    }, );
                } catch(err) {                    
                    this.setState({
                        visibleErrorModal: true,
                        inputRate: null,
                    })
                }
            } else {
                this.setState({
                    visibleErrorModal: true,
                    inputRate: null,
                })
            }
        } else {
            this.setState({
                visibleErrorModal: true,
                inputRate: null,
            })
        }
    }

    _IsEnableControl = () => {
        setTimeout(() => {
            if (this.state.inputRate !== null && this.state.inputRate !== ""
                && this.state.temp_string !== null && this.state.tempkey !== null 
                && this.state.icoWalletList !== null) {
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