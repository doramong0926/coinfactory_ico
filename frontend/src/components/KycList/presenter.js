import React from "react";
import {
    Segment,
    Table,
    Dimmer,
    Loader,
    Button,
    Icon,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import _ from "lodash";
import { KYC_STATUS } from "./../../config/constants"

const KycList = (props, context) => {
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
            </Segment>
        </React.Fragment>
    )
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
                            sorted={props.column === 'kyc_reject_reason' ? props.direction : null}
                            onClick={props.handleSort('kyc_reject_reason')}
                            className={styles.TableItem}
                        >
                            Reject reason
                        </Table.HeaderCell>                 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(props.kyc_list, ({ username, kyc_status, kyc_reject_reason, updated_at}) => (
                        kyc_status === props.filterKycStatus 
                            ? (
                                <Table.Row key={username}>
                                    <Table.Cell>{updated_at}</Table.Cell>
                                    <Table.Cell>{username}</Table.Cell>
                                    <Table.Cell>{kyc_status}</Table.Cell>
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

KycList.propTypes = {    
    kyc_list: PropTypes.array,
    handleSort: PropTypes.func.isRequired,
    column: PropTypes.string,
    direction: PropTypes.string,
    refresh: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

KycList.contextTypes = {
    t: PropTypes.func.isRequired
};

export default KycList;