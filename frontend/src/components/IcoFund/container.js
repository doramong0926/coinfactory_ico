import React, { Component } from "react";
import PropTypes from "prop-types"
import IcoFund from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoFundAmount: null,
        }
    }

    static propTypes = {
        icoFundAmount: PropTypes.shape({
            eth_amount: PropTypes.number,
            blc_amount: PropTypes.number,            
        }),
    }

    componentDidMount () {     
        if (this.props.icoFundAmount !== null && this.props.icoFundAmount !== undefined) {
            this.setState({
                icoFundAmount: this.props.icoFundAmount,
            })            
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.icoFundAmount === null && nextProps.icoFundAmount !== null) {
            this.setState({
                icoFundAmount: nextProps.icoFundAmount,
            }) 
        }
    }    

    render() {
        return (
            <IcoFund 
                icoFundAmount={this.state.icoFundAmount}
            />
        )
    }
}

export default Container;