import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Header,
    Button,
    Icon,
    Segment,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const BasicModal = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={props.size}
            dimmer={'blurring'}
            // closeIcon
            basic
            style={{textAlign:'center', color:'black'}}
        >
            <Segment className={styles.Segment}>
                <Modal.Header>
                    <h2>{props.title}</h2>
                </Modal.Header>
                <Modal.Content scrolling style={{textAlign: 'center', margin: '20px'}}>
                    <Modal.Description>
                        {_renderModalContents(props.contents)}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button className={styles.Button} onClick={props.handleClose}>
                        <Icon name='checkmark' />{context.t('닫기')}
                    </Button>
                </Modal.Actions>
            </Segment>
        </Modal>
    )
}

const _renderModalContents = (contents) => {
    return (        
        contents.map( (t, index) => {
            return (
                <div key={index}>
                    {t.title !== null ?  <Header>{t.title}</Header> : null}
                    <div>
                        {
                            t.text.map( (t, index) =>{
                                return ( <p key={index}>{t}</p> )
                            })
                        }
                    </div>
                </div>
            )
        })
    )
}

BasicModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
}

BasicModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default BasicModal;
