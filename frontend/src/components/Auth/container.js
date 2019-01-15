import React, { Component } from "react";
import Auth from "./presenter";
import { AUTH_MODE } from "./../../config/constants"

class Container extends Component {
    state = {
        mode: AUTH_MODE.LOGIN
    };    

    render() {
        const { mode } = this.state;
        return (
            <div>
                <Auth  mode={mode}  changeMode={this._changeMode} />
            </div>
        )
    }

    _changeMode = () => {
        this.setState(prevMode => {
            const { mode } = prevMode;
            if (mode === AUTH_MODE.LOGIN) {
                return {
                    mode: AUTH_MODE.SIGNUP
                }
            } else if (mode === AUTH_MODE.SIGNUP) {
                return {
                    mode: AUTH_MODE.LOGIN
                }
            }
        })
    }
}

export default Container;