import React from "react";
import {
    Grid,
    Image,
    Segment,
    List,
    Icon,
    Button,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";

const Wallet = (props, context) => {
    return(            
        <React.Fragment>
            <Segment vertical className={styles.WalletContainer} >
                <PageHeader 
                    backgroundImage={true}
                    backgroundTitle="APPS"
                    title="THE BLUECOTS APP"
                    description="Once you've entered into our ecosystem, you can manage every thing. Anyone with a smartphone adn an internet connection can participate in global marketplace."
                />
                < Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.Row}>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.mobileImage1} size="huge" src={require('images/wallet_image.png')} />
                        </Grid.Column>
                        <Grid.Column className={styles.TextColumn}>                                  
                            <Image className={styles.walletLogoImage} size="huge" src={require('images/bluecots_wallet_logo.png')} />                 
                            <p className={styles.TextColumnDescription}>
                                Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc itation ullamco laboris nisi commodo consequat.
                            </p>
                            <List animated bulleted className={styles.TextColumnDescriptionList}>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <span>BLUECOTS-news curation</span>
                                </List.Item>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <span>Natural Language Understanding</span>
                                </List.Item>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <span>Wallet aggregation</span>
                                </List.Item>
                                <List.Item className={styles.TextColumnDescriptionListItem}>
                                    <span>No more expensive fees</span>
                                </List.Item>
                            </List>
                            <div className={styles.GetAppNow}>
                                <Button className={styles.GetAppNowButton}>Get the app now</Button>
                                <Icon 
                                    link 
                                    name='android' 
                                    size="large" 
                                    color='blue' 
                                    className={styles.GetAppNowIcon} 
                                    onClick={props.handleOnClickAndroid}    
                                />
                                <Icon 
                                    link 
                                    name='apple' 
                                    size="large" 
                                    color='grey' 
                                    className={styles.GetAppNowIcon} 
                                    onClick={props.handleOnClickIOS}    
                                />
                            </div>
                        </Grid.Column>                    
                    </Grid.Row>
                </Grid>
            </Segment>
        </React.Fragment>

    )
}

Wallet.propTypes = {
    handleOnClickAndroid: PropTypes.func.isRequired,
    handleOnClickIOS: PropTypes.func.isRequired,
}

Wallet.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Wallet;