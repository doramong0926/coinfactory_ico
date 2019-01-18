import React from "react";
import {
    Segment,
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
import KycListWithWhitelist from "./../KycListWithWhitelist"
import RegisterTempKey from "./../RegisterTempKey"

const IcoInfo = (props, context) => {
    return(            
        <React.Fragment>
            <Segment basic vertical className={styles.RootSegment} >
                {
                    props.icoWalletList === null 
                        ? null 
                        : (
                            <KycListWithWhitelist 
                                tempkey={props.tempkey}
                                temp_string={props.temp_string}
                            />
                        )
                }  
                <Segment className={styles.BodySegment} >
                    <p className={styles.TitleText}>Wallet address</p>
                    {
                        props.icoWalletList === null 
                        ? null
                        : <IcoWalletBalance />
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
                <RegisterTempKey 
                    tempkey={props.tempkey}
                    saveTempString={props.saveTempString}
                    fetchTempString={props.fetchTempString}
                    is_superuser={props.is_superuser}
                    is_staff={props.is_staff}
                />
            </Segment>            
        </React.Fragment>
    )
}

IcoInfo.propTypes = {    
    icoWalletList: PropTypes.object,
    tempkey: PropTypes.string,
    temp_string: PropTypes.string,
    saveTempString: PropTypes.func.isRequired,
    isIcoStarted: PropTypes.bool,
    fetchTempString: PropTypes.func.isRequired,
    is_superuser: PropTypes.bool.isRequired,
    is_staff: PropTypes.bool.isRequired,
}

IcoInfo.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default IcoInfo;