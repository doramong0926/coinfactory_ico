import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";
import "isomorphic-fetch";
import { BACKGROUND_IMAGE_TYPE } from "./../../config/constants"
import { NETWORK } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            eth_amount: null,
            blc_amount: null,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        username: PropTypes.string,
        token: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        SaveProfile: PropTypes.func.isRequired,
        icoWalletList: PropTypes.object,
        SaveBackgroundImage: PropTypes.func.isRequired,
        Logout: PropTypes.func.isRequired,
        DeleteJwt: PropTypes.func.isRequired,
        DeleteUsername: PropTypes.func.isRequired,
        DeleteEmail: PropTypes.func.isRequired,
        SaveKyc: PropTypes.func.isRequired,
    }

    componentDidMount() {
        if (this.props.isLoggedIn && this.props.username && this.props.profile === null) {
            this._getProfile();
        }
        this.props.SaveBackgroundImage(BACKGROUND_IMAGE_TYPE.PROFILE)

        if (this.props.isLoggedIn 
            && this.props.icoWalletList !== null 
            && this.props.profile !== null
            && this.state.eth_amount === null && this.state.blc_amount === null) {
                this._getUserFundAmount();
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn === false && this.props.isLoggedIn === true) {
            this._getProfile();
        }

        if (prevProps.profile === null && this.props.profile !== null) {
            if (this.props.icoWalletList !== null) {
                this._getUserFundAmount();
            }
        }

        if (prevProps.icoWalletList === null && this.props.icoWalletList !== null) {
            if (this.props.profile !== null) {
                this._getUserFundAmount();
            }
        }
    }

    render() {
        return (
            <Profile 
                profile={this.props.profile}
                eth_amount={this.state.eth_amount}
                blc_amount={this.state.blc_amount}
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

    _getProfile = () => {
        fetch(`users/${this.props.username}/profile/`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`
            },
        })
        .then( response => {
            if (response.status === 401){
                this._DeleteUserInfo();
                this.props.SaveProfile(null)
            } else {
                return response.json();
            }
        })
        .then( json => {
            if (json.status === '1') {
                this.props.SaveProfile(json.result)
            } else {
                this.props.SaveProfile(null)
            }
        })
        .catch (
            err => console.log(err)
        )
    }

    _getUserFundAmount = async () => {
        const networkType = NETWORK;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl+`http://blcscan.cafe24app.com/api/ico/fund_amount/?api_version=1.0.0&wallet_addr=${this.props.profile.wallet_address}&contract_addr=${this.props.icoWalletList.contractWallet}&ico_addr=${this.props.icoWalletList.icoWallet}&owner_addr=${this.props.icoWalletList.ownerWallet}&start_block=0&end_block=999999999&network_type=${networkType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.setState({
                    eth_amount: json.result.eth_amount,
                    blc_amount: json.result.blc_amount,
                });
            }
        })
        .catch (
            err => console.log(err)
        )
    }
}

export default Container;