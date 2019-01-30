import React, { Component } from "react";
import IcoControlConfirmModal from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: null,
            isEnableSubmit: false,
        };    
    }

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        size: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleConfirm: PropTypes.func.isRequired,
        temp_string: PropTypes.string,
    }

    render() {
        return (
            <IcoControlConfirmModal
                visible={this.props.visible}
                size={this.props.size}
                title={this.props.title}
                handleClose={this._handleClose}
                handleConfirm={this._handleConfirm}
                temp_string={this.props.temp_string}
                password={this.state.password}
                isEnableSubmit={this.state.isEnableSubmit}
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
            this._checkIsEnable();    
        }, );
    }

    _checkIsEnable = () => {
        if (this.props.temp_string !== null && this.state.password !== null && this.state.password !== '') {
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
        this.setState({
            password: null,
        })
        this.props.handleClose();
    }

    _handleConfirm = () => {
        if (this.state.password === this.props.temp_string) {     
            this.props.handleConfirm(true);
        } else {
            this.props.handleConfirm(false);
        }
        this.setState({
            password: null,
        })
    }
}

export default Container;

