import React, { Component } from "react";
import PropTypes from "prop-types";
import SocialIcons from "./presenter";
import _ from "lodash";
import { SOCIAL_ADDRESS } from "./../../config/constants"

class Container extends Component {
    static propTypes = {
        telegram: PropTypes.bool,
        facebook: PropTypes.bool,
        twitter: PropTypes.bool,
        instagram: PropTypes.bool,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    socialList = [
        {
            key: "facebook",
            name: "facebook",
            link: SOCIAL_ADDRESS.FACEBOOK,
        },
        {
            key: "twitter",
            name: "twitter",
            link: SOCIAL_ADDRESS.TWITTER,
        },
        {
            key: "instagram",
            name: "instagram",
            link: SOCIAL_ADDRESS.INSTAGRAM,
        },
        {
            key: "telegram",
            name: "telegram",
            link: SOCIAL_ADDRESS.TELEGRAM,
        }, 
    ]
    _handleOnClick = (e, data) => {        
        const url = _.find(this.socialList, t => { 
            return t.name ===  data.icon
        }).link;
        window.open(url, '_blank');
    }

    render() {
        return (
            <SocialIcons 
                socialList={this.socialList}
                telegram={this.props.telegram}
                instagram={this.props.instagram}
                twitter={this.props.twitter}
                facebook={this.props.facebook}
                handleOnClick={this._handleOnClick}
            />
        );
    }
}

export default Container;