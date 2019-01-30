import React, { Component } from "react";
import PropTypes from "prop-types";
import UserList from "./presenter";
import _ from "lodash";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            user_list: null,            
            column: null,
            direction: null,
            isLoading: true,
            icoWalletList: null,   
            visibleErrorModal: false,
            visibleSuccessModal: false,
            filterString: null,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        icoWalletList: PropTypes.object.isRequired,
        pathname: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
    }

    componentDidMount () {
        if (this.props.icoWalletList !== undefined && this.props.icoWalletList !== null) {
            this.setState({
                icoWalletList: this.props.icoWalletList,
            })
            setTimeout(() => {
                this._fetchUserList(); 
            }, );
        }    
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null && nextProps.icoWalletList !== undefined) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })   
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/userinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
            }
        }
    }

    render() {
        return (
            <UserList 
                user_list={this.state.user_list}
                handleSort={this._handleSort}
                column={this.state.column}
                direction={this.state.direction}
                refresh={this._fetchUserList}
                isLoading={this.state.isLoading}
                filterString={this.state.filterString}
                handleOnClickUser={this._handleOnClickUser}
                handleInputChange={this._handleInputChange}
            />
        )
    }

    _handleInputChange = (event) => {        
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        })
    }

    _handleOnClickUser = (username) => {
        console.log(username)
    }

    _handleSort = clickedColumn => () => {
        if (this.state.column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                user_list: _.sortBy(this.state.user_list, [clickedColumn]),
                direction: 'ascending',
            })    
            return;
        }
    
        this.setState({
            user_list: this.state.user_list.reverse(),
            direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    _fetchUserList = () => {
        this.setState({
            isLoading: true,
        })
        fetch('/users/user_list/', {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.setState({
                    user_list: json.result,
                })
            } else {
                console.log("fail to get user list")
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