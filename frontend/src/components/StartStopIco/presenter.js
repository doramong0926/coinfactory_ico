import React from "react";
import {
    Segment,
    Button,
    Loader,
    Dimmer,
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

const StartStopIco = (props, context) => {
    return(            
        <Segment className={styles.BodySegment} >
            <p className={styles.TitleText}>Start / Stop ICO</p>
            <CurrentIcoStartStatus isIcoStarted={props.isIcoStarted} />
            <Button 
                className={styles.SubmitButton}
                disabled={!props.isEnableControl}
                onClick={props.handleOnOpenStartIcoModal}
            >
                Start ICO
            </Button>
            <Button 
                className={styles.SubmitButton}
                disabled={!props.isEnableControl}
                onClick={props.handleOnOpenStopIcoModal}
            >
                Stop ICO
            </Button>
            <IcoControlConfirmModal 
                visible = {props.visibleStartIcoModal}
                handleClose = {props.handleCloseStartIcoModal}
                handleConfirm = {props.handleOnStartIco}
                size={"mini"} 
                title="Start ICO"
                temp_string={props.temp_string}
            />
            <IcoControlConfirmModal 
                visible = {props.visibleStopIcoModal}
                handleClose = {props.handleCloseStopIcoModal}
                handleConfirm = {props.handleOnStopIco}
                size={"mini"} 
                title="Stop ICO"
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

const CurrentIcoStartStatus = (props) => {
    if (props.isIcoStarted === null) {
        return (
            <Dimmer active inverted>
                <Loader inverted content='Loading' />
            </Dimmer>
        )
    } else if (props.isIcoStarted === true) {
        return (
            <p> Current Ico status : Start</p>
        )
    } else if (props.isIcoStarted === false) {
        return (
            <p> Current Ico status : Stop</p>
        )
    }
}

StartStopIco.propTypes = {    
    handleOnOpenStartIcoModal: PropTypes.func.isRequired,
    handleOnOpenStopIcoModal: PropTypes.func.isRequired,
    handleCloseStartIcoModal: PropTypes.func.isRequired,
    handleCloseStopIcoModal: PropTypes.func.isRequired,
    handleOnStartIco: PropTypes.func.isRequired,
    handleOnStopIco: PropTypes.func.isRequired,
    isEnableControl: PropTypes.bool.isRequired,
    visibleStartIcoModal: PropTypes.bool.isRequired,
    visibleStopIcoModal: PropTypes.bool.isRequired,
    temp_string: PropTypes.string,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    isIcoStarted: PropTypes.bool,
    visibleSuccessModal: PropTypes.bool.isRequired,
    handleCloseSuccessModal: PropTypes.func.isRequired,
    resultTxid: PropTypes.string,
}

StartStopIco.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default StartStopIco;