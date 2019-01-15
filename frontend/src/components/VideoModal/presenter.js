import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Embed,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const VideoModal = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={props.size}
            dimmer={'blurring'}
            closeIcon
            basic
            style={{textAlign:'center', color:'black'}}
        >
            <Embed id={props.videoId} source={props.channel} active={props.active} />
        </Modal>
    )
}

VideoModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,    
    handleClose: PropTypes.func.isRequired,
    channel: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
}

VideoModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default VideoModal;
