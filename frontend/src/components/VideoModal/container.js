import React, { Component } from "react";
import VideoModal from "./presenter";

class Container extends Component {
    render() {
        return (
            <VideoModal
                visible={this.props.visible}                
                handleClose={this.props.handleClose}
                size={this.props.size}
                active={this.props.active}
                channel={this.props.channel}
                videoId={this.props.videoId}  
            />
        )
    }    
}

export default Container;

