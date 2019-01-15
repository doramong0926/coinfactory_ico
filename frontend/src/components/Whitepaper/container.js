import React, { Component } from "react";
import PropTypes from "prop-types";
import Whitepaper from "./presenter";

class Container extends Component {

    static propTypes = {
        whitepaper: PropTypes.array,
    }

    render() {
        return (
            <Whitepaper whitepaper={this.props.whitepaper} />
        )
    }
}

export default Container;