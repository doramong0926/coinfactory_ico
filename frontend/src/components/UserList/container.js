import React, { Component } from "react";
import PropTypes from "prop-types";
import UserList from "./presenter";
import _ from "lodash";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            user_list: null,            
            column: null,
            direction: null,
            isLoading: true,
            icoWalletList: null,   
            filterString: null,
            visibleUserInfoModal: false,
            userInfomation: null,
            visibleConfirmModal: false,
            newKycInfo: null,
            visibleSuccessModal: false,
            visibleErrorModal: false,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        icoWalletList: PropTypes.object.isRequired,
        pathname: PropTypes.string,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        Logout: PropTypes.func.isRequired,
        DeleteJwt: PropTypes.func.isRequired,
        DeleteUsername: PropTypes.func.isRequired,
        DeleteEmail: PropTypes.func.isRequired,
        SaveKyc: PropTypes.func.isRequired,
    }

    componentDidMount () {
        if (this.props.icoWalletList !== undefined && this.props.icoWalletList !== null) {
            this.setState({
                icoWalletList: this.props.icoWalletList,
            })
            setTimeout(() => {
                this._fetchUserList(); 
            }, );
        }    
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null && nextProps.icoWalletList !== undefined) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })   
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/userinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
            }
        }
    }

    render() {
        return (
            <UserList 
                user_list={this.state.user_list}
                handleSort={this._handleSort}
                column={this.state.column}
                direction={this.state.direction}
                refresh={this._fetchUserList}
                isLoading={this.state.isLoading}
                filterString={this.state.filterString}
                handleOnClickUser={this._handleOnClickUser}
                handleInputChange={this._handleInputChange}
                handleProcessDoneModal={this._handleProcessDoneModal}
                handleCloseModal={this._handleCloseModal}
                visibleUserInfoModal={this.state.visibleUserInfoModal}
                icoWalletList={this.state.icoWalletList}
                userInfomation={this.state.userInfomation}
                visibleConfirmModal={this.state.visibleConfirmModal}
                handleCloseConfirmModal={this._handleCloseConfirmModal}
                handleConfirm={this._handleConfirm}
                visibleSuccessModal={this.state.visibleSuccessModal}
                visibleErrorModal={this.state.visibleErrorModal}
                handleCloseErrorModal={this._handleCloseErrorModal}
                handleCloseSuccessModal={this._handleCloseSuccessModal}
            />
        )
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
    
    _handleCloseConfirmModal = () => {
        this.setState({
            visibleConfirmModal: false,
            newKycInfo: null,
       }) 
    }

    _handleCloseModal = () => {
        this.setState({
            visibleUserInfoModal: false,
       }) 
    }

    _handleConfirm = () => {        
        this._changeUserKycStatus(this.state.newKycInfo.username, this.state.newKycInfo.kycStatus, this.state.newKycInfo.rejectReason);
        this.setState({
            visibleConfirmModal: false,
            newKycInfo: null,
        }) 
    }

    _handleProcessDoneModal = (username, kycStatus, rejectReason) => {   
        const newKycInfo = {
            username: [username],
            kycStatus: kycStatus,
            rejectReason: rejectReason,
        }
        this.setState({
            visibleConfirmModal: true,
            newKycInfo: newKycInfo,
        })
    }

    _handleInputChange = (event) => {        
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        })
    }

    _handleOnClickUser = (username) => {
        const found_userInfomation = _.find(this.state.user_list, (t) => {
            return (t.username === username)
        })
        this.setState({
            userInfomation: found_userInfomation,
        })
        setTimeout(() => {
           this.setState({
                visibleUserInfoModal: true,
           }) 
        },);
    }

    _handleSort = clickedColumn => () => {
        if (this.state.column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                user_list: _.sortBy(this.state.user_list, [clickedColumn]),
                direction: 'ascending',
            })    
            return;
        }
    
        this.setState({
            user_list: this.state.user_list.reverse(),
            direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    _fetchUserList = () => {
        this.setState({
            isLoading: true,
        })
        fetch('/users/user_list/', {
            method: "GET",
            headers: {
                "Authorization": `JWT ${this.props.token}`,
            },
        })
        .then( response => {
            if (response.status === 401){
                this._DeleteUserInfo();
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
                    user_list: json.result,
                })
            } else {
                console.log("fail to get user list")
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

    _changeUserKycStatus = (userlist, kycStatus, rejectReason) => {
        this.setState({
            visibleSuccessModal: false,
            visibleErrorModal: false,
        })
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
                kyc_reject_reason: rejectReason
            })
        })
        .then(response => response.json())
        .then( json => {                
            if (json.status === '1') {
                this.setState({
                    visibleSuccessModal: true,
                })
                this._fetchUserList(); 
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
                this.setState({
                    visibleErrorModal: true,
                })
            }
        )        
    }
}

export default Container;