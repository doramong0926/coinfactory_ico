import React from "react";
import {
    Segment,
    Button,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import IcoControlConfirmModal from "./../IcoControlConfirmModal"
import BasicModal from "./../BasicModal"
import ModalWithTxId from "./../ModalWithTxId"

const errorModalContents = [
    {
        title: null,
        text: [
            "Fail to control Ico."
        ]
    },
];

const SuccessModalContents = [
    {
        title: null,
        text: [
            "Success to control Ico."
        ]
    },
];

const ReturnTokenToOwner = (props, context) => {
    return(            
        <Segment className={styles.BodySegment} >
            <p className={styles.TitleText}>Return Token To Owner Wallet</p>
            <Button 
                className={styles.SubmitButton}
                disabled={!props.isEnableControl}
                onClick={props.handleOnOpenIcoControlModal}
            >
                REQUEST
            </Button>
            <IcoControlConfirmModal 
                visible = {props.visibleIcoControlModal}
                handleClose = {props.handleCloseIcoControlModal}
                handleConfirm = {props.handleOnReturnToken}
                size={"mini"} 
                title="Return Token To OwnerWallet"
                temp_string={props.temp_string}
            />
            <BasicModal 
                visible = {props.visibleErrorModal}
                handleClose = {props.handleCloseErrorModal}
                size={"mini"} 
                title="Error"
                contents={errorModalContents}
            />
            <ModalWithTxId 
                visible = {props.visibleSuccessModal}
                handleClose = {props.handleCloseSuccessModal}
                size={"mini"} 
                title="Success"
                contents={SuccessModalContents}
                txid={props.resultTxid}
            />
        </Segment>
    )
}

ReturnTokenToOwner.propTypes = {    
    handleOnOpenIcoControlModal: PropTypes.func.isRequired,
    handleCloseIcoControlModal: PropTypes.func.isRequired,
    handleOnReturnToken: PropTypes.func.isRequired,
    isEnableControl: PropTypes.bool.isRequired,
    visibleIcoControlModal: PropTypes.bool.isRequired,
    temp_string: PropTypes.string,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    isIcoStarted: PropTypes.bool,
    visibleSuccessModal: PropTypes.bool.isRequired,
    handleCloseSuccessModal: PropTypes.func.isRequired,
    resultTxid: PropTypes.string,
}

ReturnTokenToOwner.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default ReturnTokenToOwner;