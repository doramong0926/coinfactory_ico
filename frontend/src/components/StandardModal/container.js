import React, { Component } from "react";
import StandardModal from "./presenter";

class Container extends Component {
    render() {
        return (
            <StandardModal
                visible={this.props.visible}
                handleClose={this.props.handleClose}
                size={this.props.size}
                title={this.props.title}
                contents={this.props.contents}
            />
        )
    }    
}

export default Container;

