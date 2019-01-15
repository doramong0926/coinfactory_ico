import React, { Component } from "react";
import Faqs from "./presenter";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedMenuItem: 'GENERAL',
            activeIndex: 0,
        };    
    }

    render() {
        return (
            <Faqs  
                selectedMenuItem={this.state.selectedMenuItem} 
                activeIndex={this.state.activeIndex} 
                handleClick={this._handleClick}
                handleMenuItemClick={this._handleMenuItemClick}
            />
        )
    }

    _handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ 
            activeIndex: newIndex 
        })
    }

    _handleMenuItemClick = (e, { name }) => {
        this.setState({ 
            selectedMenuItem: name 
        })
    }
}

export default Container;