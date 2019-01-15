import React, { Component } from "react";
import DashBoard from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            visibleLogoutConfirmModal: false,
            icoWalletList: null,
        };    
    }

    static propTypes = {      
        icoWalletList: PropTypes.object,
    }

    componentDidMount () {
        if(this.props.icoWalletList !== undefined && this.props.icoWalletList !== null) {
            this.setState({
                icoWalletList: this.props.icoWalletList,
            })
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })
        }
    }    
    render() {
        return (
            <DashBoard 
                icoWalletList={this.state.icoWalletList} />
        )
    }    
}

export default Container;