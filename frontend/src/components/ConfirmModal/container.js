import React, { Component } from "react";
import ConfirmModal from "./presenter";

class Container extends Component {
    render() {
        return (
            <ConfirmModal
                visible={this.props.visible}
                size={this.props.size}
                title={this.props.title}
                contents={this.props.contents}
                handleClose={this.props.handleClose}
                handleConfirm={this.props.handleConfirm}
                buttonString={this.props.buttonString}
            />
        )
    }    
}

export default Container;

