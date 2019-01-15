import React, { Component } from "react";
import PropTypes from "prop-types";
import RoundProgressBar from "./presenter";
import _ from "lodash";

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            roundSupplyList: this.props.roundSupplyList,
            ethAmount: 0,
            rate: 0,
        }
    }

    static propTypes = {
        roundSupplyList: PropTypes.array,
        roundType: PropTypes.string.isRequired,
    }

    componentDidMount() {
        if (this.state.roundSupplyList !== undefined && this.state.roundSupplyList !== null) {
            this._calculateProgressRate();            
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.roundSupplyList === undefined || prevProps.roundSupplyList === null) 
            && (this.props.roundSupplyList !== undefined && this.props.roundSupplyList !== null)) {
            this.setState({
                roundSupplyList: this.props.roundSupplyList,
            })
            
            setTimeout(() => {
                this._calculateProgressRate();
            }, );
        }
    }

    render() {
        return (
            <RoundProgressBar 
                ethAmount={this.state.ethAmount}
                rate={this.state.rate}
            />
        )
    }

    _calculateProgressRate = () => {
        let totalSupply = 0;
        if (this.state.roundSupplyList !== undefined) {
            this.state.roundSupplyList.forEach(item => {
                totalSupply = totalSupply + item.supply;
            });
        }

        const ethAmount = _.find(this.state.roundSupplyList, t => {
            return t.round_type === this.props.roundType
        }).supply;

        const rate = ethAmount / totalSupply * 100 + 50;
        
        this.setState({
            ethAmount: ethAmount,
            rate: rate,
        })
    }
}

export default Container;