import React from "react";
import { 
    Segment,
    Loader,
    Statistic,
    Dimmer,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { ROUND_TYPE } from "./../../config/constants"

const CurrentRound = (props, context) => {
    if (props.currentRound === null) {
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
                            {_renderCurrentRound(props.currentRound)}
                        </Statistic.Value>
                        <Statistic.Label>Current ICO round</Statistic.Label>
                    </Statistic>
                </div>
            </Segment>
        )
    }
}

const _renderCurrentRound = (currentRound) => {
    if (currentRound === null) {
        return "NULL";
    } else {
        switch (currentRound.round_type) {
            case ROUND_TYPE.NOT_STARTED: 
                return "Not started"
            case ROUND_TYPE.PRESALE: 
                return "PreSale"
            case ROUND_TYPE.ROUND_A: 
                return "Round-A"
            case ROUND_TYPE.ROUND_B: 
                return "Round-B"
            case ROUND_TYPE.ROUND_C: 
                return "Round-C"
            default :
                return "NULL";
        }
    }
}

CurrentRound.propTypes = {
    currentRound: PropTypes.object,
}

CurrentRound.contextTypes = {
    t: PropTypes.func.isRequired
};


export default CurrentRound;