import React from "react";
import ReactSVG from 'react-svg'
import { Link } from "react-router-dom";
import {
    Grid,
    Segment,
    List,
    Button,
    Header,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";
import CountDown from "./../CountDown";
import RoundProgressBar from "./../RoundProgressBar";
import './svgStyle.css';
import { ROUND_TYPE, ROUND_STRING } from "./../../config/constants"


const TokenSale = (props, context) => {
    return(            
        <div ref={props.myRef} >
            <Segment basic vertical className={styles.TokenSaleContainer}>
                <PageHeader 
                    backgroundImage={false}
                    backgroundTitle="TOKEN"
                    title="TOKEN SALE"
                    description="BLUECOTS Token will be released on the basis of Ethereum and Bitcoin platform. It's compatibility of the token with third-party services (wallets, exchanges etc.) and provides easy-to-use integration."
                />
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.Row}>
                        <Grid.Column className={styles.TextColumn1}>
                            <List animated bulleted className={styles.TextColumnDescriptionList}>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <Header size='tiny'>Start</Header>
                                    <span>{props.icoStart}</span>
                                </List.Item>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <Header size='tiny'>End</Header>
                                    <span>{props.icoEnd}</span>
                                </List.Item>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <Header size='tiny'>Acceptable currencies</Header>
                                    <span>ETH</span>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column className={styles.TextColumn2}>
                            <List animated bulleted className={styles.TextColumnDescriptionList}>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <Header size='tiny'>Number of tokens for sale</Header>
                                    <span>{`${props.totalSupply} BLC (${props.totalSupplyRatio}%)`}</span>
                                </List.Item>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <Header size='tiny'>Tokens exchange rate</Header>
                                    <span>{`1ETH = ${props.exchangeRate} BLC`}</span>
                                </List.Item>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <Header size='tiny'>Minimal transaction amount</Header>
                                    <span>{`${props.minimumEth} ETH`}</span>
                                </List.Item>
                            </List>
                        </Grid.Column>   
                        <Grid.Column className={styles.CountDownColumn}>
                            <Segment basic className={styles.CountDownColumnBox}>
                                    <CountDown date={`2108-12-24T00:00:00`} color={"black"} />
                                    <Button 
                                        className={styles.CountDownColumnBoxButton}
                                        as={Link}
                                        to={"/buytoken"}
                                    >
                                        JOIN & BUY TOKEN NOW
                                    </Button>                                    
                            </Segment>
                        </Grid.Column>         
                    </Grid.Row>
                    {
                        props.roundList !== null
                        ? _renderRoundSupplyBar(props.roundList)
                        : null
                    }
                    <Grid.Row className={styles.Row}>
                        <Grid.Column className={styles.Diagram1}>
                            <Header size="large" className={styles.DiagramTitle}>Distribution of tokens</Header>
                            <ReactSVG 
                                src={require("images/diagram01.svg")} 
                                svgClassName='DiagramImage'
                                className={styles.DiagramImage} 
                            />                            
                        </Grid.Column>
                        <Grid.Column className={styles.Diagram2}>
                            <Header size="large" className={styles.DiagramTitle}>Use of proceeds</Header>
                            <ReactSVG 
                                src={require("images/diagram01.svg")} 
                                svgClassName='DiagramImage'
                                className={styles.DiagramImage} 
                            /> 
                        </Grid.Column>         
                    </Grid.Row>
                </Grid>       
                           
            </Segment>             
        </div>
    )
}

const _renderRoundSupplyBar = (roundList) => {
    return (        
        <React.Fragment>
            {
                roundList.map(t => {                    
                    if (t.round_type === ROUND_TYPE.PRESALE 
                        || t.round_type === ROUND_TYPE.ROUND_A
                        || t.round_type === ROUND_TYPE.ROUND_B
                        || t.round_type === ROUND_TYPE.ROUND_C
                    ) {
                        return (                        
                            <Grid.Row key={t.round_type} className={styles.ProgressBarRow}>
                                <Grid.Column className={styles.ProgressBarLeftColumn}>
                                    <Segment basic className={styles.LeftColumnBox}>
                                        <Header>{`${getRoundString(t.round_type)}`}</Header>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column className={styles.ProgressBarRightColumn}>
                                    <RoundProgressBar roundType={t.round_type} />
                                </Grid.Column>
                            </Grid.Row>
                        )
                    } else {
                        return null;
                    }
                })
            }
        </React.Fragment>
    )
}

const getRoundString = (round_type) => {
    switch(round_type) {
        case ROUND_TYPE.PRESALE:
            return ROUND_STRING.PRESALE;
        case ROUND_TYPE.ROUND_A:
            return ROUND_STRING.ROUND_A;
        case ROUND_TYPE.ROUND_B:
            return ROUND_STRING.ROUND_B;
        case ROUND_TYPE.ROUND_C:
            return ROUND_STRING.ROUND_C;
        default :
            return "";
    }
}

TokenSale.propTypes = {
    icoStart: PropTypes.string.isRequired,
    icoEnd: PropTypes.string.isRequired,
    totalSupply: PropTypes.string.isRequired,
    totalSupplyRatio: PropTypes.string.isRequired,
    minimumEth: PropTypes.string.isRequired,
    exchangeRate: PropTypes.string.isRequired,
    ethPrice: PropTypes.string.isRequired,
    roundList: PropTypes.array,
    myRef: PropTypes.object,
};

TokenSale.contextTypes = {
    t: PropTypes.func.isRequired
};

export default TokenSale;