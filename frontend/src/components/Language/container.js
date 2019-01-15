import React, { Component } from "react";
import PropTypes from "prop-types";
import Language from "./presenter";

class Container extends Component {
    static propTypes = {
        setLanguage: PropTypes.func.isRequired,
        onlyFlag: PropTypes.bool,
        onSelected: PropTypes.func,
    }
    render() {
        return (
            <Language 
                handleOnClickLanguage={this._handleOnClickLanguage}
                lang={this.props.lang}
                onlyFlag={this.props.onlyFlag === undefined ? false : this.props.onlyFlag}
            />
        );
    }

    _handleOnClickLanguage = (e, data) => {
        this.props.setLanguage(data.value);
        if (this.props.onSelected !== undefined) {
            this.props.onSelected();
        }
    }
}

export default Container;