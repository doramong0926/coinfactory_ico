import React, { Component } from "react";
import SignupSuccessModal from "./presenter";

class Container extends Component {
    render() {
        return (
            <SignupSuccessModal
                visible={this.props.visible}
                handleClose={this.props.handleClose}
                email={this.props.email}
            />
        )
    }    
}

export default Container;

