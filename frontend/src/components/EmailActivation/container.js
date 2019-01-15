import React, { Component } from "react";
import PropTypes from "prop-types"
import EmailActivation from "./presenter"
import "isomorphic-fetch";
import { BACKGROUND_IMAGE_TYPE } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            activation: false,
            isRequested: false,
            verifyedEmailAddress: ''
        };    
    }

    static propTypes = {
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
        SaveBackgroundImage: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.SaveBackgroundImage(BACKGROUND_IMAGE_TYPE.VERIFICATION)
        this._requestActivation(this.props.match);
        this.props.ShowDefaultSpinner();      
    }

    render() {
        return (
            <EmailActivation  
                isLoading={this.state.isLoading}
                activation={this.state.activation}
                verifyedEmailAddress={this.state.verifyedEmailAddress}
            />
        )
    }

    _requestActivation = (match) => {        
        // /email_activation --> 17 length
        const request_path = `/accounts/confirm-email/${match.params.key}/`;
        fetch(request_path, {
            method: "GET",
        })
        .then( response => {
            if (response.status === 200){
                this.setState({
                    activation: true,
                    isLoading: false,
                    verifyedEmailAddress: match.params.email,
                })
            } else {
                this.setState({
                    activation: false,
                    isLoading: false,
                })
            }
            this.props.HideDefaultSpinner();
        })
        .catch (
            err => {
                console.log(err);
                this.props.HideDefaultSpinner();
            }
        )
    }
}

export default Container;
