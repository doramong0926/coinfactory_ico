import React from "react";
import {
    Segment,
    Table,
    Dimmer,
    Loader,
    Button,
    Icon,
    Divider,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import _ from "lodash";
import { KYC_STATUS } from "./../../config/constants"
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

const KycListWithWhitelist = (props, context) => {
    return(            
        <React.Fragment>
            <Segment className={styles.RootSegment}>
                <div className={styles.SubTitleBox}>
                    <p className={styles.SubTitleText}>KYC Status </p>
                    <Button 
                        icon 
                        onClick={props.refresh}
                        className={styles.Button}
                    >
                        <Icon name='refresh' />
                    </Button>
                </div>
                {
                    (props.isLoading === true)
                    ? (
                        <Dimmer active inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                    ) 
                    : (
                        <React.Fragment>
                            <KycTable 
                                filterKycStatus={KYC_STATUS.APPROVING}
                                {...props} 
                            />
                            <KycTable 
                                filterKycStatus={KYC_STATUS.APPROVED}
                                {...props} 
                            />
                            <KycTable 
                                filterKycStatus={KYC_STATUS.PENDING}
                                {...props} 
                            />
                        </React.Fragment>
                    )
                }
                <Divider inverted section />
                {_renderWhiteList(props.whitelist)}
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
        </React.Fragment>
    )
}

const _renderWhiteList = (whitelist) => {
    if (whitelist === null) {
        return null;
    } else {
        const new_whitelist = whitelist.split(",")
        return (
            <div>
                <p>Num of WhiteList : {new_whitelist.length}</p>
                {new_whitelist.map((t, index) => {
                    return (
                        <p key={index} className={styles.WhitelistText}>{t}</p>
                    )
                })}
            </div>
        )
    }
}

const KycTable = (props) => {
    return (
        <React.Fragment>
            <p className={styles.KycStatusText}>
                {props.filterKycStatus}
            </p>
            <Table sortable celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={props.column === 'updated_at' ? props.direction : null}
                            onClick={props.handleSort('updated_at')}
                            className={styles.TableTimeStamp}
                        >
                            Timestamp
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={props.column === 'username' ? props.direction : null}
                            onClick={props.handleSort('username')}
                            className={styles.TableItem}
                        >
                            Username
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={props.column === 'kyc_status' ? props.direction : null}
                            onClick={props.handleSort('kyc_status')}
                            className={styles.TableItem}
                        >
                            KYC Status
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={props.column === 'is_whitelisted' ? props.direction : null}
                            onClick={props.handleSort('is_whitelisted')}
                            className={styles.TableItem}
                        >
                            Is Whitelist
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={props.column === 'kyc_reject_reason' ? props.direction : null}
                            onClick={props.handleSort('kyc_reject_reason')}
                            className={styles.TableItem}
                        >
                            Reject reason
                        </Table.HeaderCell>                 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(props.kyc_list, ({ username, kyc_status, kyc_reject_reason, updated_at, is_whitelisted}) => (
                        kyc_status === props.filterKycStatus 
                            ? (
                                <Table.Row key={username}>
                                    <Table.Cell>{updated_at}</Table.Cell>
                                    <Table.Cell>{username}</Table.Cell>                                    
                                    <Table.Cell>{kyc_status}</Table.Cell>
                                    <Table.Cell>{is_whitelisted.toString()}</Table.Cell>
                                    <Table.Cell>{kyc_reject_reason}</Table.Cell>
                                </Table.Row>
                            ) : (
                                null
                            )
                    ))}
                </Table.Body>
            </Table>                
        </React.Fragment>
    )
}

KycListWithWhitelist.propTypes = {    
    kyc_list: PropTypes.array,
    handleSort: PropTypes.func.isRequired,
    column: PropTypes.string,
    direction: PropTypes.string,
    refresh: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleOnOpenIcoControlModal: PropTypes.func.isRequired,
    handleCloseIcoControlModal: PropTypes.func.isRequired,
    handleOnRegisterWhitelist: PropTypes.func.isRequired,
    isEnableControl: PropTypes.bool.isRequired,
    visibleIcoControlModal: PropTypes.bool.isRequired,
    temp_string: PropTypes.string,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    visibleSuccessModal: PropTypes.bool.isRequired,
    handleCloseSuccessModal: PropTypes.func.isRequired,
    resultTxid: PropTypes.string,
    whitelist: PropTypes.string,
}

KycListWithWhitelist.contextTypes = {
    t: PropTypes.func.isRequired
};

export default KycListWithWhitelist;