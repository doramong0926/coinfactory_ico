import React, { Component } from "react";
import UserInfoModal from "./presenter";
import PropTypes from "prop-types";
import { KYC_STATUS } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEnableSubmit: false,
            isEnableInputKycStatus: false,
            isEnableInputKycRejectReason: false,
            newKycStatus: null,
            newKycStatusRejectReason: null,
            userInfomation: null,
        };    
    }

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleProcessDone: PropTypes.func.isRequired,
        userInfomation: PropTypes.object,
    }

    componentDidMount () {
        if (this.props.userInfomation !== null && this.props.userInfomation !== undefined) {
            this.setState({
                userInfomation: this.props.userInfomation,
            })
            setTimeout(() => {
                this._checkEnableInputKycStatus();    
            }, );
        }

        if (this.props.investedEth !== null) {
            this.setState({
                investedEth: this.props.investedEth,
            })
        }

        if (this.props.receivedBlc !== null) {
            this.setState({
                receivedBlc: this.props.receivedBlc,
            })
        }

    }

    componentWillReceiveProps (nextProps) {
        if ((this.props.userInfomation === null || this.props.userInfomation === undefined) 
            && (nextProps.userInfomation !== null && nextProps.userInfomation !== undefined))
        {
            this.setState({
                userInfomation: nextProps.userInfomation,
            })
            setTimeout(() => {
                this._checkEnableInputKycStatus();    
            }, );
        } else if (this.props.userInfomation !== null && this.props.userInfomation !== undefined) {
            if (this.props.userInfomation.username !== nextProps.userInfomation.username
                || this.props.userInfomation.kyc_status !== nextProps.userInfomation.kyc_status
                || this.props.userInfomation.kyc_reject_reason !== nextProps.userInfomation.kyc_reject_reason) {
                    this.setState({
                        userInfomation: nextProps.userInfomation,
                    })
                    setTimeout(() => {
                        this._checkEnableInputKycStatus();    
                    }, );
            }
        }

        if (this.props.investedEth !== nextProps.investedEth) {
            this.setState({
                investedEth: nextProps.investedEth,
            })
        }
        if (this.props.receivedBlc !== nextProps.receivedBlc) {
            this.setState({
                receivedBlc: nextProps.receivedBlc,
            })
        }
    }

    render() {
        return (
            <UserInfoModal
                visible={this.props.visible}
                handleClose={this._handleClose}
                handleProcessDone={this._handleProcessDone}
                isEnableSubmit={this.state.isEnableSubmit}
                userInfomation={this.state.userInfomation}
                isEnableInputKycStatus={this.state.isEnableInputKycStatus}
                isEnableInputKycRejectReason={this.state.isEnableInputKycRejectReason}
                handleChangeKycStatus={this._handleChangeKycStatus}
                newKycStatus={this.state.newKycStatus}
                newKycStatusRejectReason={this.state.newKycStatusRejectReason}
                handleChangeKycRejectReason={this._handleChangeKycRejectReason}
                investedEth={this.state.investedEth}
                receivedBlc={this.state.receivedBlc}
            />
        )
    }    

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        })
        setTimeout(() => {
            this._checkEnableSubmit();    
        }, );
    }
   
    _handleChangeKycRejectReason = (e, { value }) => {
        this.setState({
            newKycStatusRejectReason: value,
        })
        setTimeout(() => {
            this._checkEnableSubmit();    
        }, );
    }

    _handleChangeKycStatus = (e, { value }) => {
        this.setState({
            newKycStatus: value,
        })
        if (value === KYC_STATUS.REJECTED) {
            this.setState({
                isEnableInputKycRejectReason: true,
                newKycStatusRejectReason: null,
            })  
        } else {
            this.setState({
                isEnableInputKycRejectReason: false,
                newKycStatusRejectReason: null,
            })  
        }
        setTimeout(() => {
            this._checkEnableSubmit();    
        }, );
    }

    _checkEnableInputKycStatus = () => {
        if (this.state.userInfomation.kyc_status === KYC_STATUS.APPROVING) {
            this.setState({
                isEnableInputKycStatus: true,
            }) 
        } else {
            this.setState({
                isEnableInputKycStatus: false,
            }) 
        }
    }

    _checkEnableSubmit = () => {
        if (this.state.userInfomation.kyc_status === KYC_STATUS.APPROVING 
            &&  this.state.newKycStatus === KYC_STATUS.REJECTED 
            && this.state.newKycStatusRejectReason !== null && this.state.newKycStatusRejectReason !== '') {
                this.setState({
                    isEnableSubmit: true,
                })  
        } else if (this.state.userInfomation.kyc_status === KYC_STATUS.APPROVING
            && this.state.newKycStatus !== null && this.state.newKycStatus !== ''
            && this.state.newKycStatus === KYC_STATUS.APPROVED ) {
            this.setState({
                isEnableSubmit: true,
            })  
        } else {
            this.setState({
                isEnableSubmit: false,
            })  
        }
    }

    _handleClose = () => {
        this.setState(
            {
                isEnableSubmit: false,
                isEnableInputKycStatus: false,
                isEnableInputKycRejectReason: false,
                newKycStatus: null,
                newKycStatusRejectReason: null,
            }
        )
        setTimeout(() => {
            this._checkEnableInputKycStatus();
            this._checkEnableSubmit();  
        }, );
        this.props.handleClose();
    }

    _handleProcessDone = (username, kycStatus, rejectReason) => {
        this._handleClose();
        this.props.handleProcessDone(username, kycStatus, rejectReason);
        
    }    
}

export default Container;

