import React, { Component } from "react";
import Wallet from "./presenter";
import { WALLET_ADDRESS } from "./../../config/constants"

class Container extends Component {    
    render() {
        return (
            <Wallet 
                handleOnClickAndroid={this._handleOnClickAndroid}
                handleOnClickIOS={this._handleOnClickIOS}
            />
        )
    }

    _handleOnClickAndroid = () => {      
        window.open(WALLET_ADDRESS.ANDROID, '_blank');
    }
    _handleOnClickIOS = () => {      
        window.open(WALLET_ADDRESS.ANDROID, '_blank');
    }
}

export default Container;