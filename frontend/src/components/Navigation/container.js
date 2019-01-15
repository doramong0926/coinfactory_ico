import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Navigation from "./presenter";
import { WHITEPAPER } from "./../../config/constants"

class Container extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            visible: false,
            visibleErrorModal: false,
            visibleLogoutConfirmModal: false,
            fixedMenu: false,
            whitepaperList: null,
            whitepaper: null,
            calculations: {
                direction: 'none',
                height: 0,
                width: 0,
                topPassed: false,
                bottomPassed: false,
                pixelsPassed: 0,
                percentagePassed: 0,
                topVisible: false,
                bottomVisible: false,
                fits: false,
                passing: false,
                onScreen: false,
                offScreen: false,
            },
        };    
    }    
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired,
        whitepaper: PropTypes.array,
        setLanguage: PropTypes.func.isRequired,
        SaveHomeLocation: PropTypes.func.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {                
        if (this.props.whitepaper !== null) {
            this.setState({
                whitepaperList: this.props.whitepaper,
            })
            setTimeout(() => {
                this.getWhitepaperPath();
            }, );
        }
        if (this.props.lang !== null) {
            this.setState({
                lang: this.props.lang,
            })
            setTimeout(() => {
                this.getWhitepaperPath();
            }, );
        }
    }

    componentWillReceiveProps(nextProps) {     
        if (this.props.whitepaper === null && nextProps.whitepaper !== null) {
            this.setState({
                whitepaperList: nextProps.whitepaper,
            })
            setTimeout(() => {
                this.getWhitepaperPath();
            }, );
        }

        if (this.props.lang === null && nextProps.lang !== null) {
            this.setState({
                lang: nextProps.lang,
            })
            setTimeout(() => {
                this.getWhitepaperPath();
            }, );
        }

        if (this.props.lang !== null) {
            if (this.props.lang !== nextProps.lang)
            this.setState({
                lang: nextProps.lang,
            })
            setTimeout(() => {
                this.getWhitepaperPath();
            }, );
        }
    }
    

    render() {
        return (
            <Navigation 
                visible={this.state.visible}
                handleOnClickMenuItem={this._handleOnClickMenuItem}
                visibleErrorModal = {this.state.visibleErrorModal}
                handleCloseErrorModal = {this._handleCloseErrorModal}
                visibleLogoutConfirmModal = {this.state.visibleLogoutConfirmModal}
                handleCloseLogoutModal = {this._handleCloseLogoutModal}
                handleLogoutConfirm = {this._handleLogoutConfirm}
                children = {this.props.children}
                fixedMenu = {this.state.fixedMenu}
                pathname = {this.props.pathname}
                isLoggedIn={this.props.isLoggedIn}
                lang={this.props.lang}
                whitepaper={this.state.whitepaper}
                handlePusher={this._handlePusher}
                handleToggle={this._handleToggle}
                handleVisibilityUpdate={this._handleVisibilityUpdate}
            />
        );
    }

    getWhitepaperPath = () => {
        if (this.state.whitepaperList !== null && this.state.lang !== null) {
            const path = _.find(this.state.whitepaperList, t=>{
                if (this.state.lang === 'ko') {
                    return t.language === 'kor'
                } else {
                    return t.language === 'eng'
                }                    
            }).file_path
            this.setState({
                whitepaper: path,
            })
        }
    }

    _handleVisibilityUpdate = (e, { calculations }) => {     
        this.setState({ 
            calculations: calculations 
        })
        if (calculations.topVisible === true) {
            this.setState({ 
                fixedMenu: false,
            })
        } 
        else if (calculations.direction === 'down') {
            this.setState({ 
                fixedMenu: false,
            })
        } else if (calculations.direction === 'up') {
            this.setState({ 
                fixedMenu: true, 
            })
        }
    }

    _handleCloseErrorModal = () => {
        this.setState({
            visibleErrorModal: false,
        })
    }

    _handlePusher = () => {
        if (this.state.visible) {
            this.setState({ 
                visible: false 
            });
        };
    }

    _handleToggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    _handleOnClickMenuItem = (key) => {    
        switch (key) {
            case 'home':
            case 'whatis':
            case 'tokensale':
            case 'roadmap': 
            case 'team': 
            case 'partner': 
            case 'contact': 
                this.props.SaveHomeLocation(key);                
                break;

            case 'buytoken':
            case 'kyc':
            case 'profile':
                if (this.props.isLoggedIn === false) {
                    this.setState({
                        visibleErrorModal: true,
                    })
                }
                this.props.SaveHomeLocation(null);                
                break;

            case 'logout':
                this.setState({
                    visibleLogoutConfirmModal: true,
                })
                this.props.SaveHomeLocation(null);                
                break;

            case 'whitepaper':
                // this._fetchWhitePaper();
                if (this.state.lang === "ko") {
                    window.open(WHITEPAPER.KOR, '_blank');
                } else {
                    window.open(WHITEPAPER.ENG, '_blank');
                }                
                break;

            default : 
                this.props.SaveHomeLocation(null);                
                break;
        }
        this.setState({
            visible: false,
        })
    }

    _handleCloseLogoutModal = () => {
        this.setState({
            visibleLogoutConfirmModal: false,
        })
    }

    _handleLogoutConfirm = () => {
        this.setState({
            visibleLogoutConfirmModal: false,
        })
        this.props.DeleteJwt();
        this.props.DeleteUsername();
        this.props.DeleteEmail();
        this.props.SaveKyc(null);
        this.props.SaveProfile(null);
        this.props.Logout();
    }

    /*
    _fetchWhitePaper = () => {
        fetch(this.state.whitepaper, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .catch (
            err => {
                console.log(err);
            }
        )
    }
    */
}

export default Container;