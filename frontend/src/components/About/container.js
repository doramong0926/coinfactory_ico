import React, { Component } from "react";
import PropTypes from "prop-types";
import About from "./presenter";
import { ABOUT_VIDEO_CHANNEL, ABOUT_VIDEO_ID } from "./../../config/constants";

class Container extends Component {    
    constructor(props, context) {
        super(props, context)
        this.state = {
            visible: false,
        }
        this.myRef = React.createRef()   // Create a ref object 
    }

    static propTypes = {
        SaveRefWhatis: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.SaveRefWhatis(this.myRef);
    }

    render() {
        return (
            <About 
                channel={ABOUT_VIDEO_CHANNEL}
                videoId={ABOUT_VIDEO_ID}
                visible={this.state.visible} 
                size="large"
                active={true}
                handleOpen={this._handleOpen}
                handleClose={this._handleClose}
                myRef={this.myRef}
            />
        )
    }

    _handleOpen = () => {
        this.setState({
            visible: true,
        })
    }

    _handleClose = () => {
        this.setState({
            visible: false,
        })
    }
}

export default Container;