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
import { NETWORK, NETWORK_TYPE } from "./../../config/constants"

const ModalWithTxId = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={props.size}
            dimmer={'blurring'}
            // closeIcon
            basic
            style={{textAlign:'center', color:'black', height:"300px"}}
        >
            <Segment className={styles.Segment}>
                <Modal.Header>
                    <h2 className={styles.HeaderText}>{props.title}</h2>
                </Modal.Header>
                <Modal.Content 
                    // scrolling 
                    className={styles.Contents}
                >
                    <Modal.Description>
                        {_renderModalContents(props.contents)}
                        {_renderTxId(props.txid)}
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

const _renderTxId = (txid) => {
    if (txid === null) {
        return null;
    } else {
        if (NETWORK === NETWORK_TYPE.ROPSTEN) {
            return (
                <div className={styles.TxidBox}>
                    <p>Click below txid to see more detail</p>
                    <a 
                        href={`https://ropsten.etherscan.io/tx/${txid}`} 
                        target="_blank" className={styles.TransactionHashText}
                        rel="noopener noreferrer"
                    >
                        {txid}
                    </a>
                </div>
            )
        } else {
            return (
                <div className={styles.TxidBox}>
                    <p>Click below txid to see more detail</p>
                    <a 
                        href={`https://etherscan.io/tx/${txid}`} 
                        target="_blank" className={styles.TransactionHashText}
                        rel="noopener noreferrer"
                    >
                        {txid}
                    </a>
                </div>
            )
        }
    }
}

ModalWithTxId.propTypes = {
    visible: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    txid: PropTypes.string,
}

ModalWithTxId.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ModalWithTxId;
