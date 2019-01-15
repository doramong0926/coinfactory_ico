import React, { Component } from "react";
import PropTypes from "prop-types";
import IcoTransactionList from "./presenter";
import _ from "lodash";
import { NETWORK } from "./../../config/constants"


class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            transaction_list: null,            
            column: null,
            direction: null,
            isLoading: true,
        }
    }

    static propTypes = {
        transaction_list: PropTypes.array,
        SaveIcoTransactions: PropTypes.func.isRequired,        
    }

    componentDidMount () {
        this._fetchIcoTransactions();
    }

    componentWillReceiveProps(nextProps) {          
        if (this.props.transaction_list !== nextProps.transaction_list) {
            this.setState({
                transaction_list: nextProps.transaction_list,
                isLoading: false,
            })
        }
    }    

    render() {
        return (
            <IcoTransactionList 
                transaction_list={this.state.transaction_list}
                handleSort={this._handleSort}
                column={this.state.column}
                direction={this.state.direction}
                refresh={this._fetchIcoTransactions}
                isLoading={this.state.isLoading}
            />
        )
    }

    _handleSort = clickedColumn => () => {
        if (this.state.column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                transaction_list: _.sortBy(this.state.transaction_list, [clickedColumn]),
                direction: 'ascending',
            })    
            return;
        }
    
        this.setState({
            transaction_list: this.state.transaction_list.reverse(),
            direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    _fetchIcoTransactions = async () => {
        this.setState({
            isLoading: true,
        })
        const networkType = NETWORK;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl+`http://blcscan.cafe24app.com/api/ico/transaction_list/?api_version=1.0.0&contract_addr=${this.props.icoWalletList.contractWallet}&ico_addr=${this.props.icoWalletList.icoWallet}&owner_addr=${this.props.icoWalletList.ownerWallet}&start_block=0&end_block=999999999&network_type=${networkType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.props.SaveIcoTransactions(json.result.transaction_list)
            }
        })
        .catch (
            err => console.log(err)
        )
    }
}

export default Container;