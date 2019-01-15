import React, { Component } from "react";
import Partners from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.myRef = React.createRef()   // Create a ref object 
    }

    static propTypes = {
        SaveRefPartner: PropTypes.func.isRequired,
    }    
    componentDidMount() {
        this.props.SaveRefPartner(this.myRef);
    }

    render() {
        return (
            <Partners myRef={this.myRef} />
        )
    }
}

export default Container;