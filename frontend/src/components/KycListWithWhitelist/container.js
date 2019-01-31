import React, { Component } from "react";
import PropTypes from "prop-types";
import KycListWithWhitelist from "./presenter";
import _ from "lodash";
import { AddWhiteList, IsWhitelisted, GetParentString } from "./../../utils/web3Control"
import { KYC_STATUS } from "../../config/constants";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            kyc_list: null,            
            column: null,
            direction: null,
            isLoading: true,
            icoWalletList: null,            
            tempkey: null,
            temp_string: null,
            isEnableControl: false,
            visibleIcoControlModal: false,
            visibleErrorModal: false,
            visibleSuccessModal: false,
            resultTxid: null,
            whitelist: [],
            userlist: [],
            userlistToCompleted: [],
            isEnableCompleted: false,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        icoWalletList: PropTypes.object.isRequired,
        pathname: PropTypes.string,
        tempkey: PropTypes.string,
        temp_string: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        Logout: PropTypes.func.isRequired,
    }

    componentDidMount () {
        if (this.props.icoWalletList !== undefined && this.props.icoWalletList !== null) {
            this.setState({
                icoWalletList: this.props.icoWalletList,
            })
            setTimeout(() => {
                this._fetchKycList(); 
            }, );
        }
        if (this.props.tempkey !== undefined && this.props.tempkey !== null) {
            this.setState({
                tempkey: this.props.tempkey,
            })
        }
        if (this.props.temp_string !== undefined && this.props.temp_string !== null) {
            this.setState({
                temp_string: this.props.temp_string,
            })
        }
        this._IsEnableControl();            
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null && nextProps.icoWalletList !== undefined) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })
            setTimeout(() => {
                this._fetchKycList(); 
                this._IsEnableControl();      
            }, );                  
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/icoinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
                setTimeout(() => {
                    this._fetchKycList(); 
                    this._IsEnableControl();       
                }, );
            }
        }

        if (this.props.tempkey === null && nextProps.tempkey !== null) {
            this.setState({
                tempkey: nextProps.tempkey,
            })
            this._IsEnableControl();            
        } else if (this.props.tempkey !== null && this.props.tempkey !== nextProps.tempkey) {
            this.setState({
                tempkey: nextProps.tempkey,
            })
            this._IsEnableControl();            
        }

        if (this.props.temp_string === null && nextProps.temp_string !== null) {
            this.setState({
                temp_string: nextProps.temp_string,
            })
            this._IsEnableControl();            
        } else if (this.props.temp_string !== null && this.props.temp_string !== nextProps.temp_string) {
            this.setState({
                temp_string: nextProps.temp_string,
            })
            this._IsEnableControl();            
        }
    }

    render() {
        return (
            <KycListWithWhitelist 
                kyc_list={this.state.kyc_list}
                handleSort={this._handleSort}
                column={this.state.column}
                direction={this.state.direction}
                refresh={this._fetchKycList}
                isLoading={this.state.isLoading}
                handleOnOpenIcoControlModal={this._handleOnOpenIcoControlModal}                
                handleCloseIcoControlModal={this._handleCloseIcoControlModal}
                handleOnRegisterWhitelist={this._handleOnRegisterWhitelist}
                visibleIcoControlModal={this.state.visibleIcoControlModal}
                isEnableControl={this.state.isEnableControl}
                temp_string={this.state.temp_string}
                visibleErrorModal={this.state.visibleErrorModal}
                handleCloseErrorModal={this._handleCloseErrorModal}
                visibleSuccessModal={this.state.visibleSuccessModal}
                handleCloseSuccessModal={this._handleCloseSuccessModal}
                resultTxid={this.state.resultTxid}
                whitelist={this.state.whitelist}
                userlistToCompleted={this.state.userlistToCompleted}
                handleClickChangeToCompleted={this._handleClickChangeToCompleted}
            />
        )
    }

    _handleSort = clickedColumn => () => {
        if (this.state.column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                kyc_list: _.sortBy(this.state.kyc_list, [clickedColumn]),
                direction: 'ascending',
            })    
            return;
        }
    
        this.setState({
            kyc_list: this.state.kyc_list.reverse(),
            direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    _fetchKycList = () => {
        this.setState({
            isLoading: true,
            userlistToCompleted: [],
        })
        fetch('/users/kyc_list/', {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
            },
        })
        .then( response => {
            if (response.status === 401){
                this.props.Logout();
                this.setState({
                    isLoading: false,
                })
            } else {
                return response.json();
            }
        })
        .then( json => {
            if (json.status === '1') {
                this.setState({
                    kyc_list: json.result,
                })
                setTimeout(() => {
                    this._checkWhiteList();
                }, );
            } else {
                console.log("fail to get kyc list")
            }
            this.setState({
                isLoading: false,
            })
        })
        .catch (
            err => {
                console.log(err);
                this.setState({
                    isLoading: false,
                })
            }
        )
    }

    _checkWhiteList = () => {
        this.setState({
            whitelist: [],    
            userlist: [],
        });
        setTimeout(() => {
            if (this.state.kyc_list !== null) {
                this.state.kyc_list.map((t, index) => {
                    if (t.kyc_status === KYC_STATUS.APPROVED || t.kyc_status === KYC_STATUS.PENDING) {
                        this._checkIsWhiteList(t.wallet_address, t.username, t.kyc_status)    
                    }                
                    return null;
                })
            }
        }, );        
    }

    _checkIsWhiteList = async (address, username, kycStatus) => {
        try {
            const result = await IsWhitelisted (   
                this.state.icoWalletList.icoWallet, 
                address,
            );
            if (result === true) {  
                this._updateIsWhitelist(address, username, kycStatus, true);                
            } else {
                this._updateIsWhitelist(address, username, kycStatus, false);
                if (kycStatus === KYC_STATUS.APPROVED) {
                    this._updateWhitelistToRegister(address);
                    this._updateUserListToRegister(username);
                }
            }
            this._IsEnableControl();            
        } catch(err) {   
            console.log(err)
        }
    }

    _updateIsWhitelist = (address, username, kycStatus, value) => {
        this.setState(
            prevState => ({
                kyc_list: prevState.kyc_list.map((t, index) => {
                    if (t.wallet_address === address) {
                        return (
                            Object.assign(t, { is_whitelisted: value })
                        )
                    } else {
                        return t;
                    }
                })
            })
        );
        if (kycStatus === KYC_STATUS.PENDING && value === true) {
            this.setState({
                userlistToCompleted: this.state.userlistToCompleted.concat(username)
            })
        }
    }

    _updateWhitelistToRegister = (whiteList) => {
        this.setState({
            whitelist: this.state.whitelist.concat(whiteList)
        })
    }

    _updateUserListToRegister = (userlist) => {
        this.setState({
            userlist: this.state.userlist.concat(userlist)
        })
    }

    _handleOnRegisterWhitelist = async (result) => {
        this.setState({
            visibleIcoControlModal: false,
        })
        if (result === true) {
            this.props.ShowDefaultSpinner();
            const parentString = GetParentString(this.props.tempkey, this.props.temp_string);
            if (parentString !== null) {                                
                try {
                    const txid = await AddWhiteList(                        
                        parentString,
                        this.state.icoWalletList.icoWallet, 
                        this.state.icoWalletList.ownerWallet,
                        this.state.whitelist,
                    );
                    this.setState({
                        visibleSuccessModal: true,
                        resultTxid: txid,
                    })
                    this._changeUserKycStatus(this.state.userlist, KYC_STATUS.PENDING);
                } catch(err) {   
                    console.log(err)                 
                    this.setState({
                        visibleErrorModal: true,
                    })
                }
            } else {
                this.setState({
                    visibleErrorModal: true,
                })
            }            
        } else {
            this.setState({
                visibleErrorModal: true,
            })
        }
        this.props.HideDefaultSpinner();
    }

    _IsEnableControl = () => {
        setTimeout(() => {
            if (this.state.temp_string !== null && this.state.tempkey !== null && this.state.icoWalletList !== null
                && this.state.whitelist !== null && this.state.whitelist !== "" && this.state.whitelist.length !== 0
                && this.state.userlist !== null && this.state.userlist !== "" && this.state.userlist.length !== 0) {
                this.setState({
                    isEnableControl: true,
                })
            } else {
                this.setState({
                    isEnableControl: false,
                })
            }            
        }, );
    }

    _handleOnOpenIcoControlModal = () => {
        this.setState({
            visibleIcoControlModal: true,
        })
    }

    _handleCloseIcoControlModal = () => {
        this.setState({
            visibleIcoControlModal: false,
        })
    }

    _handleCloseErrorModal = () => {
        this.setState({
            visibleErrorModal: false,
        })
    }

    _handleCloseSuccessModal = () => {
        this.setState({
            visibleSuccessModal: false,
        })
    }

    _handleClickChangeToCompleted = () => {
        this._changeUserKycStatus(this.state.userlistToCompleted, KYC_STATUS.COMPLETED);
    }

    _changeUserKycStatus = (userlist, kycStatus) => {
        this.props.ShowDefaultSpinner();
        // event.preventDefault();       
        fetch(`/users/kyc_status/`, {
            method: "PUT",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                userlist: userlist,
                kyc_status: kycStatus,           
            })
        })
        .then( response => {
            if (response.status === 401){
                this.props.Logout();
                this.setState({
                    visibleErrorModal: true,
                })
                this.props.HideDefaultSpinner();
            } else {
                return response.json();
            }
        })
        .then( json => {                
            if (json.status === '1') {
                this._fetchKycList();   
            } else {
                this.setState({
                    visibleErrorModal: true,
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