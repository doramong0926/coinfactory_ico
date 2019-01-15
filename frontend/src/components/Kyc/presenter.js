import React from "react";
import { Header, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import KycRegister from "./../KycRegister";
import styles from "./styles.module.scss";
import { KYC_STATUS, KYC_REJECT_REASON } from "../../config/constants";

const Kyc = (props, context) => {
    if (props.isLoading) {
        return (
            null
        )
    } else if (props.kyc) {
        return (
            <div className={styles.RootDivision}>
                <KycStatus {...props} />                
                <KycRegister FetchKyc={props.FetchKyc} />          
            </div>
        )
    } else {
        return <Header as='h1'>Kyc screen</Header>
    }
}

const KycStatus = (props, context) => {
    if (props.kyc.kyc_status === KYC_STATUS.READY || props.kyc.kyc_status === KYC_STATUS.APPROVING 
        || props.kyc.kyc_status === KYC_STATUS.PENDING) {
        return (
            <React.Fragment>
                <p className={styles.KycHederText}>{context.t("Your KYC Status")}</p>
                <div className={styles.KycStatusDivision}>
                    <img className={styles.KycStatusImage} src={require('images/icons/verification_image.png')} alt={"verification_image"} />
                    <span className={styles.KycStatusVerificationHeaderText}>{context.t("VERIFICATION")}</span>                
                </div>
                <div className={styles.KycStatusDivision}>
                    <p className={styles.KycStatusVerificationDescriptionText}>
                        {context.t("Your documents are still under review. The status of your account will change automatically once the review is completed.")}
                    </p> 
                </div>  
            </React.Fragment>           
        )
    } else if (props.kyc.kyc_status === KYC_STATUS.APPROVED) {
        return (
            <React.Fragment>
                <p className={styles.KycHederText}>{context.t("Your KYC Status")}</p>
                <div className={styles.KycStatusDivision}>
                    <img className={styles.KycStatusImage} src={require('images/icons/complete_image.png')} alt={"complete_image"}  />
                    <span className={styles.KycStatusCompletedHeaderText}>{context.t("COMPLETED")}</span>                
                </div>
                <div className={styles.KycStatusDivision}>
                    <p className={styles.KycStatusCompletedDescriptionText}>
                        {context.t("All your KYC progress is completed.")}
                    </p> 
                </div>  
                <div className={styles.KycStatusDivision}>
                    <Button 
                        size='big' color='blue' 
                        className={styles.BuyButton}
                        as={Link}
                        to={"/buytoken"}
                    >
                        BUY BLC TOKEN NOW
                    </Button>
                </div>  
            </React.Fragment>           
        )
    }  else if (props.kyc.kyc_status === KYC_STATUS.REJECTED) {
        return (
            <React.Fragment>
                <p className={styles.KycHederText}>{context.t("Your KYC Status")}</p>
                <div className={styles.KycStatusDivision}>
                    <img className={styles.KycStatusImage} src={require('images/icons/error_image.png')} alt={"error_image"}   />
                    <span className={styles.KycStatusRejectedHeaderText}>{context.t("ERROR")}</span>                
                </div>
                <div className={styles.KycStatusDivision}>
                    <p className={styles.KycStatusRejectedDescriptionText}>
                        {context.t("An authentication error occurred, please register kyc again.")}
                    </p> 
                </div>  
                <div className={styles.KycStatusRejectedDivision}>
                    <div>
                        <RejectedReason {...props} />                        
                    </div>
                    <div>
                        <p className={styles.KycStatusRejectedCauseText}>
                            {context.t("Please upload it again.")}
                        </p> 
                    </div>
                </div>  
            </React.Fragment>           
        )

    } else {
        return null;
    }
}

const RejectedReason = (props, context) => {
    if (props.kyc.kyc_reject_reason === KYC_REJECT_REASON.PHOTO) {
        return (
            <p className={styles.KycStatusRejectedCauseText}>
                {context.t("Your Photo(Passport or Id card or driver license) is not correctly confirmed.")}
            </p> 
        )
    } else if  (props.kyc.kyc_reject_reason === KYC_REJECT_REASON.COUNTRY) {
        return (
            <p className={styles.KycStatusRejectedCauseText}>
                {context.t("Your country is not correctly confirmed.")}
            </p> 
        )
    } else if  (props.kyc.kyc_reject_reason === KYC_REJECT_REASON.MOBILE_NUMBER) {
        return (
            <p className={styles.KycStatusRejectedCauseText}>
                {context.t("Your mobile number is not correctly confirmed.")}
            </p> 
        )
    } else {
        return (
            null
        )
    }
}


Kyc.propTypes = {
    kyc: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    FetchKyc: PropTypes.func.isRequired,
}

Kyc.contextTypes = {
    t: PropTypes.func.isRequired
};

KycStatus.contextTypes = {
    t: PropTypes.func.isRequired
};

RejectedReason.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Kyc;