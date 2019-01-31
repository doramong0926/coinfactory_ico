import React, { Component } from "react";
import KycRegister from "./presenter";
import PropTypes from "prop-types";
import { 
    FETCH_TYPE, 
    KYC_THUMNAIL_WIDTH, 
    KYC_THUMNAIL_HEIGHT,
    KYC_STATUS,
    MOBILE_VERIFY_TIMEOUT,
} from "./../../config/constants"
import { IsValidWalletAddress } from "./../../utils/web3Control";
import "isomorphic-fetch";
import {resize} from "./../../utils/resizeImage"

class  Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isCompleteStep1: false,
            isCompleteStep2: false,
            isCompleteStep3: false,
            isCompleteStep4: false,
            isEnableSubmit: false,
            isEnableInput: false,         
            
            visibleModal: false,
            visibleConfirm: false,
            visiblePhoneVerificationModal: false,
            visibleTermsModal: false,

            isSendSuccess: false,
            successMessage: null,
            errorType: "",       
            mobileVerificationError: false,

            kyc_agreement1: this.props.kyc.kyc_agreement1,
            kyc_agreement2: this.props.kyc.kyc_agreement2,
            first_name: this.props.kyc.first_name,
            last_name: this.props.kyc.last_name,
            country: this.props.kyc.country === null ? "" : this.props.kyc.country,
            mobile_country: this.props.kyc.mobile_country === null ? "" : this.props.kyc.mobile_country,
            mobile_number: this.props.kyc.mobile_number === null ? "" : this.props.kyc.mobile_number,
            photo: this.props.kyc.photo,
            photo_type: this.props.kyc.photo_type,
            wallet_address: this.props.kyc.wallet_address,
            isValidWalletAddress: IsValidWalletAddress(this.props.kyc.wallet_address),
            
            selectedPhoto: null,
            selectedPhotoPath: null,
            mediaAddress: process.env.PUBLIC_URL, 
            
            mobile_confirm_number: null,
            mobile_confirm_timeout: 0,
            
        }
    }

    static propTypes = {
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        kyc: PropTypes.object.isRequired,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        FetchKyc: PropTypes.func.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        this._checkKycStatusAndInput();
        setInterval(() => {
            if (this.state.mobile_confirm_timeout > 0) {
                this.setState({
                    mobile_confirm_timeout: this.state.mobile_confirm_timeout-1,
                })
            } else {
                clearInterval(); 
            }
        }, 1000); 
    }

    componentWillUnmount() {
        clearInterval(); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.kyc.kyc_status !== this.props.kyc.kyc_status 
            || prevProps.kyc.photo !== this.props.kyc.photo) {
                this._checkKycStatusAndInput();
        }
    }


    render () {
        return (
            this.props.kyc === null || this.props.kyc === undefined ? 
                null  :  <KycRegister
                                email={this.props.email}
                                kyc={this.props.kyc}
                                handleOnSubmit={this._handleOnSubmit}
                                handleInputChange={this._handleInputChange}
                                handleChangeCountry={this._handleChangeCountry}
                                handleCloseModal={this._handleCloseModal}
                                isEnableSubmit={this.state.isEnableSubmit}
                                wallet_address={this.state.wallet_address}
                                visibleModal={this.state.visibleModal}
                                isSendSuccess={this.state.isSendSuccess}
                                errorType={this.state.errorType}
                                isValidWalletAddress={this.state.isValidWalletAddress}
                                kyc_agreement1={this.state.kyc_agreement1}
                                kyc_agreement2={this.state.kyc_agreement2}
                                handleToggleTerms1={this._handleToggleTerms1}
                                handleToggleTerms2={this._handleToggleTerms2}
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                country={this.state.country}
                                mobile_country={this.state.mobile_country === null ? "+82" : this.state.mobile_country}
                                mobile_number={this.state.mobile_number === null ? "" : this.state.mobile_number}
                                photo_type={this.state.photo_type}
                                visibleConfirm={this.state.visibleConfirm}
                                handleConfirm={this._handleConfirm}
                                handleCancel={this._handleCancel}
                                isEnableInput={this.state.isEnableInput}                                
                                handleChangePhotoType={this._handleChangePhotoType}
                                handleInputChangePhoto={this._handleInputChangePhoto}
                                isCompleteStep1={this.state.isCompleteStep1}
                                isCompleteStep2={this.state.isCompleteStep2}
                                isCompleteStep3={this.state.isCompleteStep3}
                                isCompleteStep4={this.state.isCompleteStep4}
                                selectedPhotoPath={this.state.selectedPhotoPath}
                                photo={this.state.photo}
                                mediaAddress={this.state.mediaAddress}
                                visiblePhoneVerificationModal={this.state.visiblePhoneVerificationModal}
                                handleClosePhoneVerificationModal={this._handleClosePhoneVerificationModal}
                                handleChangeMobileCountry={this._handleChangeMobileCountry}
                                confirmNumber={this.state.mobile_confirm_number}
                                confirmTimeout={this.state.mobile_confirm_timeout}
                                confirmMobileProcessDone={this._confirmMobileProcessDone}
                                successMessage={this.state.successMessage}
                                handleOnClickPhoneVerification={this._handleOnClickPhoneVerification}
                                mobileVerificationError={this.state.mobileVerificationError}
                                visibleTermsModal={this.state.visibleTermsModal}
                                handleCloseTermsModal={this._handleCloseTermsModal}
                                handleClickTerms={this._handleClickTerms}
                            />
        )
    }

    _checkKycStatusAndInput = () => {
        this._isEnableInput();
        setTimeout(() => {
            this._isStepCompleted();    
        }, );   
        setTimeout(() => {
            this._isEnableSubmit();    
        }, );
    }

    _handleInputChangePhoto = (event) => {
        // const { target : { files, name } } = event;
        const { target : { files } } = event;
        const self = this;
        if (files[0] === undefined) {
            return;
        }

        this.setState({
            selectedPhoto: files[0],
        })

        resize(files[0], KYC_THUMNAIL_WIDTH, KYC_THUMNAIL_HEIGHT, function (resizedDataUrl) {
            self.setState({ 
                selectedPhotoPath: resizedDataUrl 
            });
            self._checkKycStatusAndInput();
        });
    }

    _handleChangePhotoType = (e, { value }) => {
        this.setState({ 
            photo_type: value,
        })
    }

    _isEnableInput = () => {    
        if (this._isKycCompleted() === true || this._isKycApproving() === true) {
            this.setState({
                isEnableInput: false
            })
        } else {
            this.setState({
                isEnableInput: true
            })
        }
    }

    _isStepCompleted = () => {
        if (this.state.kyc_agreement1 === true && this.state.kyc_agreement2 === true) {
            this.setState({
                isCompleteStep1: true,
            })
        } else {
            this.setState({
                isCompleteStep1: false,
            })
        }

        if (this.state.first_name !== null && this.state.first_name !== ""
            && this.state.last_name !== null && this.state.last_name !== ""
            && this.state.country !== null && this.state.country !== ""
            && this.state.mobile_number !== null && this.state.mobile_number !== "" 
            && this.state.mobile_country !== null && this.state.mobile_country !== "" 
        ) {
            this.setState({
                isCompleteStep2: true,
            })
        } else {
            this.setState({
                isCompleteStep2: false,
            })
        }

        if (this.state.photo !== null || this.state.selectedPhoto !== null) {
            this.setState({
                isCompleteStep3: true,
            })
        } else {
            this.setState({
                isCompleteStep3: false,
            })
        }

        if (this.state.isValidWalletAddress === true && this.props.kyc.wallet_address !== null) {
            this.setState({
                isCompleteStep4: true,
            })
        } else {
            this.setState({
                isCompleteStep4: false,
            })
        }
    }

    _isEnableSubmit = () => {
        if ((this.props.kyc.kyc_status === KYC_STATUS.READY 
                || this.props.kyc.kyc_status === KYC_STATUS.REJECTED)
                && this.state.isCompleteStep1 === true && this.state.isCompleteStep2 === true 
                && this.state.isCompleteStep3 === true && this.state.isCompleteStep4 === true
                && (this.state.selectedPhoto !== null || (this.state.photo !==null && this.state.photo !== undefined && this.state.photo !== ""))
            ) {
                this.setState({
                    isEnableSubmit: true
                })
        } else {
                this.setState({
                    isEnableSubmit: false
                })
        }
    }

    _handleOnSubmit = (event) => {
        this.setState({
            visibleConfirm: true,
        })
    }

    _handleCancel = () => {
        this.setState({
            visibleConfirm: false,
        })
    }

    _handleToggleTerms1 = () => {
        this.setState({
            kyc_agreement1: !this.state.kyc_agreement1,
        })
        this._checkKycStatusAndInput();
    }

    _handleToggleTerms2 = () => {
        this.setState({
            kyc_agreement2: !this.state.kyc_agreement2,
        })
        this._checkKycStatusAndInput();
    }

    _handleChangeCountry = (e, { value }) => {
        this.setState({
            country: value,            
        })
        this._checkKycStatusAndInput();
    }

    _handleChangeMobileCountry = (e, { value }) => {
        this.setState({
            mobile_country: value,
            mobileVerificationError: false,
        })
        this._checkKycStatusAndInput();
    }
    
    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        })
        if(name === 'wallet_address')  {
            this.setState({
                isValidWalletAddress: IsValidWalletAddress(value),
            })            
        } else if (name === 'mobile_number')  {
            this.setState({
                mobileVerificationError: false,
            })            
        }
        this._checkKycStatusAndInput();
    }
    
    _handleCloseModal = () => {
        this.setState({
            visibleModal: false,
            isSendSuccess: false,
        })
    }

    _handleCloseTermsModal = () => {
        this.setState({
            visibleTermsModal: false,
        })
    }

    _handleClickTerms = () => {
        this.setState({
            visibleTermsModal: true,
        })
    }

    _handleClosePhoneVerificationModal = () => {
        this.setState({
            visiblePhoneVerificationModal: false,
        })
    }

    _isKycApproving = () => {
        if (this.props.kyc.kyc_status === KYC_STATUS.APPROVING 
            || this.props.kyc.kyc_status === KYC_STATUS.APPROVED
            || this.props.kyc.kyc_status === KYC_STATUS.PENDING) {
                return true;      
        }
        return false;
    }

    _isKycCompleted = () => {
        if (this.props.kyc.kyc_status === KYC_STATUS.COMPLETED) {
            return true;      
        }
        return false;
    }

    _confirmMobileProcessDone = (ret) => {
        if (ret === true) {
            this.setState({
                mobileVerificationError: false,
                visiblePhoneVerificationModal: false,
            })
            this._registerKycInfomation()            
        } else {
            this.setState({
                mobileVerificationError: true,
            })
        }
    }

    _registerKycInfomation = () => {        
        const data = new FormData();
        this.setState({
            visibleConfirm: false,
        })
        this.props.ShowDefaultSpinner();
        // event.preventDefault();
        data.append('wallet_address', this.state.wallet_address.toLowerCase());        
        data.append('first_name', this.state.first_name);        
        data.append('last_name', this.state.last_name);        
        data.append('kyc_agreement1', this.state.kyc_agreement1);        
        data.append('kyc_agreement2', this.state.kyc_agreement2);        
        data.append('country', this.state.country);                
        data.append('mobile_country', this.state.mobile_country);        
        data.append('mobile_number', this.state.mobile_number);        
        data.append('photo_type', this.state.photo_type);
        if (this.state.selectedPhoto !== null) {
            data.append('photo', this.state.selectedPhoto);     
        }

        fetch(`users/${this.props.username}/kyc/`, {
            method: "PUT",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
            },
            body: data
        })
        .then(response => response.json())
        .then( json => {                
            if (json.status === '1') {
                this.setState({
                    errorType: '',
                    isSendSuccess: true,
                    successMessage: this.context.t("KYC 인증을 위한 정보가 등록되었습니다."),
                })
                this._checkKycStatusAndInput();
            } else {
                this.setState({
                    errorType: json.message,
                    isSendSuccess: false,
                })
            }
            this.setState({
                visibleModal: true,
            });
        })
        .then(async() => {
            await this.props.FetchKyc(FETCH_TYPE.REFRESH)
            this.props.HideDefaultSpinner();
        })
        .catch (
            err => {
                console.log(err)
                this.props.HideDefaultSpinner();
            }
        )
    }

    _handleConfirm = () => {        
        this.setState({
            visibleConfirm: false,
        })
        this._handleOnClickPhoneVerification();
    }

    _handleOnClickPhoneVerification = () => {
        const data = new FormData();
        this.props.ShowDefaultSpinner();
        // event.preventDefault();       
        data.append('mobile_country', this.state.mobile_country);        
        data.append('mobile_number', this.state.mobile_number);      

        fetch(`users/${this.props.username}/mobile_number/`, {
            method: "PUT",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
            },
            body: data
        })
        .then(response => response.json())
        .then( json => {                
            if (json.status === '1') {
                this.setState({
                    mobile_confirm_number: (parseInt(json.result)+parseInt(process.env.REACT_APP_MAGIC_NUM_FOR_PHONE)).toString(),
                    mobile_confirm_timeout: MOBILE_VERIFY_TIMEOUT,
                    visiblePhoneVerificationModal: true,
                })
            } else {
                this.setState({
                    errorType: json.message,
                    isSendSuccess: false,
                    visibleModal: true,
                })
            }
        })
        .then(async() => {
            this.props.HideDefaultSpinner();
        })
        .catch (
            err => {
                console.log(err)
                this.props.HideDefaultSpinner();
            }
        )        
    }
}

export default Container;