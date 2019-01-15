import React, { Component } from "react";
import IsWhitelist from "./presenter";
import PropTypes from "prop-types";
import { IsWhitelisted } from "./../../utils/web3Control"

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            inputAddress: null,
            isEnableControl: false,
            address: null,
            IsWhitelist: null,
        };    
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,        
        pathname: PropTypes.string,
        username: PropTypes.string,
        icoWalletList: PropTypes.object,
    }

    componentDidMount () {
        if (this.props.icoWalletList !== undefined && this.props.icoWalletList !== null) {
            this.setState({
                icoWalletList: this.props.icoWalletList,
            })
        }
        this._IsEnableControl();            
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null && nextProps.icoWalletList !== undefined) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })
            this._IsEnableControl();            
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/icoinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
                this._IsEnableControl();            
            }
        }
    }

    render() {
        return (
            <IsWhitelist 
                handleInputChange={this._handleInputChange}   
                handleOnIsWhitelist={this._handleOnIsWhitelist}   
                isEnableControl={this.state.isEnableControl}
                inputAddress={this.state.inputAddress}
                address={this.state.address}
                IsWhitelist={this.state.IsWhitelist}
            />
        )
    }

    _handleInputChange = (event) => {        
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        })
        setTimeout(() => {
           this._IsEnableControl(); 
        }, );
    }

    _handleOnIsWhitelist = async () => {
        this.setState({
            address: this.state.inputAddress,
            IsWhitelist: null,
        })
        try {
            const result = await IsWhitelisted (   
                this.state.icoWalletList.icoWallet, 
                this.state.inputAddress,
            );
            if (result === true) {
                this.setState({
                    IsWhitelist: true,
                    inputAddress: null,
                })
            } else {
                this.setState({
                    IsWhitelist: false,
                    inputAddress: null,
                })
            }
            this._IsEnableControl()
        } catch(err) {   
            console.log(err)                 
            this.setState({
                address: "Fail to get isWhitelist",
                IsWhitelist: null,
                inputAddress: null,
            })
            this._IsEnableControl()
        }
    }

    _IsEnableControl = () => {
        setTimeout(() => {
            if (this.state.icoWalletList !== null && this.state.inputAddress !== null && this.state.inputAddress !== "") {
                this.setState({
                    isEnableControl: true,
                })
            } else {
                this.setState({
                    isEnableControl: false,
                })
            }
        }, );
    }
}

export default Container;