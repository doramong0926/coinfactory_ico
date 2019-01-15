import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { 
    Header,
    Segment,
    Grid,
    Button,
    Icon,
    Responsive,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import FundingProgressBar from "./../FundingProgressBar";
import CountDown from "./../CountDown";
import styles from "./styles.module.scss";
import SocialIcons from "./../SocialIcons";

const HomeHeading = (props, context) => (
    <Segment className={styles.HomeHeading} vertical>
        < Grid container stackable verticalAlign='middle'>
            <Grid.Row className={styles.Row}>
                <Grid.Column className={styles.LeftColumn}>
                    <Header as='h2' className={styles.LeftColumnHeader}>
                        Make New Equity Blockchain for Your Emotion
                    </Header>
                    <p className={styles.LeftColumnDescription}>
                        Most Trending, Clean and Elegant Design<br/>
                        Based on Deeply Travel Research Coin
                    </p>
                    <div>
                        {props.isLoggedIn === true ?
                            <Button 
                                size='big' 
                                color='blue' 
                                className={styles.LeftColumnButton}
                                as={Link}
                                to={"/kyc"}
                            >
                                REGISTER KYC
                            </Button>
                            :   
                            <Button 
                                size='big' 
                                color='blue' 
                                className={styles.LeftColumnButton}
                                as={Link}
                                to={"/auth"}
                            >
                                SIGN UP TO JOIN
                            </Button>
                        }
                        
                        <Button size='big' color='blue' className={styles.LeftColumnButton}>TOKEN DISTRIBUTION</Button>
                    </div>
                    <br/>
                    <div className={styles.SocialIcon}>
                        <span className={styles.TelegramButton}>
                            <Icon 
                                fitted 
                                name='telegram plane' 
                                size='big' 
                                className={styles.TelegramButtonIcon} 
                                onClick={props.handleOnClickTelegram}
                            />
                            <span 
                                className={styles.TelegramButtonText}
                                onClick={props.handleOnClickTelegram}
                            >
                                Join us on Telegram
                            </span>
                        </span>
                        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                            <br />
                        </Responsive>
                        <span className={styles.SocialEtcIcon}>
                            <SocialIcons facebook twitter instagram/>
                        </span> 
                    </div>
                </Grid.Column>
                <Grid.Column className={styles.RightColumn}>
                    <Segment className={styles.RightColumnBox}>
                        <div style={{padding:"10px 0"}}>                            
                            <CountDown date={props.countdownDate} color={"white"} />
                            <FundingProgressBar {...props}/>
                            <Button 
                                size='big' color='green' 
                                className={styles.RightColumnBoxButton}
                                as={Link}
                                to={"/buytoken"}
                            >
                                REGISTER & BUY TOKEN NOW
                            </Button>
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
)

HomeHeading.propTypes = {
    mobile: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    handleOnClickTelegram: PropTypes.func.isRequired,
}

HomeHeading.contextTypes = {
    t: PropTypes.func.isRequired
};

export default HomeHeading;