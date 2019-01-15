import React, { Component } from "react";
import PropTypes from "prop-types";
import FundingProgressBar from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            eth_amount: 0,
            blc_amount: 0,
            softcap: 0,
            hardcap: 0,
            softcapRate: 0,
            hardcapRate: 100,
            currentRate: 0,            
            realCurrentRate: 0,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        investmentInfo: PropTypes.shape({
            exchange_price: PropTypes.number,
            minimum_investment_eth: PropTypes.number,
            raferral_bonus_rate: PropTypes.number,
            softcap: PropTypes.number,
            hardcap: PropTypes.number,
        }),
        icoFundAmount: PropTypes.shape({
            eth_amount: PropTypes.number,
            blc_amount: PropTypes.number,
        })
    }

    componentDidMount() {
        if (this.props.icoFundAmount !== null) {
            this.setState({
                eth_amount: this.props.icoFundAmount.eth_amount,
                blc_amount: this.props.icoFundAmount.blc_amount,
            })
        }        
        if (this.props.investmentInfo !== null) {
            this.setState({
                softcap: this.props.investmentInfo.softcap,
                hardcap: this.props.investmentInfo.hardcap,
            })
        }        
        setTimeout(() => {
            this._calculateProgressRate()
        }, );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.icoFundAmount === null && nextProps.icoFundAmount !== null) {
            this.setState({
                eth_amount: nextProps.icoFundAmount.eth_amount,
                blc_amount: nextProps.icoFundAmount.blc_amount,
            })
            setTimeout(() => {
                this._calculateProgressRate()
            }, );
        }
        if (this.props.investmentInfo === null && nextProps.investmentInfo !== null) {
            this.setState({
                softcap: nextProps.investmentInfo.softcap,
                hardcap: nextProps.investmentInfo.hardcap,
                currentRate: (this.state.eth_amount  / (nextProps.investmentInfo.hardcap +nextProps.investmentInfo.hardcap*0.05)) * 100,
                softcapRate: (nextProps.investmentInfo.softcap / (nextProps.investmentInfo.hardcap + nextProps.investmentInfo.hardcap*0.05)) * 100,
                hardcapRate: (nextProps.investmentInfo.hardcap / (nextProps.investmentInfo.hardcap + nextProps.investmentInfo.hardcap*0.05)) * 100,
            })
            setTimeout(() => {
                this._calculateProgressRate()
            }, );
        }
    }    

    render() {
        return (
            <FundingProgressBar 
                eth_amount={this.state.eth_amount}
                blc_amount={this.state.blc_amount}
                softcap={this.state.softcap}
                hardcap={this.state.hardcap}
                softcapRate={this.state.softcapRate}
                hardcapRate={this.state.hardcapRate}
                currentRate={this.state.currentRate}
                realCurrentRate={this.state.realCurrentRate}
            />
        )
    }

    _calculateProgressRate = () => {
        this.setState({
            realCurrentRate: ((this.state.eth_amount === null ? 0 : this.state.eth_amount)  / (this.state.hardcap)) * 100,
            currentRate: ((this.state.eth_amount === null ? 0 : this.state.eth_amount)  / (this.state.hardcap + this.state.hardcap*0.05)) * 100 * 7000,
            softcapRate: (this.state.softcap / (this.state.hardcap + this.state.hardcap*0.05)) * 100,
            hardcapRate: (this.state.hardcap / (this.state.hardcap + this.state.hardcap*0.05)) * 100,
        })
    }
}

export default Container;