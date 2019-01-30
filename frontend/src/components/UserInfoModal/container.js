import React, { Component } from "react";
import UserInfoModal from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEnableSubmit: false,
        };    
    }

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleProcessDone: PropTypes.func.isRequired,
    }

    render() {
        return (
            <UserInfoModal
                visible={this.props.visible}
                handleClose={this._handleClose}
                handleProcessDone={this.props.handleProcessDone}
                isEnableSubmit={this.state.isEnableSubmit}
                userInfomation={this.props.userInfomation}
            />
        )
    }    

    // _handleInputChange = (event) => {
    //     const { target : { value, name } } = event;
    //     this.setState({
    //         [name]: value,
    //     })
    //     setTimeout(() => {
    //         this._checkIsEnable();    
    //     }, );
    // }

    _handleClose = () => {
        this.props.handleClose();
    }

    _handleProcessDone = () => {
        this.props.handleProcessDone();
    }
}

export default Container;

