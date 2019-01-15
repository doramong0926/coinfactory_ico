import React, { Component } from "react";
import PropTypes from "prop-types";
import Roadmap from "./presenter";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.myRef = React.createRef()   // Create a ref object 
    }
    static propTypes = {
        SaveRefRoadmap: PropTypes.func.isRequired,
    }    

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.SaveRefRoadmap(this.myRef);
    }

    render() {
        return (
            <Roadmap myRef={this.myRef} />
        )
    }
}

export default Container;