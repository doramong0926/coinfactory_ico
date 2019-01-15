import React, { Component } from "react";
import StartStopIco from "./presenter";
import PropTypes from "prop-types";
import { GetParentString } from "./../../utils/web3Control";
import { ContractStartStop } from "./../../utils/web3Control"

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            tempkey: null,
            temp_string: null,
            isEnableControl: false,
            visibleStartIcoModal: false,
            visibleStopIcoModal: false,
            visibleErrorModal: false,
            visibleSuccessModal: false,
            resultTxid: null,
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
        isIcoStarted: PropTypes.bool,
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
            <StartStopIco 
                handleOnOpenStartIcoModal={this._handleOnOpenStartIcoModal}                
                handleCloseStartIcoModal={this._handleCloseStartIcoModal}
                handleOnStartIco={this._handleOnStartIco}
                visibleStartIcoModal={this.state.visibleStartIcoModal}
                handleOnOpenStopIcoModal={this._handleOnOpenStopIcoModal}
                handleCloseStopIcoModal={this._handleCloseStopIcoModal}
                handleOnStopIco={this._handleOnStopIco}                
                visibleStopIcoModal={this.state.visibleStopIcoModal}
                isEnableControl={this.state.isEnableControl}
                temp_string={this.state.temp_string}
                visibleErrorModal={this.state.visibleErrorModal}
                handleCloseErrorModal={this._handleCloseErrorModal}
                isIcoStarted={this.props.isIcoStarted}
                visibleSuccessModal={this.state.visibleSuccessModal}
                handleCloseSuccessModal={this._handleCloseSuccessModal}
                resultTxid={this.state.resultTxid}
            />
        )
    }

    _handleOnOpenStartIcoModal = () => {
        this.setState({
            visibleStartIcoModal: true,
        })
    }

    _handleCloseStartIcoModal = () => {
        this.setState({
            visibleStartIcoModal: false,
        })
    }

    _handleOnOpenStopIcoModal = () => {
        this.setState({
            visibleStopIcoModal: true,
        })
    }

    _handleCloseStopIcoModal = () => {
        this.setState({
            visibleStopIcoModal: false,
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

    _handleOnStartIco = async (result) => {
        this.setState({
            visibleStartIcoModal: false,
        })
        if (result === true) {
            const parentString = GetParentString(this.props.tempkey, this.props.temp_string);            
            if (parentString !== null) {
                try {
                    const txid = await ContractStartStop(
                        1,
                        parentString,
                        this.state.icoWalletList.icoWallet, 
                        this.state.icoWalletList.ownerWallet
                    );
                    this.setState({
                        visibleSuccessModal: true,
                        resultTxid: txid,
                    })
                } catch(err) {                    
                    this.setState({
                        visibleErrorModal: true,
                    })
                }
            } else {
                this.setState({
                    visibleErrorModal: true,
                })
            }
        } else {
            this.setState({
                visibleErrorModal: true,
            })
        }
    }

    _handleOnStopIco = async (result) => {
        this.setState({
            visibleStopIcoModal: false,
        })        
        if (result === true) {
            const parentString = GetParentString(this.props.tempkey, this.props.temp_string);
            if (parentString !== null) {
                try {
                    const txid = await ContractStartStop(
                        0,
                        parentString,
                        this.state.icoWalletList.icoWallet, 
                        this.state.icoWalletList.ownerWallet
                    );
                    this.setState({
                        visibleSuccessModal: true,
                        resultTxid: txid,
                    })
                } catch {
                    this.setState({
                        visibleErrorModal: true,
                    })
                }
            } else {
                this.setState({
                    visibleErrorModal: true,
                })
            }
        } else {
            this.setState({
                visibleErrorModal: true,
            })
        }
    }

    _IsEnableControl = () => {
        setTimeout(() => {
            if (this.state.temp_string !== null && this.state.tempkey !== null && this.state.icoWalletList !== null) {
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