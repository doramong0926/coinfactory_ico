import React, { Component } from "react";
import News from "./presenter";

class Container extends Component {    
    render() {
        return (
            <News handleOnClick={this._handleOnClick}/>
        )
    }

    _handleOnClick = (link) => {
        window.open(link, '_blank');
    }
}

export default Container;