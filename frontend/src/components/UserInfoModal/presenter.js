import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Button,
    Icon,
    Segment,
    Dropdown,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss"
import { KYC_STATUS, KYC_REJECT_REASON } from "./../../config/constants"

const UserInfoModal = (props, context) => {
    const kycStatusOptions = [ 
        { key: KYC_STATUS.READY, value: KYC_STATUS.READY.toString(), text: KYC_STATUS.READY},
        { key: KYC_STATUS.APPROVING, value: KYC_STATUS.APPROVING, text: KYC_STATUS.APPROVING},
        { key: KYC_STATUS.APPROVED, value: KYC_STATUS.APPROVED, text: KYC_STATUS.APPROVED},
        { key: KYC_STATUS.PENDING, value: KYC_STATUS.PENDING, text: KYC_STATUS.PENDING},
        { key: KYC_STATUS.REJECTED, value: KYC_STATUS.REJECTED, text: KYC_STATUS.REJECTED},
        { key: KYC_STATUS.COMPLETED, value: KYC_STATUS.COMPLETED, text: KYC_STATUS.COMPLETED},
    ]

    const kycRejectReasonOptions = [ 
        { key: KYC_REJECT_REASON.NONE, value: KYC_REJECT_REASON.NONE.toString(), text: KYC_REJECT_REASON.NONE},
        { key: KYC_REJECT_REASON.PHOTO, value: KYC_REJECT_REASON.PHOTO.toString(), text: KYC_REJECT_REASON.PHOTO},
        { key: KYC_REJECT_REASON.MOBILE_NUMBER, value: KYC_REJECT_REASON.MOBILE_NUMBER.toString(), text: KYC_REJECT_REASON.MOBILE_NUMBER},
        { key: KYC_REJECT_REASON.COUNTRY, value: KYC_REJECT_REASON.COUNTRY.toString(), text: KYC_REJECT_REASON.COUNTRY},
    ]

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
                        <Dropdown 
                            placeholder={'KYC status'}
                            options={kycStatusOptions} 
                            className={styles.KycStatusDropDown}
                            value={
                                props.newKycStatus !== null && props.newKycStatus !== '' 
                                    ? props.newKycStatus 
                                    : props.userInfomation.kyc_status
                            }
                            onChange={props.handleChangeKycStatus}
                            readOnly={!props.isEnableInputKycStatus}
                            disabled={!props.isEnableInputKycStatus}
                        />
                    </div>
                    <div className={styles.ItemDivision}>
                        <p className={styles.SubTitle}>Reject Reason :</p>
                        <Dropdown 
                            placeholder={'KYC RejectReason'}
                            options={kycRejectReasonOptions} 
                            className={styles.KycStatusDropDown}
                            value={
                                props.newKycStatusRejectReason !== null && props.newKycStatusRejectReason !== '' 
                                    ? props.newKycStatusRejectReason 
                                    : props.userInfomation.kyc_reject_reason
                            }
                            onChange={props.handleChangeKycRejectReason}
                            readOnly={!props.isEnableInputKycRejectReason}
                            disabled={!props.isEnableInputKycRejectReason}
                        />
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
                        onClick={() => {
                                props.handleProcessDone(
                                    props.userInfomation.username, 
                                    props.newKycStatus, 
                                    (props.newKycStatusRejectReason === null || props.newKycStatusRejectReason === '')
                                    ? props.userInfomation.kyc_reject_reason
                                    : props.newKycStatusRejectReason
                                )
                            }
                        }
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
    isEnableInputKycStatus: PropTypes.bool.isRequired,
    isEnableInputKycRejectReason: PropTypes.bool.isRequired,
    handleChangeKycStatus: PropTypes.func.isRequired,
    handleChangeKycRejectReason: PropTypes.func.isRequired,
    newKycStatus: PropTypes.string,
    newKycStatusRejectReason: PropTypes.string,
}

UserInfoModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default UserInfoModal;
