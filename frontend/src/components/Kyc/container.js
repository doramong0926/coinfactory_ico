import React, { Component } from "react";
import PropTypes from "prop-types";
import Kyc from "./presenter";
import { FETCH_TYPE, BACKGROUND_IMAGE_TYPE } from "./../../config/constants"
import "isomorphic-fetch";

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isLoading: false,
            isEnableSubmit: false,
            emailAddress: '',
            visibleModal: false,
            isSendSuccess: false,
        }
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        username: PropTypes.string,
        kyc: PropTypes.object,
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        SaveBackgroundImage: PropTypes.func.isRequired,
        Logout: PropTypes.func.isRequired,
        DeleteJwt: PropTypes.func.isRequired,
        DeleteUsername: PropTypes.func.isRequired,
        DeleteEmail: PropTypes.func.isRequired,
        SaveKyc: PropTypes.func.isRequired,
    }

    componentDidMount() {
        if (this.props.isLoggedIn && this.props.username && this.props.kyc === null) {
            this._FetchKyc(FETCH_TYPE.LOADING);
        }
        this.props.SaveBackgroundImage(BACKGROUND_IMAGE_TYPE.KYC)
    }

    componentWillReceiveProps(nextProps) {      
        if (this.props.isLoggedIn === false && nextProps.isLoggedIn === true) {
            this._FetchKyc(FETCH_TYPE.REFRESH);
        }
    }

    render() {
        return (
            <Kyc 
                kyc={this.props.kyc} 
                isLoading={this.state.isLoading} 
                FetchKyc={this._FetchKyc} 
            />
        )
    }    

    _DeleteUserInfo = () => { 
        this.props.DeleteJwt();
        this.props.DeleteUsername();
        this.props.DeleteEmail();
        this.props.SaveKyc(null);
        this.props.SaveProfile(null);
        this.props.Logout();
    }

    _FetchKyc = (type) => {
        return new Promise((resolve, reject) => {
            if (type === FETCH_TYPE.LOADING) {
                this.setState({
                    isLoading: true,
                })
                this.props.ShowDefaultSpinner();
            }        
            fetch(`users/${this.props.username}/kyc/`, {
                method: "GET",
                headers: {
                    "Authorization": `JWT ${this.props.token}`
                },
            })
            .then( response => {
                if (response.status === 401){
                    this._DeleteUserInfo();
                    this.props.HideDefaultSpinner();
                    reject(response.status);
                } else {
                    return response.json();
                }
            })
            .then( json => {
                if (json.status === '1') {
                    this.props.SaveKyc(json.result);
                } else {
                    this.props.SaveKyc(null);
                }
                if (type === FETCH_TYPE.LOADING) {
                    this.setState({
                        isLoading: false,
                    });
                    this.props.HideDefaultSpinner();
                }
                resolve(json.status);
            })
            .catch (err => {
                    console.log(err);
                    this.props.HideDefaultSpinner();
                    reject(err);
            })
        })
    }
}

export default Container;