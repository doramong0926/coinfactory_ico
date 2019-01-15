import React, { Component } from "react";
import PropTypes from "prop-types"
import PageHeader from "./presenter";

class Container extends Component {    
    static porpTypes = {
        backgroundImage: PropTypes.bool,
        backgroundTitle: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        lineNum: PropTypes.number,
    }

    render() {
        return (
            <PageHeader 
                    backgroundImage={this.props.backgroundImage}
                    backgroundTitle={this.props.backgroundTitle}
                    title={this.props.title}
                    description={this.props.description}
                    lineNum={this.props.lineNum !== undefined ? this.props.lineNum : 1}
            />
        )
    }
}

export default Container;