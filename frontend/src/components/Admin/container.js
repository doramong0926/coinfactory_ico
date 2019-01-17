import React, { Component } from "react";
import Admin from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            visibleLogoutConfirmModal: false,
            userType: null,
            is_superuser: false,
            is_staff: false,
            isLoggedIn: false,
        };    
    }

    componentDidMount() {        
        if (this.props.isLoggedIn === true) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn
            })
            this._fetchUserType();
        }
    }

    componentWillReceiveProps(nextPros) {
        if (this.props.isLoggedIn === null && nextPros.isLoggedIn !== null) {
            this.setState({
                isLoggedIn: nextPros.isLoggedIn
            })
        } else if (this.props.isLoggedIn !== nextPros.isLoggedIn) {
            this.setState({
                isLoggedIn: nextPros.isLoggedIn
            })            
        }

        if (this.props.isLoggedIn === false && nextPros.isLoggedIn === true) {
            this._fetchUserType();
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        SaveHomeLocation: PropTypes.func.isRequired,
        Logout: PropTypes.func.isRequired,
        DeleteJwt: PropTypes.func.isRequired,
        DeleteUsername: PropTypes.func.isRequired,
        DeleteEmail: PropTypes.func.isRequired,
        SaveKyc: PropTypes.func.isRequired,
        SaveProfile: PropTypes.func.isRequired,     
        pathname: PropTypes.string,
        username: PropTypes.string,
    }

    render() {
        return (
            <Admin 
                isLoggedIn={this.state.isLoggedIn}
                handleOnClickMenuItem={this._handleOnClickMenuItem}
                visibleLogoutConfirmModal={this.state.visibleLogoutConfirmModal}
                handleCloseLogoutModal={this._handleCloseLogoutModal}
                handleLogoutConfirm={this._handleLogoutConfirm}   
                icoWalletList={this.state.icoWalletList}        
                is_superuser={this.state.is_superuser}        
                is_staff={this.state.is_staff}     
            />
        )
    }

    _handleOnClickMenuItem = (key) => {    
        switch (key) {
            case 'dashboard':
            case 'icoinfo':
            case 'userinfo':
                this.props.SaveHomeLocation(null);                
                break;

            case 'logout':
                this.setState({
                    visibleLogoutConfirmModal: true,
                })
                this.props.SaveHomeLocation(null);                
                break;

            default : 
                this.props.SaveHomeLocation(null);                
                break;
        }
        this.setState({
            visible: false,
        })
    }

    _handleCloseLogoutModal = () => {
        this.setState({
            visibleLogoutConfirmModal: false,
        })
    }

    _handleLogoutConfirm = () => {
        this.setState({
            visibleLogoutConfirmModal: false,
        })
        this.props.DeleteJwt();
        this.props.DeleteUsername();
        this.props.DeleteEmail();
        this.props.SaveKyc(null);
        this.props.SaveProfile(null);
        this.props.Logout();
    }  

    _fetchUserType = () => {
        fetch(`/users/${this.props.username}/usertype/`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.setState({
                    userType: json.result.user_type,
                    is_superuser: json.result.is_superuser,
                    is_staff: json.result.is_staff,
                })
            } else {
                console.log("fail to get user type")
                this.setState({
                    userType: null,
                    is_superuser: false,
                    is_staff: false,
                })
            }
            
        })
        .catch (
            err => {
                console.log(err);
            }
        )
    }
}

export default Container;