import React, { Component } from "react";
import PropTypes from "prop-types";
import InternalIcoTransactionList from "./presenter";
import _ from "lodash";
import { NETWORK } from "./../../config/constants"


class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            internal_transaction_list: null,
            column: null,
            internal_direction_nomalIcoTx: null,
            isLoading: true,
        }
    }

    static propTypes = {
        internal_transaction_list: PropTypes.array,
        SaveInternalIcoTransactions: PropTypes.func.isRequired,    
    }

    componentDidMount () {
        this._fetchInternalIcoTransactions();
    }

    componentWillReceiveProps(nextProps) {          
        if (this.props.internal_transaction_list !== nextProps.internal_transaction_list) {
            this.setState({
                internal_transaction_list: nextProps.internal_transaction_list,
                isLoading: false,
            })
        }
    }

    render() {
        return (
            <InternalIcoTransactionList 
                transaction_list={this.state.internal_transaction_list}
                handleSort={this._handleSort}
                column={this.state.column}
                direction={this.state.direction}
                refresh={this._fetchInternalIcoTransactions}
                isLoading={this.state.isLoading}
            />
        )
    }

    _handleSort = clickedColumn => () => {
        if (this.state.column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                internal_transaction_list: _.sortBy(this.state.internal_transaction_list, [clickedColumn]),
                direction: 'ascending',
            })    
            return;
        }
    
        this.setState({
            internal_transaction_list: this.state.internal_transaction_list.reverse(),
            direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    _fetchInternalIcoTransactions = async () => {
        this.setState({
            isLoading: true,
        })
        const networkType = NETWORK;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl+`http://blcscan.cafe24app.com/api/ico/transaction_list/?api_version=1.0.0&internal=1&contract_addr=${this.props.icoWalletList.contractWallet}&ico_addr=${this.props.icoWalletList.icoWallet}&owner_addr=${this.props.icoWalletList.ownerWallet}&start_block=0&end_block=999999999&network_type=${networkType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.props.SaveInternalIcoTransactions(json.result.transaction_list)
            }
        })
        .catch (
            err => console.log(err)
        )
    }
}

export default Container;