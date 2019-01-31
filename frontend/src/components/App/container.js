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
            isLoading: false,
        };    
    }

    static propTypes = {
        username: PropTypes.string,
        pathname: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        SaveProfile: PropTypes.func.isRequired,
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
        Logout: PropTypes.func.isRequired,
        DeleteJwt: PropTypes.func.isRequired,
        DeleteUsername: PropTypes.func.isRequired,
        DeleteEmail: PropTypes.func.isRequired,
        SaveKyc: PropTypes.func.isRequired,
    }

    componentDidMount() {
        library.add(faStroopwafel)
        if (this.props.isLoggedIn) {
            this._getUser();
        }
        this._fetchInitialData();
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
                isLoading={this.state.isLoading}
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

    _fetchInitialData = () => {
        fetch('/icoInfos/initialdata/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then( json => {        
            if (json.status === '1') {
                // _fetchIcoWalletList
                let icoWalletList = {
                    icoWallet:"",
                    contractWallet:"",
                    ownerWallet:"",
                }
                
                if (json.result.ico_wallet_list !== null && json.result.ico_wallet_list !== undefined) {
                    icoWalletList.icoWallet = _.find(json.result.ico_wallet_list, t => {return t.wallet_type ===  "ico"}).address
                    icoWalletList.contractWallet = _.find(json.result.ico_wallet_list, t => { return t.wallet_type ===  "contract"}).address
                    icoWalletList.ownerWallet = _.find(json.result.ico_wallet_list, t => { return t.wallet_type ===  "owner"}).address
                    this.props.SaveIcoWalletList(icoWalletList)
                    this._getIcoFundAmount();
                } else {
                    this.props.SaveIcoWalletList(null)
                }

                //_fetchInvestmentInfo
                if (json.result.investment !== null && json.result.investment !== undefined) {
                    this.props.SaveInvestmentInfo(json.result.investment);
                }

                //_fetchWhitepaper
                if (json.result.whitepaper_list !== null && json.result.whitepaper_list !== undefined) {
                    this.props.SaveWhitepaper(json.result.whitepaper_list)
                } else {
                    console.log("fail to get whitepaper list")
                    this.props.SaveWhitepaper(null)
                }

                //_fetchCurrentRound      
                let currentRound = {
                    round_type : null,
                    start : null,
                    end: null,
                    is_completed : false,
                    bonus_rate: 0,
                }
                if (json.result.current_round !== null && json.result.current_round !== undefined) {
                    currentRound.round_type = json.result.current_round.round_type;
                    currentRound.start = json.result.current_round.start;
                    currentRound.end = json.result.current_round.end;
                    currentRound.is_completed = json.result.current_round.is_completed;
                    currentRound.bonus_rate = json.result.current_round.bonus_rate;
                } else {
                    console.log("fail to get current round")
                }
                this.props.SaveCurrentRound(currentRound)

                //_fetchRoundList
                let round_list = null;
                if (json.result.round_list !== null && json.result.round_list !== undefined) {
                    round_list = json.result.round_list
                } else {
                    console.log("fail to get round list")
                }
                this.props.SaveRoundList(round_list)

                //_fetchRoundSupplyList
                let round_supply_list = null;
                if (json.result.round_supply_list !== null && json.result.round_supply_list !== undefined) {
                    round_supply_list = json.result.round_supply_list
                } else {
                    console.log("fail to get round list")
                }
                this.props.SaveRoundSupplyList(round_supply_list)

                //_fetchRoundBonusList
                let round_bonus_list = null;
                if (json.result.round_bonus_list !== null && json.result.round_bonus_list !== undefined) {
                    round_bonus_list = json.result.round_bonus_list;
                } else {
                    console.log("fail to get round bonus list")
                }
                this.props.SaveRoundBonusList(round_bonus_list)          
                this.setState({
                    isLoading: true,
                })     
            } else {
                console.log("fail to get initialdata")
            }      
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
}

export default Container;
