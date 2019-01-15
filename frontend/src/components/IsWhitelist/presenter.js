import React from "react";
import {
    Segment,
    Button,
    Input,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const IsWhitelist = (props, context) => {
    return(            
        <Segment className={styles.BodySegment} >
            <p className={styles.TitleText}>IS WHITELIST?</p>
            <div>
                <Input 
                    fluid
                    type='text' 
                    placeholder='Address'
                    value={props.inputAddress !== null ? props.inputAddress : ""}
                    onChange={props.handleInputChange}
                    name='inputAddress'
                    className={styles.InputBox}
                />
            </div>
            <Button 
                className={styles.SubmitButton}
                disabled={!props.isEnableControl}
                onClick={props.handleOnIsWhitelist}
            >
                CHECK
            </Button>
            <div className={styles.ResultDiv}>
                <span>{props.address === null ? "0x" : props.address}</span>
                <span>{renderIsWhiteList(props.IsWhitelist)}</span>
            </div>
        </Segment>
    )
}

const renderIsWhiteList = (IsWhitelist) => {
    if (IsWhitelist === null) {
        return (
            " : "
        )
    } else if (IsWhitelist === true) {
        return (
            " : TRUE"
        )
    } else {
        return (
            " : FALSE"
        )
    }
}

IsWhitelist.propTypes = {    
    handleOnIsWhitelist: PropTypes.func.isRequired,
    isEnableControl: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputAddress: PropTypes.string,
    address: PropTypes.string,
    IsWhitelist: PropTypes.bool,
}

IsWhitelist.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default IsWhitelist;