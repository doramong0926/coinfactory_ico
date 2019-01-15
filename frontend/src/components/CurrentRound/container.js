import React, { Component } from "react";
import PropTypes from "prop-types";
import CurrentRound from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentRound: null,
        }
    }

    static propTypes = {
        currentRound: PropTypes.object,
    }

    componentDidMount () {        
        if (this.props.currentRound !== null && this.props.currentRound !== undefined) {
            this.setState({
                currentRound: this.props.currentRound,
            })
        }        
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentRound === null && nextProps.currentRound !== null) {
            this.setState({
                currentRound: nextProps.currentRound,
            })
        }
    }

    render() {
        return (
            <CurrentRound 
                currentRound={this.state.currentRound} 
            />
        )
    }
}

export default Container;