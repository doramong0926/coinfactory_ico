import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Input,
    Button,
    Icon,
    Segment,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss"

const IcoControlConfirmModal = (props, context) => {
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
            <Segment className={styles.RootSegment}>
                <Modal.Header>
                    <h2>{props.title}</h2>
                </Modal.Header>
                <Modal.Content 
                    scrolling 
                    style={{textAlign: 'center', margin: '20px'}}
                >
                <Modal.Description>
                    <Input 
                        type='password' 
                        placeholder={context.t('password')}
                        value={props.password === null ? "" : props.password}
                        onChange={props.handleInputChange}
                        name='password'
                        className={styles.InputBox}
                    />
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={props.handleClose}>
                        <Icon name='cancel' />{context.t('취소')}
                    </Button>
                    <Button 
                        color='green' 
                        onClick={props.handleConfirm}
                        disabled={!props.isEnableSubmit}
                    >
                        <Icon name='checkmark' />{context.t("확인")}
                    </Button>
                </Modal.Actions>
            </Segment>
        </Modal>
    )
}

IcoControlConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    password: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    isEnableSubmit: PropTypes.bool.isRequired,
}

IcoControlConfirmModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default IcoControlConfirmModal;
