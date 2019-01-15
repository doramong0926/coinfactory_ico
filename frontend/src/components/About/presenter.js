import React from "react";
import {
    Grid,
    Image,
    Segment,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import VideoModal from "./../VideoModal";

const About = (props, context) => {
    return(            
        <div ref={props.myRef} >
            <Segment className={styles.AboutContainer} vertical>
                < Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.Row}>
                        <Grid.Column className={styles.ImageColumn}>
                            <Segment basic className={styles.ImageColumnBox}>
                                <Image size="huge" src={require('images/about-img-01.png')} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column className={styles.TextColumn}>
                            <p className={styles.TextColumnHeader}>
                                We've built a platform to buy and sell shares for Booking Sevice.
                            </p>
                            <p className={styles.TextColumnSubHeader}>
                                We're reinventing the global equity blockchain - that is secure, smart and easy-to-use platform, and copletely disrupting the way businesses raise capital and the way investors buy and sell shares.
                            </p>
                            <br/>
                            <Segment basic className={styles.PlayerButton} onClick={props.handleOpen}>
                                <Image floated='left' className={styles.PlayerButtonImage} 
                                    src={require('images/icons/play_263x263.png')}
                                />
                                <p className={styles.PlayerButtonText1}>Watch Video</p>
                                <p className={styles.PlayerButtonText2}>Watch and how it work</p>   
                            </Segment>
                        </Grid.Column>                    
                    </Grid.Row>
                </Grid>
                <div className={styles.EmptyBox}></div>
                < Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.Row}>
                        {_renderTextBox('top')}
                        <Grid.Column className={styles.ImageColumn}>
                            <Segment basic className={styles.ImageColumnBox}>
                                <Image size="huge" src={require('images/about-img-02.png')} />
                            </Segment>
                        </Grid.Column>
                        {_renderTextBox('bottom')}
                    </Grid.Row>
                </Grid>
            </Segment>
            <VideoModal 
                visible = {props.visible}
                handleClose = {props.handleClose}
                size={props.size} 
                active={props.active}
                channel={props.channel}
                videoId={props.videoId}
            />
        </div>
    )
}

const _renderTextBox = (position) => {
    return (
        <Grid.Column className={position === 'top' ? styles.TextColumnTop : styles.TextColumnBottom}>
            <p className={styles.TextColumnHeader}>
                What is BLUECOTS?
            </p>
            <p className={styles.TextColumnSubHeader}>
                BLUECOTS is a platform for the future of funding that powering dat for the new equity blockchain.
            </p>
            <p className={styles.TextColumnDescription}>
                While existing solutions offer to solve just one problem at a time. our team is up to build a secure, usefule, & easy-to-use product based on private blockchain. It will include easy cryptocurrency payments integration. And a digital arbitration system.
            </p>
            <p className={styles.TextColumnDescription}>
                At the end, our aims to integrate all companies, employees, and business assets into a unified blockchain ecosyste, which will make business truly efficient, transparent, and reliable.
            </p>                
        </Grid.Column>  
    )
}

About.propTypes = {
    visible: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    channel: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    myRef: PropTypes.object,
};


About.contextTypes = {
    t: PropTypes.func.isRequired
};

export default About;