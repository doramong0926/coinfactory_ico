import React, { Component } from "react";
import PropTypes from "prop-types";
import Transactions from "./presenter";
import "isomorphic-fetch";
import { NETWORK } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            transactions: null,
        }
    }

    static propTypes = {
        profile: PropTypes.object,
        icoWalletList: PropTypes.object,
    }

    componentDidMount() {
        if (this.props.isLoggedIn 
            && this.props.icoWalletList !== null
            && this.props.profile !== null
            && this.state.transactions === null) {
                this._getTransactions();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.profile === null && this.props.profile !== null) {
            if (this.props.icoWalletList !== null) {
                this._getTransactions();
            }
        }

        if (prevProps.icoWalletList === null && this.props.icoWalletList !== null) {
            if (this.props.profile !== null) {
                this._getTransactions();
            }
        }
    }        

    render() {
        return (
            <Transactions 
                transactions={this.state.transactions}
            />
        )
    }

    _getTransactions = async () => {
        const networkType = NETWORK;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl+`http://blcscan.cafe24app.com/api/ico/transaction_list/?api_version=1.0.0&wallet_addr=${this.props.profile.wallet_address}&contract_addr=${this.props.icoWalletList.contractWallet}&ico_addr=${this.props.icoWalletList.icoWallet}&owner_addr=${this.props.icoWalletList.ownerWallet}&start_block=0&end_block=999999999&network_type=${networkType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.setState({
                    transactions: json.result.transaction_list,
                });
            }
        })
        .catch (
            err => console.log(err)
        )
    }
}

export default Container;