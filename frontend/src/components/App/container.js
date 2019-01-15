import React, { Component } from "react";
import PropTypes from "prop-types";
import App from "./presenter";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import _ from "lodash";
import "isomorphic-fetch";
import { NETWORK } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visibleAuthExpiredModal: false,
            backgroundImage: null,
        };    
    }

    static propTypes = {
        username: PropTypes.string,
        pathname: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        DeleteJwt: PropTypes.func.isRequired,
        SaveProfile: PropTypes.func.isRequired,
        Logout: PropTypes.func.isRequired,
        icoWalletList: PropTypes.object,
        SaveIcoWalletList: PropTypes.func.isRequired,
        SaveRoundList: PropTypes.func.isRequired,
        icoFundAmount: PropTypes.shape({
            eth_amount: PropTypes.number,
            blc_amount: PropTypes.number,
        }),
        whitepaper: PropTypes.array,
        currentRound: PropTypes.object,
        roundList: PropTypes.object,
        backgroundImage: PropTypes.number,
    }

    componentDidMount() {
        library.add(faStroopwafel)
        if (this.props.isLoggedIn) {
            this._getUser();
        }
        this._fetchIcoWalletList();
        this._fetchInvestmentInfo();
        this._fetchWhitepaper();
        this._fetchCurrentRound();
        this._fetchRoundList();
        this._fetchRoundSupplyList();
        this._fetchRoundBonusList();
        if (this.props.backgroundImage !== null) {
            this.setState({
                backgroundImage: this.props.backgroundImage,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoggedIn && (this.props.pathname !== nextProps.pathname)) {
            this._getUser();
        }
        if (this.props.backgroundImage !== nextProps.backgroundImage) {
            this.setState({
                backgroundImage: nextProps.backgroundImage,
            })
        }
    }

    render() {
        return (
            <App 
                {...this.props} 
                handleCloseAuthExpiredModal={this._handleCloseAuthExpiredModal}
                visibleAuthExpiredModal={this.state.visibleAuthExpiredModal}
                backgroundImage={this.state.backgroundImage}
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
        this.setState({
            visibleAuthExpiredModal: true,
        })
    }

    _handleCloseAuthExpiredModal = () => {
        this.setState({
            visibleAuthExpiredModal: false,
        })
    }

    _getUser = () => {
        fetch("/rest-auth/user/", {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`
            },
        })
        .then( response => {
            if (response.status === 401){
                this._DeleteUserInfo();
            } else if (response.status === 200) {
                return response.json();
            }
        })
        .then( json => {
            if (json.username !== this.props.username) {
                this._DeleteUserInfo();
            }
        })
        .catch (
            err => console.log(err)
        )
    }

    _fetchIcoWalletList = () => {
        fetch('/icoInfos/ico_wallet_list/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            let icoWalletList = {
                icoWallet:"",
                contractWallet:"",
                ownerWallet:"",
            }
            if (json.status === '1' && json.result.length > 0) {
                icoWalletList.icoWallet = _.find(json.result, t => {return t.wallet_type ===  "ico"}).address
                icoWalletList.contractWallet = _.find(json.result, t => { return t.wallet_type ===  "contract"}).address
                icoWalletList.ownerWallet = _.find(json.result, t => { return t.wallet_type ===  "owner"}).address
                this.props.SaveIcoWalletList(icoWalletList)
                this._getIcoFundAmount();
            } else {
                this.props.SaveIcoWalletList(null)
            }      
        })
        .catch (
            err => {
                console.log(err);
            }
        )
    }

    _fetchInvestmentInfo = () => {
        fetch('/icoInfos/investment/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            let investmentInfo = null;
            if (json.status === '1') {
                investmentInfo = json.result
            }
            this.props.SaveInvestmentInfo(investmentInfo);
        })
        .catch (
            err => {
                console.log(err);
            }
        )
    }

    _getIcoFundAmount = async () => {
        const networkType = NETWORK;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl+`http://blcscan.cafe24app.com/api/ico/fund_amount/?api_version=1.0.0&contract_addr=${this.props.icoWalletList.contractWallet}&ico_addr=${this.props.icoWalletList.icoWallet}&owner_addr=${this.props.icoWalletList.ownerWallet}&start_block=0&end_block=999999999&network_type=${networkType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            let icoFundAmount = {
                "eth_amount": 0,
                "blc_amount": 0,
            };
            if (json.status === '1') {
                icoFundAmount.eth_amount = parseFloat(json.result.eth_amount, 10);
                icoFundAmount.blc_amount = parseFloat(json.result.blc_amount, 10);
                this.props.SaveIcoFundAmount(icoFundAmount)
            }
        })
        .catch (
            err => console.log(err)
        )
    }

    _fetchWhitepaper = () => {
        fetch('/icoInfos/whitepaper_list/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.props.SaveWhitepaper(json.result)
            } else {
                console.log("fail to get whitepaper list")
                this.props.SaveWhitepaper(null)
            }
            
        })
        .catch (
            err => {
                console.log(err);
            }
        )        
    }
    
    _fetchRoundList = () => {
        let round_list = null;
        fetch('/icoInfos/round_list/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                round_list = json.result
            } else {
                console.log("fail to get round list")
            }
            this.props.SaveRoundList(round_list)
        })
        .catch (
            err => {
                console.log(err);
            }
        )        
    }

    _fetchCurrentRound = () => {
        let currentRound = {
            round_type : null,
            start : null,
            is_completed : false,
        }
        fetch('/icoInfos/current_round/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                currentRound.round_type = json.result.round_type;
                currentRound.start = json.result.start;
                currentRound.end = json.result.end;
                currentRound.is_completed = json.result.is_completed;
                currentRound.bonus_rate = json.result.bonus_rate;
            } else {
                console.log("fail to get current round")
            }
            this.props.SaveCurrentRound(currentRound)
        })
        .catch (
            err => {
                console.log(err);
            }
        )        
    }

    _fetchRoundSupplyList = () => {
        fetch('/icoInfos/round_supply_list/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.props.SaveRoundSupplyList(json.result)
            } else {
                console.log("fail to get round list")
                this.props.SaveRoundSupplyList(null)
            }
            
        })
        .catch (
            err => {
                console.log(err);
            }
        )
    }

    _fetchRoundBonusList = () => {
        fetch('/icoInfos/round_bonus_list/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.props.SaveRoundBonusList(json.result)
            } else {
                console.log("fail to get round bonus list")
                this.props.SaveRoundBonusList(null)
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
