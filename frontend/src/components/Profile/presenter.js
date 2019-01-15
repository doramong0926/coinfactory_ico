import React from "react";
import PropTypes from "prop-types";
import { 
    Segment,
    Loader,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import Transactions from "./../Transactions"
import NumberFormat from 'react-number-format';

import { HOME_PAGE_ADDRESS, REFERRAL_PREFIX } from "./../../config/constants"

const Profile = (props, context) => {
    return (
        <div className={styles.RootDivision}>
            <div className={styles.RootContainer}>
                <div className={styles.HeaderDivision}>
                    <p className={styles.HeaderText}>{context.t("Your BLC Token Infomation")}</p>
                    <p className={styles.DescriptionText}>
                        {context.t("After check your balance of the token, if there is a problem contact to us.")}
                    </p>
                </div>
                <ProfileInfo {...props} />
                <div className={styles.HeaderDivision}>
                    <p className={styles.HeaderText}>{context.t("History of Transaction")}</p>
                    <p className={styles.DescriptionText}>
                        {context.t("You can check transaction history of your wallet")}
                    </p>
                </div>
                <Transactions {...props} />
            </div>
        </div>
    )
}

const ProfileInfo = (props, context) => {
    return (
        <div className={styles.ProfileBox}>
            <Segment basic className={styles.ProfileSegment}>                
                <div className={styles.ProfileDivision}>
                    <div className={styles.ProfileIDLeftDivision}>
                        <div className={styles.ProfileImageDivision}>
                            <img className={styles.ProfileImage} src={require("images/icons/profile-id-icon.png")} alt="Id icon" />
                        </div>
                        <div className={styles.ProfileIdIndexDivision}>
                            <p className={styles.IndexText}>
                                {context.t("ID")}
                            </p>
                        </div>
                        <div className={styles.Divider}>
                        </div>
                    </div>
                    <div className={styles.ProfileInfoDivision}>
                        <p className={styles.ProfileInfoText}>{props.profile !== null ? props.profile.email : ""}</p>
                    </div>
                </div>
            </Segment>
            <Segment basic className={styles.ProfileSegmentMultiLine}>                
                <div className={styles.ProfileMultiLineDivision}>
                    <div className={styles.ProfileTopDivision}>
                        <div className={styles.ProfileImageDivision}>
                            <img className={styles.ProfileImage} src={require("images/icons/profile-referral-icon.png")} alt="referral icon" />
                        </div>
                        <div className={styles.ProfileIndexDivision}>
                            <p className={styles.IndexText}>
                                {context.t("Your referral address")}
                            </p>
                        </div>
                        <div className={styles.DividerReferral}>
                        </div>
                    </div>    
                    <div className={styles.DividerHorizental}>
                    </div>                
                    <div className={styles.ProfileInfoDivisionMultiLine}>
                        <p className={styles.ProfileInfoText}>{props.profile !== null ? `${HOME_PAGE_ADDRESS}${REFERRAL_PREFIX}${props.profile.referral_address}` : ""}</p>
                    </div>
                </div>
            </Segment>
            <Segment basic className={styles.ProfileSegment}>
                <div className={styles.ProfileDivision}>
                    <div className={styles.ProfileLeftDivision}>
                        <div className={styles.ProfileImageDivision}>
                            <img className={styles.ProfileImage} src={require("images/icons/profile-id-icon.png")} alt="invitees icon" />
                        </div>
                        <div className={styles.ProfileIndexDivision}>
                            <p className={styles.IndexText}>
                                {context.t("Your invitees")}
                            </p>
                        </div>                    
                        <div className={styles.Divider}>
                    </div>

                    </div>
                    <div className={styles.ProfileInfoDivision}>
                        <p className={styles.ProfileInfoText}>{props.profile !== null ? props.profile.invitees_count : "0"} people</p>
                    </div>
                </div>
            </Segment>
            <Segment basic className={styles.ProfileSegmentMultiLine}>                
                <div className={styles.ProfileMultiLineDivision}>
                    <div className={styles.ProfileTopDivision}>
                        <div className={styles.ProfileImageDivision}>
                        <img className={styles.ProfileImage} src={require("images/icons/profile-wallet-icon.png")} alt="wallet icon" />
                        </div>
                        <div className={styles.ProfileIndexDivision}>
                            <p className={styles.IndexText}>
                                {context.t("Your wallet address")}
                            </p>
                        </div>
                        <div className={styles.DividerReferral}>
                        </div>
                    </div>    
                    <div className={styles.DividerHorizental}>
                    </div>                
                    <div className={styles.ProfileInfoDivisionMultiLine}>
                        <p className={styles.ProfileInfoText}>{props.profile !== null ? props.profile.wallet_address : "None"}</p>
                    </div>
                </div>
            </Segment>
            <Segment basic className={styles.ProfileSegment}>
                <div className={styles.ProfileDivision}>
                    <div className={styles.ProfileLeftDivision}>
                        <div className={styles.ProfileImageDivision}>
                            <img className={styles.ProfileImage} src={require("images/icons/profile-receive-icon.png")} alt="receive icon" />
                        </div>
                        <div className={styles.ProfileIndexDivision}>
                            <p className={styles.IndexText}>
                                {context.t("BLC received")}
                            </p>
                        </div>                    
                        <div className={styles.Divider}>
                        </div>
                    </div>
                    <div className={styles.ProfileInfoDivision}>
                        <div className={styles.ProfileInfoText}>
                            {
                                props.blc_amount !== null 
                                    ? 
                                        <React.Fragment>
                                            <NumberFormat 
                                                value={props.blc_amount} 
                                                displayType={'text'} 
                                                thousandSeparator={true}
                                            />
                                            <span> ETH</span>
                                        </React.Fragment>
                                    :   <Loader size='tiny' active inline />
                            } 
                        </div>
                    </div>
                </div>
            </Segment>
            <Segment basic className={styles.ProfileSegment}>
                <div className={styles.ProfileDivision}>
                    <div className={styles.ProfileLeftDivision}>
                        <div className={styles.ProfileImageDivision}>
                            <img className={styles.ProfileImage} src={require("images/icons/profile-sent-icon.png")} alt="sent icon" />
                        </div>
                        <div className={styles.ProfileIndexDivision}>
                            <p className={styles.IndexText}>
                                {context.t("ETH sent")}
                            </p>
                        </div>
                        <div className={styles.Divider}>
                        </div>
                    </div>
                    <div className={styles.ProfileInfoDivision}>
                        <div className={styles.ProfileInfoText}>
                            {
                                props.eth_amount !== null 
                                    ? (
                                        <React.Fragment>
                                            <NumberFormat 
                                                value={props.eth_amount} 
                                                displayType={'text'} 
                                                thousandSeparator={true}
                                            />
                                            <span> ETH</span>
                                        </React.Fragment>
                                    )
                                    :  <Loader size='tiny' active inline />                                    
                            } 
                        </div>
                    </div>
                </div>
            </Segment>
        </div>
    )
}


Profile.propTypes = {
    profile: PropTypes.object,
    eth_amount: PropTypes.string,
    blc_amount: PropTypes.string,
}

Profile.contextTypes = {
    t: PropTypes.func.isRequired
};

ProfileInfo.contextTypes = {
    t: PropTypes.func.isRequired
};



export default Profile;