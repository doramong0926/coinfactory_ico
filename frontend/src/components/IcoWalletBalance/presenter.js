import React from "react";
import {
    Segment,
    Loader,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { NETWORK, NETWORK_TYPE } from "./../../config/constants";

const IcoWalletBalance = (props, context) => {
    return(            
        <React.Fragment>
            <Segment basic className={styles.BodySegment} >
                {
                    props.icoWalletList === null ? null :
                    <React.Fragment>
                        <Balance 
                            walletType={"Ico"}
                            address={props.icoWalletList.icoWallet}
                            ethBalance={props.icoBalanceEth}
                            blcBalance={props.icoBalanceBlc}
                        />
                        <Balance 
                            walletType={"Contract"}
                            address={props.icoWalletList.contractWallet}
                            ethBalance={props.contractBalanceEth}
                            blcBalance={props.contractBalanceBlc}
                        />
                        <Balance 
                            walletType={"Owner"}
                            address={props.icoWalletList.ownerWallet}
                            ethBalance={props.ownerBalanceEth}
                            blcBalance={props.ownerBalanceBlc}
                        />
                    </React.Fragment>
                }
            </Segment>
        </React.Fragment>
    )
}

const Balance = (props, context) => {
    return (
        <div>
            {
                NETWORK === NETWORK_TYPE.ROPSTEN ? 
                (
                    <React.Fragment>
                        <span>{props.walletType} : </span>
                        <a 
                            href={`https://ropsten.etherscan.io/address/${props.address}`} 
                            target="_blank" 
                            className={styles.WalletAddr}
                            rel="noopener noreferrer"
                        >
                            {`${props.address}`}
                        </a>
                    </React.Fragment>
                ) :
                (
                    <React.Fragment>
                        <span>{props.walletType} : </span>
                        <a 
                            href={`https://etherscan.io/address/${props.address}`} 
                            target="_blank" 
                            className={styles.WalletAddr}
                            rel="noopener noreferrer"
                        >
                            {`${props.address}`}
                        </a>
                    </React.Fragment>
                )
            }
            <div className={styles.BalanceDiv}>
                {
                    props.ethBalance === null 
                    ? (
                        <React.Fragment>
                            <p className={styles.Balance}>Eth : </p>
                            <Loader size="mini" active inline />
                        </React.Fragment>                                        
                    )
                    : (
                        <p className={styles.Balance}>{`Eth : ${props.ethBalance.toFixed(4)}`}</p>
                    )
                }
                {
                    props.blcBalance === null 
                    ? (
                        <React.Fragment>
                            <p className={styles.Balance}>Blc : </p>
                            <Loader size="mini" active inline />
                        </React.Fragment>     
                    )
                    : (
                        <p className={styles.Balance}>{`Blc : ${props.blcBalance.toFixed(4)}`}</p>
                    )
                }
            </div>                           
        </div>
    )
}

IcoWalletBalance.propTypes = {    
    icoWalletList: PropTypes.object,
    icoBalanceEth: PropTypes.number,
    icoBalanceBlc: PropTypes.number,
    contractBalanceEth: PropTypes.number,
    contractBalanceBlc: PropTypes.number,
    ownerBalanceEth: PropTypes.number,
    ownerBalanceBlc: PropTypes.number,
}

IcoWalletBalance.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default IcoWalletBalance;