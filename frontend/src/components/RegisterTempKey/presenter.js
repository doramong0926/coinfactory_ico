import React from "react";
import {
    Segment,
    Input,
    Button,
    Form,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import BasicModal from "./../BasicModal"

const errorModalContents = [
    {
        title: null,
        text: [
            "Fail to save key"
        ]
    },
];

const SuccessModalContents = [
    {
        title: null,
        text: [
            "Success to save Key."
        ]
    },
];

const RegisterTempKey = (props, context) => {
    return(            
        <Segment className={styles.BodySegment} >
            <p className={styles.TitleText}>Register tempkey</p>
            <Form size='small' onSubmit={props.handleOnSubmitTempkey}>
                <div>
                    <Input 
                        type='password' 
                        placeholder='TempKey'
                        value={props.tempkeyInputValue !== null ? props.tempkeyInputValue : ""}
                        onChange={props.handleInputChange}
                        name='tempkeyInputValue'
                        className={styles.InputBox}
                    />
                </div>
                <div>
                    <Input 
                        type='password' 
                        placeholder='password1'
                        value={props.password1 !== null ? props.password1 : ''}
                        onChange={props.handleInputChange}
                        name='password1'
                        className={styles.InputBox}
                    />
                </div>
                <div>
                    <Input 
                        type='password' 
                        placeholder='password2'
                        value={props.password2 !== null ? props.password2 : ''}
                        onChange={props.handleInputChange}
                        name='password2'
                        className={styles.InputBox}
                    />
                </div>
                <Button 
                    fluid
                    type='submit'
                    disabled={!props.isEnableSubmitTempkey}
                    className={styles.SubmitButton}
                >
                    Submit
                </Button>
            </Form>
            <Button 
                fluid
                className={styles.SubmitButton}
                onClick={props.handleRemoveTempkey}
            >
                Clear Tempkey
            </Button>
            <BasicModal 
                visible = {props.visibleModal}
                handleClose = {props.handleCloseModal}
                size={"mini"} 
                title={"REQUESTED RESULT"}
                contents={props.saveResult === true ? SuccessModalContents : errorModalContents}
            />
        </Segment>
    )
}

RegisterTempKey.propTypes = {    
    tempkeyInputValue: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    isEnableSubmitTempkey: PropTypes.bool.isRequired,
    handleOnSubmitTempkey: PropTypes.func.isRequired,
    handleRemoveTempkey: PropTypes.func.isRequired,
    visibleModal: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    saveResult: PropTypes.bool.isRequired,
}

RegisterTempKey.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default RegisterTempKey;