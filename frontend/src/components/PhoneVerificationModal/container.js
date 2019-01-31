import React, { Component } from "react";
import PhoneVerificationModal from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isEnableSubmit: true,            
            confirmNumber: null,
            confirmTimeout: 0,
            inputNumber: null,
            mobileVerificationError: false,
            ReRequestTimeOut: 0,
        }
    }

    static propTypes = {
        confirmTimeout: PropTypes.number.isRequired,
        confirmNumber: PropTypes.string,
        handleClose: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        size: PropTypes.string.isRequired,
        resend: PropTypes.func.isRequired,
        processDone: PropTypes.func.isRequired,
        mobileVerificationError: PropTypes.bool.isRequired,
    }

    componentDidMount() {        
        this.setState({
            confirmTimeout: this.props.confirmTimeout,
        })
        if (this.props.confirmNumber !== null) {
            this.setState({
                confirmNumber: this.props.confirmNumber,
            })
        }

        setInterval(() => {
            if (this.state.ReRequestTimeOut !== 0) {
                this.setState({
                    ReRequestTimeOut: (this.state.ReRequestTimeOut - 1),
                })
            }
        }, 1000);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.confirmNumber === null && nextProps.confirmNumber !== null)
        {
            this.setState({
                confirmNumber: nextProps.confirmNumber,
            })
        } else  if (this.props.confirmNumber !== nextProps.confirmNumber) {
            this.setState({
                confirmNumber: nextProps.confirmNumber,
            })
        }

        if (this.props.confirmTimeout !== nextProps.confirmTimeout) {
            this.setState({
                confirmTimeout: nextProps.confirmTimeout,
            })
        }

        if (this.props.mobileVerificationError !== nextProps.mobileVerificationError) {
            this.setState({
                mobileVerificationError: nextProps.mobileVerificationError,
            })
        }
    }

    render() {
        return (
            <PhoneVerificationModal
                visible={this.props.visible}
                size={this.props.size}
                handleClose={this.props.handleClose}
                handleClickResend={this._handleClickResend}
                isEnableSubmit={this.state.isEnableSubmit}
                confirmNumber={this.state.confirmNumber}
                confirmTimeout={this.state.confirmTimeout}
                handleInputChange={this._handleInputChange}
                inputNumber={this.state.inputNumber}
                mobileVerificationError={this.state.mobileVerificationError}
                ReRequestTimeOut={this.state.ReRequestTimeOut}
            />
        )
    }    

    _handleInputChange = (event) => {
        const { target : { value } } = event;
        this.setState({
            inputNumber: value,
        })
        setTimeout(() => {
            if (this.state.inputNumber.length === 4) {
                this._checkProcessDone()
            }
        }, );
    }

    _checkProcessDone = () => {
        console.log("this.state.inputNumber : ", this.state.inputNumber)
        console.log("this.state.confirmNumber : ", this.state.confirmNumber)
        if (this.state.inputNumber === this.state.confirmNumber && this.state.confirmTimeout > 0) {
            this.props.processDone(true)
        } else {
            this.props.processDone(false)
        }
        this.setState({
            inputNumber: null,
        })
    }

    _handleClickResend = () => {
        this.setState({
            inputNumber: null,
            ReRequestTimeOut: 10,
        })
        this.props.resend()
    }
}

export default Container;

