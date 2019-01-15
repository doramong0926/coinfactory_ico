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
import StartStopIco from "./../StartStopIco"
import IcoWalletBalance from "./../IcoWalletBalance"
import ReturnTokenToOwner from "./../ReturnTokenToOwner"
import RegisterWhitelist from "./../RegisterWhitelist"
import IsWhitelist from "./../IsWhitelist"
import ExchageRate from "./../ExchageRate"

const IcoInfo = (props, context) => {
    return(            
        <React.Fragment>
            <Segment basic vertical className={styles.RootSegment} >
                <div className={styles.TitleDivision}>
                    <p className={styles.HeaderText}>IcoInfo</p>                    
                </div>
                <Segment className={styles.BodySegment} >
                    <p className={styles.TitleText}>Wallet address</p>
                    {
                        props.icoWalletList === null ? null :
                        <IcoWalletBalance />
                    }
                </Segment>
                <ExchageRate 
                    tempkey={props.tempkey}
                    temp_string={props.temp_string}
                />
                <IsWhitelist />
                <RegisterWhitelist 
                    tempkey={props.tempkey}
                    temp_string={props.temp_string}
                />
                <StartStopIco 
                    tempkey={props.tempkey}
                    temp_string={props.temp_string}
                    isIcoStarted={props.isIcoStarted}
                />
                <ReturnTokenToOwner
                    tempkey={props.tempkey}
                    temp_string={props.temp_string}
                />
                <Segment className={styles.BodySegment} >
                    <p className={styles.TitleText}>Register tempkey</p>
                    <Form size='small' onSubmit={props.handleOnSubmitTempkey}>
                        <div>
                            <Input 
                                type='text' 
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
                </Segment>
            </Segment>
        </React.Fragment>
    )
}

IcoInfo.propTypes = {    
    icoWalletList: PropTypes.object,
    tempkeyInputValue: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    isEnableSubmitTempkey: PropTypes.bool.isRequired,
    handleOnSubmitTempkey: PropTypes.func.isRequired,
    handleRemoveTempkey: PropTypes.func.isRequired,
    tempkey: PropTypes.string,
    temp_string: PropTypes.string,
    isIcoStarted: PropTypes.bool,
}

IcoInfo.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default IcoInfo;