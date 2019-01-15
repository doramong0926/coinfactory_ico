import React from "react";
import { 
    Segment,
    Loader,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { NETWORK, NETWORK_TYPE} from "./../../config/constants"

const Transactions = (props, context) => {
    return(
        <React.Fragment>
            <Segment basic className={styles.TransactionTitleSegment}>
                <div className={styles.TransactionDivision}>
                    <div className={styles.TransactionDateHeaderDivision}>
                        <p className={styles.TransactionDateText}>
                            Amount
                        </p>
                    </div>
                    <div className={styles.TransactionHashHeaderDivision}>
                        <p className={styles.TransactionHashText}>
                            Txid
                        </p>
                    </div>
                </div>
            </Segment>
            <Segment basic className={styles.TransactionTitleSegmentMobile}></Segment>
            {
                props.transactions === null 
                    ? (
                        <div>                            
                            <Segment basic className={styles.TransactionSegment}>
                                <div className={styles.TransactionDivision}>
                                    <div className={styles.TransactionDateHeaderDivision}>
                                        <p className={styles.TransactionDateText}>
                                        </p>
                                    </div>
                                    <div className={styles.TransactionHashHeaderDivision}>
                                        <p className={styles.TransactionHashText}>
                                        </p>
                                    </div>
                                </div>
                            </Segment>
                            <Segment basic className={styles.TransactionSegment}>
                                <div className={styles.TransactionDivision}>
                                    <div className={styles.TransactionDateHeaderDivision}>
                                        <p className={styles.TransactionDateText}>
                                        </p>
                                    </div>
                                    <div className={styles.TransactionHashHeaderDivision}>
                                        <p className={styles.TransactionHashText}>
                                        </p>                                        
                                    </div>
                                </div>
                            </Segment>      
                            <Segment basic className={styles.TransactionSegment}>
                                <Loader size="mini" active inline='centered' />      
                            </Segment>                
                            <Segment basic className={styles.TransactionSegment}>
                                <div className={styles.TransactionDivision}>
                                    <div className={styles.TransactionDateHeaderDivision}>
                                        <p className={styles.TransactionDateText}>
                                        </p>
                                    </div>
                                    <div className={styles.TransactionHashHeaderDivision}>
                                        <p className={styles.TransactionHashText}>
                                        </p>
                                    </div>
                                </div>
                            </Segment>
                            <Segment basic className={styles.TransactionSegment}>
                                <div className={styles.TransactionDivision}>
                                    <div className={styles.TransactionDateHeaderDivision}>
                                        <p className={styles.TransactionDateText}>
                                        </p>
                                    </div>
                                    <div className={styles.TransactionHashHeaderDivision}>
                                        <p className={styles.TransactionHashText}>
                                        </p>
                                    </div>
                                </div>
                            </Segment>                            
                        </div>
                    )
                    : _renderTransaction(props.transactions)
            }
        </React.Fragment>
    )
}

const _renderTransactionDate = (timestamp) => {
    return (
        <Moment unix fromNow>{timestamp}</Moment>
    )
}

const _renderTransaction = (transactions) => {
    return (
        transactions.map((t, index)=>{
            return (
                <Segment basic className={styles.TransactionSegment} key={index} >
                    <div className={styles.TransactionDivision}>
                        <div className={styles.TransactionDateDivision}>
                            <p className={styles.TransactionDateText}>
                                {_renderTransactionDate(t.time_stamp)}                                
                            </p>
                            <span className={styles.TransactionDateText}>
                                {t.receipt_status === '1' ? '[OK]' : '[ERR]'}
                            </span>      
                            <span className={styles.TransactionDateText}>
                                {t.direction === 'in' ? '[IN] ' : '[OUT] '}
                            </span>  
                            <span className={styles.TransactionDateText}>
                                <NumberFormat 
                                    value={t.value} 
                                    displayType={'text'} 
                                    thousandSeparator={true}
                                />
                            </span>      
                            <span className={styles.TransactionDateText}>
                                {t.direction === 'in' ? ' BLC' : ' ETH'}
                            </span>                            
                        </div>
                        <div className={styles.Divider}></div>
                        <div className={styles.TransactionHashDivision}>
                            {
                                NETWORK === NETWORK_TYPE.ROPSTEN ? 
                                (
                                    <a 
                                        href={`https://ropsten.etherscan.io/tx/${t.txid}`} 
                                        target="_blank" className={styles.TransactionHashText}
                                        rel="noopener noreferrer"
                                    >
                                        {t.txid}
                                    </a>
                                ) :
                                (
                                    <a 
                                        href={`https://etherscan.io/tx/${t.txid}`} 
                                        target="_blank" className={styles.TransactionHashText}
                                        rel="noopener noreferrer"
                                    >
                                        {t.txid}
                                    </a>
                                )
                            }
                        </div>
                    </div>
                </Segment>                
            )
        })            
    )
}

Transactions.propTypes = {
    profile: PropTypes.object,
    transactions: PropTypes.array,
}

Transactions.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Transactions;