import React, { Component } from "react";
import KycStep from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {    

    static propTypes = {
        isCompleteStep1: PropTypes.bool.isRequired,
        isCompleteStep2: PropTypes.bool.isRequired,
        isCompleteStep3: PropTypes.bool.isRequired,
        isCompleteStep4: PropTypes.bool.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <KycStep 
                isCompleteStep1={this.props.isCompleteStep1}
                isCompleteStep2={this.props.isCompleteStep2}
                isCompleteStep3={this.props.isCompleteStep3}
                isCompleteStep4={this.props.isCompleteStep4}
            />
        )
    }
}

export default Container;

