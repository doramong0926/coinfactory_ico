import React from "react";
import {
    Segment,
    Button,
    Input,
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

const RegisterWhitelist = (props, context) => {
    return(            
        <Segment className={styles.BodySegment} >
            <p className={styles.TitleText}>REGISTER WHITELIST</p>
            <Input 
                type='text' 
                placeholder='whitelist'
                value={props.whitelist !== null ? props.whitelist : ""}
                onChange={props.handleInputChange}
                name='whitelist'
                className={styles.InputBox}
            />
            <Button 
                className={styles.SubmitButton}
                disabled={!props.isEnableControl}
                onClick={props.handleOnOpenIcoControlModal}
            >
                REGISTER WHITELIST
            </Button>
            <IcoControlConfirmModal 
                visible = {props.visibleIcoControlModal}
                handleClose = {props.handleCloseIcoControlModal}
                handleConfirm = {props.handleOnRegisterWhitelist}
                size={"mini"} 
                title="REGISTER WHITELIST"
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

RegisterWhitelist.propTypes = {    
    handleOnOpenIcoControlModal: PropTypes.func.isRequired,
    handleCloseIcoControlModal: PropTypes.func.isRequired,
    handleOnRegisterWhitelist: PropTypes.func.isRequired,
    isEnableControl: PropTypes.bool.isRequired,
    visibleIcoControlModal: PropTypes.bool.isRequired,
    temp_string: PropTypes.string,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    isIcoStarted: PropTypes.bool,
    visibleSuccessModal: PropTypes.bool.isRequired,
    handleCloseSuccessModal: PropTypes.func.isRequired,
    resultTxid: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    whitelist: PropTypes.string,
}

RegisterWhitelist.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default RegisterWhitelist;