import React from "react";
import {
    Segment,
    Loader,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const IcoWalletBalance = (props, context) => {
    return(            
        <React.Fragment>
            <Segment basic className={styles.BodySegment} >
                {
                    props.icoWalletList === null ? null :
                    <React.Fragment>
                        <div>
                            <p className={styles.WalletAddr}>{`Ico : ${props.icoWalletList.icoWallet}`}</p>
                            <div className={styles.BalanceDiv}>
                                {
                                    props.icoBalanceEth === null 
                                    ? (
                                        <React.Fragment>
                                            <p className={styles.Balance}>Eth : </p>
                                            <Loader size="mini" active inline />
                                        </React.Fragment>                                        
                                    )
                                    : (
                                        <p className={styles.Balance}>{`Eth : ${props.icoBalanceEth.toFixed(4)}`}</p>
                                    )
                                }
                                {
                                    props.icoBalanceBlc === null 
                                    ? (
                                        <React.Fragment>
                                            <p className={styles.Balance}>Blc : </p>
                                            <Loader size="mini" active inline />
                                        </React.Fragment>     
                                    )
                                    : (
                                        <p className={styles.Balance}>{`Blc : ${props.icoBalanceBlc.toFixed(4)}`}</p>
                                    )
                                }
                            </div>                           
                        </div>
                        <div>
                            <p className={styles.WalletAddr}>{`Contract : ${props.icoWalletList.contractWallet}`}</p>
                            <div className={styles.BalanceDiv}>
                                {
                                    props.contractBalanceEth === null 
                                    ? (
                                        <React.Fragment>
                                            <p className={styles.Balance}>Eth : </p>
                                            <Loader size="mini" active inline />
                                        </React.Fragment>                                        
                                    )
                                    : (
                                        <p className={styles.Balance}>{`Eth : ${props.contractBalanceEth.toFixed(4)}`}</p>
                                    )
                                }
                                {
                                    props.contractBalanceBlc === null 
                                    ? (
                                        <React.Fragment>
                                            <p className={styles.Balance}>Blc : </p>
                                            <Loader size="mini" active inline />
                                        </React.Fragment>     
                                    )
                                    : (
                                        <p className={styles.Balance}>{`Blc : ${props.contractBalanceBlc.toFixed(4)}`}</p>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <p className={styles.WalletAddr}>{`Owner : ${props.icoWalletList.ownerWallet}`}</p>
                            <div className={styles.BalanceDiv}>
                                {
                                    props.ownerBalanceEth === null 
                                    ? (
                                        <React.Fragment>
                                            <p className={styles.Balance}>Eth : </p>
                                            <Loader size="mini" active inline />
                                        </React.Fragment>                                        
                                    )
                                    : (
                                        <p className={styles.Balance}>{`Eth : ${props.ownerBalanceEth.toFixed(4)}`}</p>
                                    )
                                }
                                {
                                    props.ownerBalanceBlc === null 
                                    ? (
                                        <React.Fragment>
                                            <p className={styles.Balance}>Blc : </p>
                                            <Loader size="mini" active inline />
                                        </React.Fragment>     
                                    )
                                    : (
                                        <p className={styles.Balance}>{`Blc : ${props.ownerBalanceBlc.toFixed(4)}`}</p>
                                    )
                                }
                            </div>
                        </div>
                    </React.Fragment>
                }
            </Segment>
        </React.Fragment>
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