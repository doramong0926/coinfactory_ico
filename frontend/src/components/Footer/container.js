import React, { Component } from "react";
import PropTypes from "prop-types";
import Footer from "./presenter";

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subscribeText: "",
            visibleModal: false,
            subscribeResult: false,
            isShowDivider: false,
        }
    }

    static propTypes = {
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.pathname === "/") {
            this.setState({
                isShowDivider: true,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pathname !== nextProps.pathname) {
            if (nextProps.pathname !== "/") {
                this.setState({
                    isShowDivider: false,
                })
            } else {
                this.setState({
                    isShowDivider: true,
                })
            }
        }
    }
    
    render() {
        return (
            <Footer 
                handleInputChange={this._handleInputChange}
                subscribeText={this.state.subscribeText}
                handleOnClickSubscribe={this._handleOnClickSubscribe}
                visibleModal={this.state.visibleModal}
                handleCloseModal={this._handleCloseModal}
                subscribeResult={this.state.subscribeResult}
                isShowDivider={this.state.isShowDivider}
            />
        );
    }

    _handleCloseModal = () => {
        this.setState({
            visibleModal: false,
        })
    }

    _handleInputChange = (event, action) => {
        const { target : { value, name } } = event;
        console.log(event)
        this.setState({
            [name]: value,
        })
    }

    _handleOnClickSubscribe = () => {
        this.props.ShowDefaultSpinner()
        fetch('icoInfos/subscribe_list/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email: this.state.subscribeText,      
            })
        })
        .then(response => response.json())
        .then( json => {
            if (json.status === '1') {
                this.setState({
                    subscribeResult: true,
                })
            } else {
                this.setState({
                    subscribeResult: false,
                })
            }      
            setTimeout(() => {
                this.setState({
                    visibleModal: true,
                })
            }, );
            this.props.HideDefaultSpinner();
        })
        .catch (
            err => {
                console.log(err);
                this.props.HideDefaultSpinner();
            }
        )
    }
}

export default Container;