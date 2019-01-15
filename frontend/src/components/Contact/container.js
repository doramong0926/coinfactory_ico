import React, { Component } from "react";
import Contact from "./presenter";
import PropTypes from "prop-types";
import { SOCIAL_ADDRESS } from "./../../config/constants"

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
            email: "",
            message: "",
            isEnableSubmit: false,
            sendEmailResult: false,
            visibleModal: false,
        };    
        this.myRef = React.createRef()   // Create a ref object 
    }

    static propTypes = {
        ShowDefaultSpinner: PropTypes.func.isRequired,
        HideDefaultSpinner: PropTypes.func.isRequired,
        SaveRefContact: PropTypes.func.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.SaveRefContact(this.myRef);
    }

    render() {
        return (
            <Contact  
                name={this.state.name}
                email={this.state.email}
                message={this.state.message}
                handleOnSubmit={this._handleOnSubmit}
                isEnableSubmit={this.state.isEnableSubmit}
                handleInputChange={this._handleInputChange}
                visibleModal={this.state.visibleModal}
                handleCloseModal={this._handleCloseModal}
                sendEmailResult={this.state.sendEmailResult}
                handleOnClickTelegram={this._handleOnClickTelegram}
                myRef={this.myRef}
            />
        )
    }

    _handleOnClickTelegram = (e, data) => {       
        window.open(SOCIAL_ADDRESS.TELEGRAM, '_blank');
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

        setTimeout(() => {
            if (this.state.email !== "" && this.state.name !== "" && this.state.message !== ""
                && this.state.email !== null && this.state.name !== null && this.state.message !== null) {
                this.setState({
                    isEnableSubmit: true,
                })
            } else {
                this.setState({
                    isEnableSubmit: false,
                })
            }
        }, );
    }

    _handleOnSubmit = (event) => {
        const {name, email, message} = this.state;
        // event.preventDefault();
        this.props.ShowDefaultSpinner();
        fetch("icoInfos/send_email/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                name: name,
                email: email,               
                message: message,                
            })
        })
        .then(
            response => response.json()
        )
        .then(json => {            
            if (json.status === '1') {
                this.setState({
                    email: "",
                    name: "",
                    message: "",
                    isEnableSubmit: false,
                    sendEmailResult: true,
                })
            } else {
                this.setState({
                    sendEmailResult: false,
                })
            }      
            setTimeout(() => {
                this.setState({
                    visibleModal: true,
                })
            }, );
            this.props.HideDefaultSpinner()
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