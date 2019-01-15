import React from "react";
import { 
    Responsive, 
    Image,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const KycStep = (props, context) => {
    return (
        <React.Fragment>
            <div className={styles.RootDivision}>
                <div className={styles.KycHeaderDivision}>
                    <p className={styles.KycHederText}>{context.t("Create a KYC Register")}</p>
                    <p className={styles.KycDescriptionText}>
                        {context.t("To get your account verified, follow the steps after agreeing to our conditions.")}
                    </p> 
                </div>
                <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
                    <StepDesktop {...props}/>
                </Responsive>
                <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                    <StepMobile {...props}/>
                </Responsive>
            </div>
        </React.Fragment>
    )
}

const StepDesktop = (props, context) => {
    return (
        <div className={styles.StepDivision}>
            <div className={styles.StepCenterLine}>
                <p>---------------------</p>
                <p className={styles.MiddleLineText}>---------------------</p>
                <p>---------------------</p>
            </div>
            <div className={styles.ImageDivision}>
                <div className={styles.StepBox}>
                    <Image className={styles.StepImage} 
                        src={props.isCompleteStep1 === false ? 
                                    require('images/icons/one_circle_image.png')
                                    : require('images/icons/complete_image.png')} 
                    />    
                    <p className={styles.StepText}>Term of service</p>
                </div>
                <div className={styles.StepBox}>
                    <Image className={styles.StepImage} 
                        src={props.isCompleteStep2 === false ? 
                                    require('images/icons/two_circle_image.png')
                                    : require('images/icons/complete_image.png')} 
                    />    
                    <p className={styles.StepText}>Proof of Identit</p>
                </div>
                <div className={styles.StepBox}>
                    <Image className={styles.StepImage} 
                        src={props.isCompleteStep3 === false ? 
                                    require('images/icons/three_circle_image.png')
                                    : require('images/icons/complete_image.png')} 
                    />    
                    <p className={styles.StepText}>Selfil with the Proof</p>
                </div>
                <div className={styles.StepBox}>
                    <Image className={styles.StepImage} 
                        src={props.isCompleteStep4 === false ? 
                                    require('images/icons/four_circle_image.png')
                                    : require('images/icons/complete_image.png')} 
                    />    
                    <p className={styles.StepText}>ETH Address</p>
                </div>
            </div>
        </div>
    )
}

const StepMobile = (props, context) => {
    return (
        <div className={styles.StepDivisionMobile}>
            <div className={styles.StepBox}>
                <Image className={styles.StepImage} 
                    src={props.isCompleteStep1 === false ? 
                                require('images/icons/one_circle_image.png')
                                : require('images/icons/complete_image.png')} 
                />    
                <span className={styles.StepText}>Term of service</span>
            </div>
            <div className={styles.StepBox}>
                <Image className={styles.StepImage} 
                    src={props.isCompleteStep2 === false ? 
                                require('images/icons/two_circle_image.png')
                                : require('images/icons/complete_image.png')} 
                /> 
                <span className={styles.StepText}>Proof of Identity</span>
            </div>
            <div className={styles.StepBox}>
                <Image className={styles.StepImage} 
                    src={props.isCompleteStep3 === false ? 
                                require('images/icons/three_circle_image.png')
                                : require('images/icons/complete_image.png')} 
                /> 
                <span className={styles.StepText}>Selfil with the Proof</span>
            </div>
            <div className={styles.StepBox}>
                <Image className={styles.StepImage} 
                    src={props.isCompleteStep4 === false ? 
                                require('images/icons/four_circle_image.png')
                                : require('images/icons/complete_image.png')} 
                /> 
                <span className={styles.StepText}>ETH Address</span>
            </div>
        </div>
    )
}

KycStep.propTypes = {
    isCompleteStep1: PropTypes.bool.isRequired,
    isCompleteStep2: PropTypes.bool.isRequired,
    isCompleteStep3: PropTypes.bool.isRequired,
    isCompleteStep4: PropTypes.bool.isRequired,
}

KycStep.contextTypes = {
    t: PropTypes.func.isRequired
};

StepDesktop.contextTypes = {
    t: PropTypes.func.isRequired
}

StepMobile.contextTypes = {
    t: PropTypes.func.isRequired
}

export default KycStep;