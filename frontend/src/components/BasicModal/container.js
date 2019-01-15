import React, { Component } from "react";
import BasicModal from "./presenter";

class Container extends Component {
    render() {
        return (
            <BasicModal
                visible={this.props.visible}
                size={this.props.size}
                title={this.props.title}
                contents={this.props.contents}
                handleClose={this.props.handleClose}
            />
        )
    }    
}

export default Container;

