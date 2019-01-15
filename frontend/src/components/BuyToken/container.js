import React, { Component } from "react";
import PropTypes from "prop-types";
import BuyToken from "./presenter";
import { KYC_STATUS, BACKGROUND_IMAGE_TYPE } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            currentRound: null,
            eth_amount: "",
            blc_amount: "",            
            raferral_bonus_rate: "0",     
            icoWallet: "",
            kyc_status: this.props.kyc !== null ? this.props.kyc.kyc_status : KYC_STATUS.READY,
            ethPrice: "0",
            exchangeRate: "0",
            exchange_price: "0",
            roundBonusList: null,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        icoWalletList: PropTypes.object,
        profile: PropTypes.object,
        username: PropTypes.string,
        token: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        SaveProfile: PropTypes.func.isRequired,
        currentRound: PropTypes.object,
        roundBonusList: PropTypes.array,
        kyc: PropTypes.object,
        investmentInfo: PropTypes.object,
        SaveBackgroundImage: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.SaveBackgroundImage(BACKGROUND_IMAGE_TYPE.BUY_TOKEN)
        if (this.props.isLoggedIn && this.props.username && this.props.profile === null) {
            this._getProfile();
        }
        this.setState({
            currentRound: this.props.currentRound !== null ? this.props.currentRound : "",
            icoWallet: this.props.icoWalletList !== null ? this.props.icoWalletList.icoWallet : "0x"
        })

        if (this.props.isLoggedIn && this.props.username && this.props.kyc === null) {
            this._FetchKyc();
        }

        if (this.props.investmentInfo !== null) {
            this.setState({
                ethPrice: this.props.investmentInfo.eth_price.toString(),
                exchange_price: this.props.investmentInfo.exchange_price.toString(),
                exchangeRate: this.calculateExchangeRate(this.props.investmentInfo.eth_price, this.props.investmentInfo.exchange_price).toString(),
            })
        }

        if (this.props.roundBonusList !== null) {
            this.setState({
                roundBonusList: this.props.roundBonusList,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn === false && this.props.isLoggedIn === true) {
            this._getProfile();
        }
        if (prevProps.profile === null && this.props.profile !== null) {
            this.setState({
                raferral_bonus_rate: this.props.profile.invitation !== null
                                            ? this.props.investmentInfo.raferral_bonus_rate.toString()
                                            : "0",
            })
        }
        if (prevProps.currentRound === null && this.props.currentRound !== null) {
            this.setState({
                currentRound: this.props.currentRound,
            })
        }

        if (prevProps.icoWalletList === null && this.props.icoWalletList !== null) {
            this.setState({
                icoWallet: this.props.icoWalletList.icoWallet,
            })
        }
    }    

    componentWillReceiveProps(nextProps) {     
        if (this.props.isLoggedIn === false && nextProps.isLoggedIn === true) {
            this._FetchKyc();
        }

        if (this.props.investmentInfo === null && nextProps.investmentInfo !== null) {
            this.setState({
                ethPrice: nextProps.investmentInfo.eth_price.toString(),
                exchange_price: nextProps.investmentInfo.exchange_price.toString(),
                exchangeRate: this.calculateExchangeRate(nextProps.investmentInfo.eth_price, nextProps.investmentInfo.exchange_price).toString(),
            })
        }

        if (this.props.roundBonusList === null && nextProps.roundBonusList !== null) {
            this.setState({
                roundBonusList: nextProps.roundBonusList,
            })
        }
    }

    render() {
        return (
            <BuyToken 
                icoWalletList={this.props.icoWalletList} 
                exchange_price={this.state.exchange_price}
                blc_amount={this.state.blc_amount}
                eth_amount={this.state.eth_amount}
                handleInputChange={this._handleInputChange}
                raferral_bonus_rate={this.state.raferral_bonus_rate}
                icoWallet={this.state.icoWallet}
                kyc_status={this.state.kyc_status}
                ethPrice={this.state.ethPrice}
                exchangeRate={this.state.exchangeRate}
                roundBonusList={this.state.roundBonusList}
                currentRoundType={this.state.currentRound !== null ? this.state.currentRound.round_type : null}
            />
        )
    }

    calculateExchangeRate = (ethPrice, exchangePrice) => {
        return parseInt(ethPrice / exchangePrice);
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        console.log(event)
        this.setState({
            [name]: value,
        })
        if(name === 'eth_amount')  {
            const originAmount =  value*this.state.exchangeRate;
            const roundBonus = originAmount * this.state.currentRound.bonus_rate / 100;
            const raferralBonus = originAmount * this.state.raferral_bonus_rate / 100;
            this.setState({
                blc_amount: (originAmount+roundBonus+raferralBonus).toString(),
            })
        }
    }

    _getProfile = () => {
        fetch(`users/${this.props.username}/profile/`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`
            },
        })
        .then(response => response.json())
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

    _FetchKyc = () => {
        return new Promise((resolve, reject) => {
            fetch(`users/${this.props.username}/kyc/`, {
                method: "GET",
                headers: {
                    "Authorization": `JWT ${this.props.token}`
                },
            })
            .then(response => response.json())
            .then( json => {
                if (json.status === '1') {
                    this.props.SaveKyc(json.result);
                    this.setState({
                        kyc_status: json.result.kyc_status,
                    })
                } else {
                    this.props.SaveKyc(null);
                }
                resolve(json.status);
            })
            .catch (err => {
                    console.log(err);
                    reject(err);
            })
        })
    }
}

export default Container;