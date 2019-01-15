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

    _fetchKycCount = () => {
        fetch('/users/kyc_count/', {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
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
            }
        )
    }
}

export default Container;