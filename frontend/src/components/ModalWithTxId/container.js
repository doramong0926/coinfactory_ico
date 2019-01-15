import React, { Component } from "react";
import ModalWithTxId from "./presenter";

class Container extends Component {
    render() {
        return (
            <ModalWithTxId
                visible={this.props.visible}
                size={this.props.size}
                title={this.props.title}
                contents={this.props.contents}
                handleClose={this.props.handleClose}
                txid={this.props.txid}
            />
        )
    }    
}

export default Container;

