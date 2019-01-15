import React from "react";
import PropTypes from "prop-types";
import { ProgressBar, Step } from "react-step-progress-bar";
import 'semantic-ui-css/semantic.min.css';
import "./styles.css";
import styles from "./styles.module.scss";

const FundingProgressBar = (props, context) => {
    return(
        <React.Fragment>            
            {/* <p style={{color:"white"}}>{context.t("Eth 전송 : ")} {props.eth_amount}</p>
            <p style={{color:"white"}}>{context.t("Blc 수신 : ")} {props.blc_amount}</p> */}
            <div style={{padding:"20px 0"}}>
                <ProgressBar 
                    percent={props.currentRate}
                    // filledBackground="linear-gradient(to right, #2185d0, #043d96)"
                    filledBackground="#2185d0"
                    stepPositions={[0, props.softcapRate, props.hardcapRate, 100]}
                    text={`${props.realCurrentRate.toFixed(2)} % (${props.eth_amount} Eth)`}
                >
                    <Step>
                        {({ accomplished, index }) => ( <div></div> )}
                    </Step>
                    <Step>
                        {({ accomplished, index}) => (
                            <div style={{textAlign: "center"}}>
                                <div className={styles.progressStep}><p style={{color:"white"}}>softcap</p></div>
                                <div className={styles.progressDivider}>
                                </div>
                                <div className={styles.progressStep} ><p style={{color:"white"}}>{props.softcap} Eth</p></div>
                            </div>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished, index }) => (
                            <div style={{textAlign: "center"}}>
                                <div className={styles.progressStep}><p style={{color:"white"}}>hardcap</p></div>
                                <div className={styles.progressDivider}>
                                </div>
                                <div className={styles.progressStep} ><p style={{color:"white"}}>{props.hardcap} Eth</p></div>
                            </div>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished, index }) => ( <div></div> )}
                    </Step>
                </ProgressBar>
            </div>
        </React.Fragment>
    )
}

FundingProgressBar.propTypes = {
    eth_amount: PropTypes.number,
    blc_amount: PropTypes.number,
    softcap: PropTypes.number,
    hardcap: PropTypes.number,
    softcapRate: PropTypes.number,
    hardcapRate: PropTypes.number,
    currentRate: PropTypes.number,
    realCurrentRate: PropTypes.number,
}

FundingProgressBar.contextTypes = {
    t: PropTypes.func.isRequired
};


export default FundingProgressBar;