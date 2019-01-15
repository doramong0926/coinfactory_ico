import React from "react";
import { 
    Button,
    Input,
    Form,
    Segment,
    Icon,
    Checkbox,
    Confirm,
    Dropdown
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import BasicModal from "../BasicModal";
import serverErrorTypes from "./../share/serverError.js";
import { KYC_STATUS } from "./../../config/constants";
import styles from "./styles.module.scss";
import KycStep from "./../KycStep";
import PhoneVerificationModal from "./../PhoneVerificationModal"

const KycRegister = (props, context) => {
    const countryOptions = [ 
        { key: 'kr', value: 'ko', flag: 'kr', text: 'Korea'},
        { key: 'us', value: 'us', flag: 'us', text: 'United States of America'},        
        { key: 'gu', value: 'gu', flag: 'gu', text: 'Guam'},        
        { key: 'hk', value: 'hk', flag: 'hk', text: 'Hong Kong'},
        { key: 'cn', value: 'cn', flag: 'cn', text: 'China'},
        { key: 'vn', value: 'vn', flag: 'vn', text: 'Viet Nam'},
        { key: 'jp', value: 'jp', flag: 'jp', text: 'Japan'},
        { key: 'id', value: 'id', flag: 'id', text: 'Indonesia'},
        { key: 'sg', value: 'sg', flag: 'sg', text: 'Singapore'},
    ]

    const mobileCountryOptions = [ 
        { key: 'kr', value: '+82', flag: 'kr', text: '(KR) +82 '},
        { key: 'us', value: '+1', flag: 'us', text: '(US) +01'},
        { key: 'gu', value: '+1671', flag: 'gu', text: '(GU) +01671'},
        { key: 'hk', value: '+852', flag: 'hk', text: '(HK) +852'},
        { key: 'cn', value: '+86', flag: 'cn', text: '(CN) +86'},
        { key: 'vn', value: '+84', flag: 'vn', text: '(VN) +84'},
        { key: 'jp', value: '+81', flag: 'jp', text: '(JP) +81'},
        { key: 'id', value: '+62', flag: 'id', text: '(ID) +62'},
        { key: 'sg', value: '+65', flag: 'sg', text: '(SG) +65'},
    ]

    const modalTitle = context.t("요청 결과")
    const modalContents = [
        {
            title: null,
            text: [
                props.isSendSuccess === true ? 
                context.t(`${props.successMessage}`)
                : context.t(`${_getErrorMessage(props.errorType)}`)
            ]
        },
    ];

    const confirmTitle = context.t("KYC 요청")
    const confirmContent =context.t("KYC 요청 이후에는 입력하신 데이터를 수정할 수 없습니다. 계속 진행하시겠습니까?");

    return (
        <React.Fragment>
            <KycStep 
                isCompleteStep1={props.isCompleteStep1}
                isCompleteStep2={props.isCompleteStep2}
                isCompleteStep3={props.isCompleteStep3}
                isCompleteStep4={props.isCompleteStep4}
            />
            <div className={styles.RootDivision}>
                <Form size='small' onSubmit={props.handleOnSubmit}>
                    <div className={styles.TermsDivision}>
                        <p className={styles.HederText}>{context.t("1. Term of Service")}</p>  
                        <Form.Field className={styles.FormField}>
                            <Checkbox                            
                                checked={props.kyc.kyc_status !== KYC_STATUS.READY ? props.kyc.kyc_agreement1 : props.kyc_agreement1}
                                onChange={props.handleToggleTerms1}
                                name='kyc_agreement1'
                                disabled={!props.isEnableInput}
                                className={styles.TermsCheckBox}
                            >
                            </Checkbox>
                            <div className={styles.TermsText}>
                                <span> 
                                    {context.t('I agree to the terms of the User Agreement and give my consent to process my personal data for the purposes and conditions set out in the ')}
                                </span>                     
                                <span className={styles.MoveTermsText}>Privacy Policy.</span>
                            </div>
                        </Form.Field>
                        <Form.Field className={styles.FormField2}>
                            <Checkbox                            
                                checked={props.kyc.kyc_status !== KYC_STATUS.READY ? props.kyc.kyc_agreement2 : props.kyc_agreement2}
                                onChange={props.handleToggleTerms2}
                                name='kyc_agreement2'
                                disabled={!props.isEnableInput}
                                className={styles.TermsCheckBox}
                            >
                            </Checkbox>
                            <div className={styles.TermsText}>
                                <span> 
                                    {context.t('I am not an underage South Korean citizen, a US citizen, a Singaporean national, or a Chinese national etc.')}
                                </span>                     
                                <span> 
                                    {context.t('I Give my consent to process my personal data for the purposes and conditions set out in the ')}
                                </span>                     
                                <span className={styles.MoveTermsText}>Privacy Policy.</span>
                            </div>
                        </Form.Field>
                    </div>                    
                    <div className={styles.KycInfoDivision}>
                        <p className={styles.HederText}>{context.t("2. Proof of Identity")}</p>  
                        <Segment basic className={styles.InputFormContainer}>   
                            <div className={styles.NameInputDivision}>
                                <Icon name='user' />
                                <Input 
                                    type='text' 
                                    placeholder={context.t('First name')}
                                    value={props.kyc.kyc_status !== KYC_STATUS.READY ? props.kyc.first_name : props.first_name}
                                    onChange={props.handleInputChange}
                                    name='first_name'
                                    readOnly={!props.isEnableInput}
                                    className={styles.NameInputBox}
                                />
                                <Input 
                                    type='text' 
                                    placeholder={context.t('Last name')}
                                    value={props.kyc.kyc_status !== KYC_STATUS.READY ? props.kyc.last_name : props.last_name}
                                    onChange={props.handleInputChange}
                                    name='last_name'
                                    readOnly={!props.isEnableInput}
                                    className={styles.NameInputBox}                                    
                                />
                            </div>
                            <div className={styles.InputDivision}>
                                <Icon name='mail' />
                                <Input 
                                    type='email' 
                                    placeholder={context.t('Your e-mail(used as account address)')}
                                    value={props.email}
                                    onChange={props.handleInputChange}
                                    name='email'
                                    className={styles.InputBox}
                                    readOnly
                                />
                            </div>
                            <div className={styles.InputDivision}>
                                <Icon name='world' />
                                <Dropdown 
                                    placeholder='Select Country' 
                                    search 
                                    selection 
                                    upward
                                    options={countryOptions}
                                    value={props.kyc.kyc_status !== KYC_STATUS.READY ? props.kyc.country : props.country}
                                    onChange={props.handleChangeCountry}
                                    className={styles.InputBox}
                                    readOnly={!props.isEnableInput}
                                    disabled={!props.isEnableInput}
                                    name='country'
                                />
                            </div>
                            <div className={styles.PhoneInputDivision}>
                                <Icon name='mobile alternate' />
                                <Input 
                                    type='text' 
                                    label={
                                        <Dropdown 
                                            placeholder={context.t("국가 코드")}
                                            options={mobileCountryOptions} 
                                            className={styles.MobileCountryDropDown}
                                            value={props.kyc.kyc_status !== KYC_STATUS.READY ? props.kyc.mobile_country : props.mobile_country}
                                            onChange={props.handleChangeMobileCountry}
                                            readOnly={!props.isEnableInput}
                                            disabled={!props.isEnableInput}
                                        />}
                                    labelPosition='left'
                                    placeholder={context.t('Mobile number')}
                                    value={props.kyc.kyc_status !== KYC_STATUS.READY && props.kyc.mobile_number !== null ? props.kyc.mobile_number : props.mobile_number}
                                    onChange={props.handleInputChange}
                                    name='mobile_number'
                                    readOnly={!props.isEnableInput}
                                    className={styles.PhoneInputBox}
                                />
                            </div>
                        </Segment>
                    </div>    

                    <div className={styles.PhotoDivision}>
                        <p className={styles.HederText}>{context.t("3. Selfie with the Proof")}</p> 
                        <div className={styles.PhotoSelectType}>
                            <span className={styles.PhotoSelectTypeText}>-----------------------------------</span>
                            <span className={styles.PhotoSelectTypeText}>SELECT YOUR ID TYPE</span>
                            <span className={styles.PhotoSelectTypeText}>-----------------------------------</span>
                        </div>
                        <div className={styles.PhotoSelectTypeMobile}>
                            <span className={styles.PhotoSelectTypeText}>---------</span>
                            <span className={styles.PhotoSelectTypeText}>SELECT YOUR ID TYPE</span>
                            <span className={styles.PhotoSelectTypeText}>---------</span>
                        </div>
                        <div className={styles.PhotoSelectTypeCheckboxDivision}>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Passport'
                                    name='photo_type'
                                    value='passport'
                                    checked={props.photo_type === 'passport'}
                                    onChange={props.handleChangePhotoType}
                                    readOnly={!props.isEnableInput}
                                    className={styles.PhotoSelectTypeCheckbox}                                    
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='ID Card'
                                    name='photo_type'
                                    value='id_card'
                                    checked={props.photo_type === 'id_card'}
                                    onChange={props.handleChangePhotoType}
                                    readOnly={!props.isEnableInput}
                                    className={styles.PhotoSelectTypeCheckbox}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Drive License'
                                    name='photo_type'
                                    value='drive_license'
                                    checked={props.photo_type === 'drive_license'}
                                    onChange={props.handleChangePhotoType}
                                    readOnly={!props.isEnableInput}
                                    className={styles.PhotoSelectTypeCheckbox}
                                />
                            </Form.Field>
                        </div>
                        <PhotoDescription {...props} />
                        <Segment className={styles.InputFormContainer}>                          
                            <div className={styles.PhotoInputDivision}>
                                <Input 
                                    type='file' 
                                    accept="image/gif, image/jpeg"
                                    name='photo'
                                    onChange={props.handleInputChangePhoto}
                                    disabled={!props.isEnableInput}
                                >              
                                    <input className={styles.InputPhoto} />
                                    <div>
                                        <img
                                            src={
                                                (props.photo !== null && props.selectedPhotoPath === null)
                                                    ? (
                                                        `${props.photo}`
                                                    )
                                                    : (
                                                        props.selectedPhotoPath === null 
                                                        ? require('images/icons/upload_default_image.png')
                                                        : props.selectedPhotoPath
                                                    )
                                            } 
                                            alt={context.t(`${props.photo_type}`)}
                                            className={(props.selectedPhotoPath === null && props.photo === null)
                                            ? styles.PhotoThumnailDefault
                                            : styles.PhotoThumnail}
                                        />
                                        
                                        <div className={ (props.selectedPhotoPath === null && props.photo === null)
                                                ? styles.DescriptionText
                                                : styles.DescriptionTextDisappear
                                        }>
                                            <p>
                                                {context.t(".jpeg or .gif should be more than 500Kb and 3000DPI")}
                                            </p> 
                                        </div> 
                                        <div className={styles.SelectButton}>
                                            {context.t("Choose to upload")}
                                        </div>   
                                    </div>
                                </Input>
                            </div>
                        </Segment>
                    </div>

                    <div className={styles.WalletDivision}>
                        <p className={styles.HederText}>{context.t("4. Your ETH Address")}</p>                      
                        <Segment className={styles.InputFormContainer}>                          
                            <div className={styles.WalletInputDivision}>
                                <input 
                                    type='text' 
                                    placeholder={context.t('Fill your ETH address to receive BLC.')}
                                    value={props.kyc.kyc_status !== KYC_STATUS.READY ? props.kyc.wallet_address : props.wallet_address}
                                    onChange={props.handleInputChange}
                                    name='wallet_address'
                                    disabled={!props.isEnableInput}
                                    className={styles.WalletInputBox}
                                />
                            </div>
                        </Segment>
                    </div>
                    <Segment basic className={styles.SubmitButtonContainer}>
                        <Button 
                            fluid
                            type='submit'
                            disabled={!props.isEnableSubmit}
                            className={styles.SubmitButton}
                        >
                            {context.t('Register KYC')}
                        </Button>
                    </Segment>
                    <Confirm 
                        open={props.visibleConfirm} 
                        header={confirmTitle}
                        content={confirmContent}
                        onCancel={props.handleCancel} 
                        onConfirm={props.handleConfirm} 
                    />  
                </Form>                
            </div>
            <BasicModal 
                visible = {props.visibleModal}
                handleClose = {props.handleCloseModal}
                size={"tiny"} 
                title={modalTitle}
                contents={modalContents}                    
            />
            <PhoneVerificationModal
                visible = {props.visiblePhoneVerificationModal}
                handleClose = {props.handleClosePhoneVerificationModal}
                confirmNumber = {props.confirmNumber}
                confirmTimeout = {props.confirmTimeout}
                size={"mini"}                  
                resend = {props.handleOnClickPhoneVerification}
                processDone={props.confirmMobileProcessDone}
                mobileVerificationError = {props.mobileVerificationError}
            />
        </React.Fragment>
    )
}

const PhotoDescription = (props, context) => {
    if (props.photo_type === "passport") {
        return (
            <p className={styles.DescriptionText}>{context.t("Please upload your passport. The photo should be bright and clear, and all corners of your document must be visible.")}</p>   
        )
    } else if (props.photo_type === "id_card") {
        return (
            <p className={styles.DescriptionText}>{context.t("Please upload your id card. The photo should be bright and clear, and all corners of your document must be visible.")}</p>   
        )
    } else if (props.photo_type === "drive_license") {
        return (
            <p className={styles.DescriptionText}>{context.t("Please upload your drive license. The photo should be bright and clear, and all corners of your document must be visible.")}</p>   
        )
    } else {
        return (
            <p className={styles.DescriptionText}>{context.t("Please upload your photo. The photo should be bright and clear, and all corners of your document must be visible.")}</p>   
        )
    }

}


const _getErrorMessage = (errorType) => {
    switch(errorType) {            
        case serverErrorTypes.KYC_WALLET_ALREADY_USED:
            return "입력하신 지갑 주소는 이미 다른 사용자가 사용하고 있습니다. 다시 입력해주세요."
            
        case serverErrorTypes.KYC_MOBILE_NUMBER_ALREADY_USED:
            return "입력하신 휴대폰 번호는 이미 다른 사용자가 사용하고 있습니다. 다시 입력해주세요."
        
        case serverErrorTypes.KYC_MOBILE_NUMBER_TWILIO_ERROR:
            return "문자인증 서버 오류 입니다. 잠시후 다시 시도해 주세요."            

        case serverErrorTypes.KYC_FAIL_TO_PUT:
            return "지갑 주소 전송이 실패하였습니다. 잠시후 다시 시도해주세요."

        default :
            return errorType;
    }
}

KycRegister.propTypes = {
    email: PropTypes.string.isRequired,
    kyc: PropTypes.object.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    isEnableSubmit: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleChangeCountry: PropTypes.func.isRequired,
    wallet_address: PropTypes.string.isRequired,
    visibleModal: PropTypes.bool.isRequired,
    isSendSuccess: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    errorType: PropTypes.string.isRequired,
    isValidWalletAddress: PropTypes.bool.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    mobile_number: PropTypes.string.isRequired,
    kyc_agreement1: PropTypes.bool.isRequired,
    kyc_agreement2: PropTypes.bool.isRequired,
    handleToggleTerms1: PropTypes.func.isRequired,
    handleToggleTerms2: PropTypes.func.isRequired,
    visibleConfirm: PropTypes.bool.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    isEnableInput: PropTypes.bool.isRequired,
    handleChangePhotoType: PropTypes.func.isRequired,
    photo_type: PropTypes.string.isRequired,
    isCompleteStep1: PropTypes.bool.isRequired,
    isCompleteStep2: PropTypes.bool.isRequired,
    isCompleteStep3: PropTypes.bool.isRequired,
    isCompleteStep4: PropTypes.bool.isRequired,
    selectedPhotoPath: PropTypes.string,
    photo: PropTypes.string,  
    handleInputChangePhoto: PropTypes.func.isRequired,
    mediaAddress: PropTypes.string.isRequired,
    visiblePhoneVerificationModal: PropTypes.bool.isRequired,
    handleClosePhoneVerificationModal: PropTypes.func.isRequired,
    isEnablePhoneVerify: PropTypes.bool.isRequired,
    mobile_country: PropTypes.string.isRequired,
    handleChangeMobileCountry: PropTypes.func.isRequired,
    confirmNumber: PropTypes.string,
    confirmTimeout: PropTypes.number.isRequired,
    confirmMobileProcessDone: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    handleOnClickPhoneVerification: PropTypes.func.isRequired,
    mobileVerificationError: PropTypes.bool.isRequired,
}

KycRegister.contextTypes = {
    t: PropTypes.func.isRequired
};

PhotoDescription.contextTypes = {
    t: PropTypes.func.isRequired
};

export default KycRegister;