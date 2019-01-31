import React, { Component } from "react";
import PropTypes from "prop-types";
import KycCount from "./presenter";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            kycCount: null,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        SaveKycCount: PropTypes.func.isRequired, 
        kycCount: PropTypes.object,
        pathname: PropTypes.string,
        Logout: PropTypes.func.isRequired,
        DeleteJwt: PropTypes.func.isRequired,
        DeleteUsername: PropTypes.func.isRequired,
        DeleteEmail: PropTypes.func.isRequired,
        SaveKyc: PropTypes.func.isRequired,
    }

    componentDidMount () {
        if (this.props.kycCount !== null) {
            this.setState({
                kycCount: this.props.kycCount,
            })
        } else {
            this._fetchKycCount();
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.kycCount === null  && nextProps.kycCount !== null) {
            this.setState({
                kycCount: nextProps.kycCount,
            })
        }
    }
    render() {
        return (
            <KycCount 
                kycCount={this.state.kycCount} 
            />
        )
    }

    _DeleteUserInfo = () => { 
        this.props.DeleteJwt();
        this.props.DeleteUsername();
        this.props.DeleteEmail();
        this.props.SaveKyc(null);
        this.props.SaveProfile(null);
        this.props.Logout();
    }

    _fetchKycCount = () => {
        fetch('/users/kyc_count/', {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
                "Content-Type": "application/json"
            },
        })
        .then( response => {
            if (response.status === 401){
                this._DeleteUserInfo();
            } else {
                return response.json();
            }
        })
        .then( json => {
            if (json.status === '1') {
                this.props.SaveKycCount(json.result)
            } else {
                console.log("fail to get kyc count")
                this.props.SaveKycCount(null)
            }
            
        })
        .catch (
            err => {
                console.log(err);
                this.props.SaveKycCount(null)
            }
        )
    }
}

export default Container;