import React from "react";
import NumberFormat from 'react-number-format';
import { 
    Segment,
    Loader,
    Statistic,
    Dimmer,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const IcoFund = (props, context) => {
    if (props.icoFundAmount === null) {
        return (
            <Segment className={styles.Statistic}>
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>
            </Segment>
        )
    } else {
        return(            
            <Segment className={styles.Statistic}>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            <NumberFormat 
                                value={props.icoFundAmount.blc_amount} 
                                displayType={'text'} 
                                thousandSeparator={true}
                            />
                        </Statistic.Value>
                        <Statistic.Label>Total distributed BLC</Statistic.Label>
                    </Statistic>
                </div>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            <NumberFormat 
                                value={props.icoFundAmount.eth_amount} 
                                displayType={'text'} 
                                thousandSeparator={true}
                            />
                        </Statistic.Value>
                        <Statistic.Label>Total invested ETH</Statistic.Label>
                    </Statistic>
                </div>
            </Segment>
        )
    }
}

IcoFund.propTypes = {
    icoFundAmount: PropTypes.shape({
        eth_amount: PropTypes.number,
        blc_amount: PropTypes.number,            
    }),
}

IcoFund.contextTypes = {
    t: PropTypes.func.isRequired
};


export default IcoFund;