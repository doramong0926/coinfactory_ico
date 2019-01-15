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
import { NETWORK, NETWORK_TYPE } from "./../../config/constants"

const IcoTransactionList = (props, context) => {
    return(            
        <React.Fragment>
            <Segment className={styles.Transaction}>
                <div className={styles.SubTitleBox}>
                    <p className={styles.SubTitleText}> # Ico Transaction List</p>
                    <Button 
                        icon 
                        onClick={props.refresh}
                        className={styles.Button}
                    >
                        <Icon name='refresh' />
                    </Button>
                </div>
                {
                    (props.transaction_list === null || props.isLoading === true)
                    ? (
                        <Dimmer active inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                    ) 
                    : <TransactionList {...props} />
                }
            </Segment>
        </React.Fragment>
    )
}

const TransactionList = (props) => {
    return (
        <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={props.column === 'time_stamp' ? props.direction : null}
                        onClick={props.handleSort('time_stamp')}
                        className={styles.TableTimeStamp}
                    >
                        Timestamp
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={props.column === 'direction' ? props.direction : null}
                        onClick={props.handleSort('direction')}
                        className={styles.TableInOut}
                    >
                        In/Out
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={props.column === 'receipt_status' ? props.direction : null}
                        onClick={props.handleSort('receipt_status')}
                        className={styles.TableStatus}
                    >
                        Status
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={props.column === 'symbol' ? props.direction : null}
                        onClick={props.handleSort('symbol')}
                        className={styles.TableSymbol}
                    >
                        Symbol
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={props.column === 'value' ? props.direction : null}
                        onClick={props.handleSort('value')}
                        className={styles.TableValue}                        
                    >
                        Value
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={props.column === 'from' ? props.direction : null}
                        onClick={props.handleSort('from')}
                    >
                        From
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={props.column === 'to' ? props.direction : null}
                        onClick={props.handleSort('to')}
                    >
                        To
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={props.column === 'txid' ? props.direction : null}
                        onClick={props.handleSort('txid')}
                    >
                        TxID
                    </Table.HeaderCell>                    
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {_.map(props.transaction_list, ({ time_stamp, direction, receipt_status, symbol, value, from, to, txid }) => (
                    <Table.Row key={time_stamp/from+txid}>
                        <Table.Cell>{time_stamp}</Table.Cell>
                        <Table.Cell>{direction}</Table.Cell>
                        <Table.Cell>{receipt_status}</Table.Cell>
                        <Table.Cell>{symbol}</Table.Cell>
                        <Table.Cell>{value}</Table.Cell>
                        <Table.Cell>{from}</Table.Cell>
                        <Table.Cell>{to}</Table.Cell>
                        <Table.Cell>
                            {
                                NETWORK === NETWORK_TYPE.ROPSTEN ? 
                                (
                                    <a 
                                        href={`https://ropsten.etherscan.io/tx/${txid}`} 
                                        target="_blank" className={styles.TransactionHashText}
                                        rel="noopener noreferrer"
                                    >
                                        {txid}
                                    </a>
                                ) :
                                (
                                    <a 
                                        href={`https://etherscan.io/tx/${txid}`} 
                                        target="_blank" className={styles.TransactionHashText}
                                        rel="noopener noreferrer"
                                    >
                                        {txid}
                                    </a>
                                )
                            }
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

IcoTransactionList.propTypes = {    
    transaction_list: PropTypes.array,
    handleSort: PropTypes.func.isRequired,
    column: PropTypes.string,
    direction: PropTypes.string,
    refresh: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

IcoTransactionList.contextTypes = {
    t: PropTypes.func.isRequired
};

export default IcoTransactionList;