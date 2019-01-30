import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Button,
    Icon,
    Segment,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss"

const UserInfoModal = (props, context) => {
    return (        
        (props.userInfomation === null || props.userInfomation === '') ? null :
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={'small'}
            basic
        >
            <Segment className={styles.RootSegment}>
                <Modal.Header>
                    <h2>User Infomation</h2>
                </Modal.Header>
                <Modal.Content 
                    scrolling
                    className={styles.ContentBox}
                >
                <Modal.Description>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Username :</p>
                        <p className={styles.ItemText}>{props.userInfomation.username}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>User_type :</p>
                        <p className={styles.ItemText}>{props.userInfomation.user_type}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Is_superuser :</p>
                        <p className={styles.ItemText}>{props.userInfomation.is_superuser}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Is_staff :</p>
                        <p className={styles.ItemText}>{props.userInfomation.is_staff}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Email :</p>
                        <p className={styles.ItemText}>{props.userInfomation.email}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Photo type :</p>
                        <p className={styles.ItemText}>{props.userInfomation.photo_type}</p>
                    </div>
                    {
                        (props.userInfomation.photo !== null) 
                            ? (
                                <div className={styles.ItemDivision}>
                                    <img
                                        src={`${props.userInfomation.photo}`} 
                                        alt={context.t(`${props.userInfomation.photo_type}`)}
                                        className={styles.Photo}
                                    />
                                </div>
                            ) : null
                    }
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Name :</p>
                        <p className={styles.ItemText}>{props.userInfomation.last_name}, </p>
                        <p className={styles.ItemText}>{props.userInfomation.first_name}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Kyc Status :</p>
                        <p className={styles.ItemText}>{props.userInfomation.kyc_status}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Reject Reason :</p>
                        <p className={styles.ItemText}>{props.userInfomation.kyc_reject_reason}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Wallet addr:</p>
                        <p className={styles.ItemText}>{props.userInfomation.wallet_address}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Is_whitelisted :</p>
                        <p className={styles.ItemText}>{props.userInfomation.is_whitelisted.toString()}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Country :</p>
                        <p className={styles.ItemText}>{props.userInfomation.country}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Mobile :</p>
                        <p className={styles.ItemText}>{props.userInfomation.mobile_country}-{props.userInfomation.mobile_number}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Referral addr :</p>
                        <p className={styles.ItemText}>{props.userInfomation.referral_address}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Invitees Cnt :</p>
                        <p className={styles.ItemText}>{props.userInfomation.invitees_count}</p>
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>invitation :</p>
                        <p className={styles.ItemText}>{props.userInfomation.invitation === null ? "" : props.userInfomation.invitation.username}</p>
                    </div>    
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={props.handleClose}>
                        <Icon name='cancel' />{context.t('닫기')}
                    </Button>
                    <Button 
                        color='green' 
                        onClick={props.handleProcessDone}
                        disabled={!props.isEnableSubmit}
                    >
                        <Icon name='checkmark' />{context.t("변경")}
                    </Button>
                </Modal.Actions>
            </Segment>
        </Modal>
    )
}

UserInfoModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleProcessDone: PropTypes.func.isRequired,
    userInfomation: PropTypes.object,
    isEnableSubmit: PropTypes.bool.isRequired,
}

UserInfoModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default UserInfoModal;
