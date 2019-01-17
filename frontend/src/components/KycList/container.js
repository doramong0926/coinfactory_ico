import React, { Component } from "react";
import PropTypes from "prop-types";
import KycList from "./presenter";
import _ from "lodash";


class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            kyc_list: null,            
            column: null,
            direction: null,
            isLoading: true,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
    }

    componentDidMount () {
        this._fetchKycList();
    }

    render() {
        return (
            <KycList 
                kyc_list={this.state.kyc_list}
                handleSort={this._handleSort}
                column={this.state.column}
                direction={this.state.direction}
                refresh={this._fetchKycList}
                isLoading={this.state.isLoading}
            />
        )
    }

    _handleSort = clickedColumn => () => {
        if (this.state.column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                kyc_list: _.sortBy(this.state.kyc_list, [clickedColumn]),
                direction: 'ascending',
            })    
            return;
        }
    
        this.setState({
            kyc_list: this.state.kyc_list.reverse(),
            direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    _fetchKycList = () => {
        this.setState({
            isLoading: true,
        })
        fetch('/users/kyc_list/', {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.setState({
                    kyc_list: json.result,
                })
            } else {
                console.log("fail to get kyc list")
            }
            this.setState({
                isLoading: false,
            })
        })
        .catch (
            err => {
                console.log(err);
                this.setState({
                    isLoading: false,
                })
            }
        )
    }
}

export default Container;