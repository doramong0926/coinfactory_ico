import React from "react";
import PropTypes from "prop-types";
import { ProgressBar, Step } from "react-step-progress-bar";
import 'semantic-ui-css/semantic.min.css';
import "./styles.css";
import styles from "./styles.module.scss";

const RoundProgressBar = (props, context) => {
    return(
        <React.Fragment>            
            <div style={{padding:"20px 0"}}>
                {
                    props.rate <= 50 ?
                    (
                        <ProgressBar 
                            percent={props.rate}
                            filledBackground="#2185d0"
                            stepPositions={[0, props.rate, 50, 100 ]}
                        >
                            <Step>
                                {({ accomplished, index }) => ( 
                                    <div className={styles.progressDivider}></div>
                                )}
                            </Step>
                            <Step>
                                {({ accomplished, index }) => (
                                    <div style={{textAlign: "center"}}>
                                        <div className={styles.progressStep}><p>{props.ethAmount} Eth</p></div>
                                        <div className={styles.progressDivider}>
                                        </div>
                                    </div>
                                )}
                            </Step>
                            <Step>
                                {({ accomplished, index}) => (
                                    <div className={styles.progressDividerCenter}></div>
                                )}
                            </Step>
                            <Step>
                                {({ accomplished, index }) => ( 
                                    <div className={styles.progressDivider}></div>
                                )}
                            </Step>
                        </ProgressBar>
                    )
                    : (
                        <ProgressBar 
                            percent={props.rate}
                            filledBackground="#2185d0"
                            stepPositions={[0, 50, props.rate, 100 ]}
                        >
                            <Step>
                                {({ accomplished, index }) => ( 
                                    <div className={styles.progressDivider}></div>
                                )}
                            </Step>
                            <Step>
                                {({ accomplished, index}) => (
                                    <div className={styles.progressDividerCenter}></div>
                                )}
                            </Step>
                            <Step>
                                {({ accomplished, index }) => (
                                    <div>
                                        <p className={styles.progressStep}>{props.ethAmount} BLC</p>
                                        <div className={styles.progressDivider}>
                                        </div>
                                    </div>
                                )}
                            </Step>                            
                            <Step>
                                {({ accomplished, index }) => ( 
                                    <div className={styles.progressDivider}></div>
                                )}
                            </Step>
                        </ProgressBar>
                    )
                }
                
            </div>
        </React.Fragment>
    )
}

RoundProgressBar.propTypes = {
    ethAmount: PropTypes.number,
    rate: PropTypes.number,
}

RoundProgressBar.contextTypes = {
    t: PropTypes.func.isRequired
};


export default RoundProgressBar;