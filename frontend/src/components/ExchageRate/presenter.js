import React from "react";
import {
    Segment,
    Button,
    Loader,
    Dimmer,
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

const ExchageRate = (props, context) => {
    return(            
        <Segment className={styles.BodySegment} >
            <p className={styles.TitleText}>Token Exchange Rate</p>
            <CurrentExchageRate exchangeRate={props.exchangeRate} />
            <div>
                <Input 
                    type='text' 
                    placeholder='Token Exchange Rate'
                    value={props.inputRate !== null ? props.inputRate : ""}
                    onChange={props.handleInputChange}
                    name='inputRate'
                    className={styles.InputBox}
                />
                <Button 
                    className={styles.SubmitButton}
                    disabled={!props.isEnableControl}
                    onClick={props.handleOnOpenControlModal}
                >
                    SUBMIT
                </Button>
            </div>                
            <IcoControlConfirmModal 
                visible = {props.visibleControlIcoModal}
                handleClose = {props.handleOnCloseControlModal}
                handleConfirm = {props.handleOnSetExchangeRate}
                size={"mini"} 
                title="Set Exchange Rate"
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

const CurrentExchageRate = (props) => {
    if (props.exchangeRate === null) {
        return (
            <Dimmer active inverted>
                <Loader inverted />
            </Dimmer>
        )
    } else {
        return (
            <p> Current exchange rate : {props.exchangeRate} </p>
        )
    }
}

ExchageRate.propTypes = {    
    handleOnOpenControlModal: PropTypes.func.isRequired,
    handleOnCloseControlModal: PropTypes.func.isRequired,
    handleOnSetExchangeRate: PropTypes.func.isRequired,
    isEnableControl: PropTypes.bool.isRequired,
    visibleControlIcoModal: PropTypes.bool.isRequired,
    temp_string: PropTypes.string,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    exchangeRate: PropTypes.string,
    visibleSuccessModal: PropTypes.bool.isRequired,
    handleCloseSuccessModal: PropTypes.func.isRequired,
    resultTxid: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    inputRate: PropTypes.string,
}

ExchageRate.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default ExchageRate;