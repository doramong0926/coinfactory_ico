import React, { Component } from "react";
import PropTypes from "prop-types";
import HomeHeading from "./presenter";
import { SOCIAL_ADDRESS } from "./../../config/constants"

class Container extends Component {

    static propTypes = {
        mobile: PropTypes.bool.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    }
    _handleOnClickTelegram = (e, data) => {       
        window.open(SOCIAL_ADDRESS.TELEGRAM, '_blank');
    }

    render() {
        return (
            <HomeHeading 
                mobile={this.props.mobile} 
                isLoggedIn={this.props.isLoggedIn} 
                handleOnClickTelegram={this._handleOnClickTelegram}
            />
        )
    }
}

export default Container;