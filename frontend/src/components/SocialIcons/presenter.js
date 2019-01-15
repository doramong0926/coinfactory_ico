import React from "react";
import PropTypes from "prop-types";
import {
    Button,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const SocialIcons = (props, context) => {
    return (
        <span className={styles.Container}>
            {props.telegram !== undefined ? _renderIcon("telegram", props.handleOnClick) : null}
            {props.facebook !== undefined ? _renderIcon("facebook", props.handleOnClick) : null}
            {props.twitter !== undefined ? _renderIcon("twitter", props.handleOnClick) : null}
            {props.instagram !== undefined ? _renderIcon("instagram", props.handleOnClick) : null}
        </span>
    )
}

const _renderIcon = (name, handleOnClick) => {
    return (
        <Button 
            className={styles.Icon} 
            circular 
            size="tiny"                     
            icon={name}      
            onClick={handleOnClick}                 
        />
    )
}


SocialIcons.propTypes = {
    socialList: PropTypes.array.isRequired,
    telegram: PropTypes.bool,
    facebook: PropTypes.bool,
    twitter: PropTypes.bool,
    instagram: PropTypes.bool,
    handleOnClick: PropTypes.func.isRequired,
}

SocialIcons.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SocialIcons;
