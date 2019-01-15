import React from 'react';
import PropTypes from 'prop-types'
import styles from "./styles.module.scss";

const CountDown = (props, context) => {
    return (
        <React.Fragment>
            <p className={props.color === "white" ? styles.HeaderText : styles.HeaderTextBlack} >
                {props.headerText}
            </p>
            <div className={styles.Countdown}>
                <span className={styles.CountdownCol}>

                    <span className={props.color === "white" ?  styles.CountdownColElement : styles.CountdownColElementBlack}>
                        <strong>{addLeadingZeros(props.days)}</strong>
                        <p className={props.color === "white" ?  styles.CountdownText : styles.CountdownTextBlack}>{props.days === 1 ? 'DAY' : 'DAYS'}</p>
                    </span>
                </span>

                <span className={styles.CountdownCol}>
                    <span className={props.color === "white" ?  styles.CountdownColElement : styles.CountdownColElementBlack}>
                        <strong>:</strong>
                    </span>
                </span>

                <span className={styles.CountdownCol}>
                    <span className={props.color === "white" ?  styles.CountdownColElement : styles.CountdownColElementBlack}>
                        <strong>{addLeadingZeros(props.hours)}</strong>
                        <span className={props.color === "white" ?  styles.CountdownText : styles.CountdownTextBlack}>HOURS</span>
                    </span>
                </span>                
                
                <span className={styles.ResposiveItems}>
                    <span className={styles.CountdownCol}>
                        <span className={props.color === "white" ?  styles.CountdownColElement : styles.CountdownColElementBlack}>
                            <strong>:</strong>
                        </span>                        
                    </span>
                    <br />
                </span>
                    

                <span className={styles.CountdownRightNumber}>
                    <span className={styles.CountdownCol}>
                        <span className={props.color === "white" ?  styles.CountdownColElement : styles.CountdownColElementBlack}>
                            <strong>{addLeadingZeros(props.min)}</strong>
                            <span className={props.color === "white" ?  styles.CountdownText : styles.CountdownTextBlack}>MINUTES</span>
                        </span>
                    </span>

                    <span className={styles.CountdownCol}>
                        <span className={props.color === "white" ?  styles.CountdownColElement : styles.CountdownColElementBlack}>
                            <strong>:</strong>
                        </span>
                    </span>

                    <span className={styles.CountdownCol}>
                        <span className={props.color === "white" ?  styles.CountdownColElement : styles.CountdownColElementBlack}>
                            <strong>{addLeadingZeros(props.sec)}</strong>
                            <span className={props.color === "white" ?  styles.CountdownText : styles.CountdownTextBlack}>SECONDS</span>
                        </span>
                    </span>
                </span>
            </div>
        </React.Fragment>
    );
}

const addLeadingZeros = (value) =>{
    value = String(value);
    while (value.length < 2) {
        value = '0' + value;
    }
    return value;
}

CountDown.propTypes = {
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    sec: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
};

CountDown.contextTypes = {
    t: PropTypes.func.isRequired
};

export default CountDown;