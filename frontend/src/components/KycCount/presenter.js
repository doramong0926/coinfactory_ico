import React from "react";
import {
    Segment,
    Statistic,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const KycCount = (props, context) => {
    return(            
        <React.Fragment>
            <Segment className={styles.StatisticTop}>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            {props.kycCount === null ? 0 : props.kycCount.user}
                        </Statistic.Value>
                        <Statistic.Label>Num of User</Statistic.Label>
                    </Statistic>
                </div>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            {props.kycCount === null ? 0 : props.kycCount.approving}
                        </Statistic.Value>
                        <Statistic.Label>Num of Approving KYC</Statistic.Label>
                    </Statistic>
                </div>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            {props.kycCount === null ? 0 : props.kycCount.approved}
                        </Statistic.Value>
                        <Statistic.Label>Num of Approved KYC</Statistic.Label>
                    </Statistic>
                </div>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            {props.kycCount === null ? 0 : props.kycCount.pending}
                        </Statistic.Value>
                        <Statistic.Label>Num of Pending KYC</Statistic.Label>
                    </Statistic>
                </div>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            {props.kycCount === null ? 0 : props.kycCount.completed}
                        </Statistic.Value>
                        <Statistic.Label>Num of Completed KYC</Statistic.Label>
                    </Statistic>
                </div>
                <div className={styles.StatisticDivision}>
                    <Statistic>
                        <Statistic.Value>
                            {props.kycCount === null ? 0 : props.kycCount.rejected}
                        </Statistic.Value>
                        <Statistic.Label>Num of Rejected KYC</Statistic.Label>
                    </Statistic>
                </div>
            </Segment>
        </React.Fragment>
    )
}

KycCount.propTypes = {    
    kycCount: PropTypes.object,
}

KycCount.contextTypes = {
    t: PropTypes.func.isRequired
};

export default KycCount;