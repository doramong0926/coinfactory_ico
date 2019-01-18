import React from "react";
import {
    Segment,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import KycCount from "./../KycCount"
import CurrentRound from "./../CurrentRound"
import IcoFund from "./../IcoFund"
import IcoTransactionList from "./../IcoTransactionList"
import InternalIcoTransactionList from "./../InternalIcoTransactionList"

const DashBoard = (props, context) => {
    return(            
        <React.Fragment>
            <Segment basic vertical className={styles.RootSegment} >
                <div className={styles.BodyDivision}>
                    <KycCount />
                    <CurrentRound />        
                    <IcoFund />            
                    {
                        props.icoWalletList === null ? null : <IcoTransactionList />
                    }  
                    {
                        props.icoWalletList === null ? null : <InternalIcoTransactionList />
                    }                     
                </div>
            </Segment>
        </React.Fragment>
    )
}

DashBoard.contextTypes = {
    t: PropTypes.func.isRequired
};

export default DashBoard;