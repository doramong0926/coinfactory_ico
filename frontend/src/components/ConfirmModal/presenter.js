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
import styles from "./styles.module.scss"

const ConfirmModal = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={props.size}
            // dimmer={'blurring'}
            // closeIcon
            basic
            style={{textAlign:'center', color:'black'}}
        >
            <Segment>
                <Modal.Header>
                    <h2>{props.title}</h2>
                </Modal.Header>
                <Modal.Content scrolling style={{textAlign: 'center', margin: '20px'}}>
                <Modal.Description>
                    {_renderModalContents(props.contents)}
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={props.handleClose}>
                        <Icon name='cancel' />{context.t('취소')}
                    </Button>
                    <Button color='green' onClick={props.handleConfirm}>
                        <Icon name='checkmark' />{context.t(`${props.buttonString}`)}
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
                <div key={index} className={styles.descriptionHeader}>
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

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    buttonString: PropTypes.string.isRequired,
}

ConfirmModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ConfirmModal;
