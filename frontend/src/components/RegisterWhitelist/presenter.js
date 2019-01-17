import React from "react";
import {
    Segment,
    Button,
    Input,
    Divider,
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
            <div>
                <Input 
                    fluid
                    type='text' 
                    placeholder='whitelist'
                    value={props.whitelist !== null ? props.whitelist : ""}
                    onChange={props.handleInputChange}
                    name='whitelist'
                    className={styles.InputBox}
                />
            </div>
            <Button 
                className={styles.SubmitButton}
                disabled={!props.isEnableRegisterWhitelist}
                onClick={props.handleOnOpenRegisterWhitelistModal}
            >
                REGISTER WHITELIST
            </Button>
            <Divider inverted section />
            <p className={styles.TitleText}>UNREGISTER WHITELIST</p>
            <div>
                <Input 
                    fluid
                    type='text' 
                    placeholder='whitelistForRemove'
                    value={props.whitelistForRemove !== null ? props.whitelistForRemove : ""}
                    onChange={props.handleInputChange}
                    name='whitelistForRemove'
                    className={styles.InputBox}
                />
            </div>
            <Button 
                className={styles.SubmitButton}
                disabled={!props.isEnableRemoveWhitelist}
                onClick={props.handleOnOpenRemoveWhitelistModal}
            >
                UNREGISTER WHITELIST
            </Button>
            <IcoControlConfirmModal 
                visible = {props.visibleRegisterWhitelist}
                handleClose = {props.handleOnCloseRegisterWhitelistModal}
                handleConfirm = {props.handleOnRegisterWhitelist}
                size={"mini"} 
                title="REGISTER WHITELIST"
                temp_string={props.temp_string}
            />
            <IcoControlConfirmModal 
                visible = {props.visibleRemoveWhitelist}
                handleClose = {props.handleOnCloseRemoveWhitelistModal}
                handleConfirm = {props.handleOnRemoveWhitelist}
                size={"mini"} 
                title="REMOVE WHITELIST"
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
    handleOnOpenRegisterWhitelistModal: PropTypes.func.isRequired,
    handleOnCloseRegisterWhitelistModal: PropTypes.func.isRequired,
    handleOnOpenRemoveWhitelistModal: PropTypes.func.isRequired,
    handleOnCloseRemoveWhitelistModal: PropTypes.func.isRequired,
    handleOnRegisterWhitelist: PropTypes.func.isRequired,
    handleOnRemoveWhitelist: PropTypes.func.isRequired,
    isEnableRegisterWhitelist: PropTypes.bool.isRequired,
    isEnableRemoveWhitelist: PropTypes.bool.isRequired,
    visibleRegisterWhitelist: PropTypes.bool.isRequired,
    visibleRemoveWhitelist: PropTypes.bool.isRequired,
    temp_string: PropTypes.string,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    visibleSuccessModal: PropTypes.bool.isRequired,
    handleCloseSuccessModal: PropTypes.func.isRequired,
    resultTxid: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    whitelist: PropTypes.string,
    whitelistForRemove: PropTypes.string,
}

RegisterWhitelist.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default RegisterWhitelist;