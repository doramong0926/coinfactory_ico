import React, { Component } from "react";
import TokenSale from "./presenter";
import PropTypes from "prop-types";
import _ from "lodash";
import { ROUND_TYPE } from "./../../config/constants"

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoStart: "",
            icoEnd: "",
            totalSupply: "0",
            totalSupplyRatio: "0",
            minimumEth: "0",
            exchangeRate: "0",
            ethPrice: "0",
            roundList: null,
        }
        this.myRef = React.createRef()   // Create a ref object 
    }

    static propTypes = {
        roundList: PropTypes.array,
        roundSupplyList: PropTypes.array,
        investmentInfo: PropTypes.object,
        SaveRefTokenSale: PropTypes.func.isRequired,
    }    

    static contextTypes = {
        t: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.SaveRefTokenSale(this.myRef);
        if (this.props.roundList !== null) {
            this.setState({
                icoStart: new Date(
                    _.find(this.props.roundList, t => {
                        return t.round_type ===  ROUND_TYPE.PRESALE
                    }).start*1000 + (9*60*60*1000)
                ).toLocaleString(),              
                icoEnd: new Date(
                    _.find(this.props.roundList, t => {
                        return t.round_type ===  ROUND_TYPE.ROUND_C
                    }).end*1000 + (9*60*60*1000)
                ).toLocaleString(),    
                roundList: this.props.roundList,  
            })
        } 
        if (this.props.roundSupplyList !== null) {
            let totalSupply = 0;
            this.props.roundSupplyList.map(t=> {
                totalSupply += t.supply 
                return null;
            })
            this.setState({
                totalSupply: totalSupply.toString(),
            })
        }

        if (this.props.roundSupplyList !== null) {
            let totalSupply = 0;
            this.props.roundSupplyList.map(t=> {
                totalSupply += t.supply 
                return null;
            })
            this.setState({
                totalSupply: totalSupply.toString(),
            })
        }
        if (this.props.investmentInfo !== null && this.props.roundSupplyList !== null) {
            let totalSupply = 0;
            this.props.roundSupplyList.map(t=> {
                totalSupply += t.supply 
                return null;
            })
            this.setState({
                totalSupplyRatio: (totalSupply / this.props.investmentInfo.total_supply).toString(),
            })
        }
        if (this.props.investmentInfo !== null) {
            this.setState({
                minimumEth: this.props.investmentInfo.minimum_investment_eth.toString(),
                ethPrice: this.props.investmentInfo.eth_price.toString(),
                exchangeRate: this.calculateExchangeRate(this.props.investmentInfo.eth_price, this.props.investmentInfo.exchange_price).toString(),
            })
        }
    }

    componentWillReceiveProps(nextProps) {        
        if (this.props.roundList === null && nextProps.roundList !== null) {
            this.setState({
                icoStart: new Date(
                    _.find(nextProps.roundList, t => {
                        return t.round_type ===  ROUND_TYPE.PRESALE
                    }).start*1000 + (9*60*60*1000)
                ).toLocaleString(),                
                icoEnd: new Date(
                    _.find(nextProps.roundList, t => {
                        return t.round_type ===  ROUND_TYPE.ROUND_C
                    }).end*1000 + (9*60*60*1000)
                ).toLocaleString(), 
                roundList: nextProps.roundList,   
            })           
        } 

        if (this.props.roundSupplyList === null && nextProps.roundSupplyList !== null) {
            let totalSupply = 0;
            nextProps.roundSupplyList.map(t=> {
                totalSupply += t.supply 
                return null;
            })
            this.setState({
                totalSupply: totalSupply.toString(),
            })
            if (this.props.investmentInfo !== null) {
                this.setState({
                    totalSupplyRatio: (totalSupply / this.props.investmentInfo.total_supply).toString(),
                    minimumEth: this.props.investmentInfo.minimum_investment_eth.toString(),
                    ethPrice: this.props.investmentInfo.eth_price.toString(),
                    exchangeRate: this.calculateExchangeRate(this.props.investmentInfo.eth_price, this.props.investmentInfo.exchange_price).toString(),
                })
            }
        }

        if (this.props.investmentInfo === null && nextProps.investmentInfo !== null) {
            if (this.props.roundSupplyList !== null) {
                let totalSupply = 0;
                this.props.roundSupplyList.map(t=> {
                    totalSupply += t.supply 
                    return null;
                })
                this.setState({
                    totalSupply: totalSupply.toString(),
                    totalSupplyRatio: (totalSupply / nextProps.investmentInfo.total_supply).toString(),
                    minimumEth: nextProps.investmentInfo.minimum_investment_eth.toString(),
                    ethPrice: nextProps.investmentInfo.eth_price.toString(),
                    exchangeRate: this.calculateExchangeRate(nextProps.investmentInfo.eth_price, nextProps.investmentInfo.exchange_price).toString()
                })
            }
        }
    }

    calculateExchangeRate = (ethPrice, exchangePrice) => {
        return parseInt(ethPrice / exchangePrice);
    }

    render() {
        return (
            <TokenSale 
                icoStart={this.state.icoStart}
                icoEnd={this.state.icoEnd}
                totalSupply={this.state.totalSupply}
                totalSupplyRatio={this.state.totalSupplyRatio}
                minimumEth={this.state.minimumEth}
                exchangeRate={this.state.exchangeRate}
                ethPrice={this.state.ethPrice}
                roundList={this.state.roundList}
                myRef={this.myRef}
            />
        )
    }
}

export default Container;