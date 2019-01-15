import React from "react";
import {
    Grid,
    Image,
    Segment,
    Card,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";
import { NEWS_IMAGE_PATH, NEWS_LINK } from "./../../config/constants"

const NewsCard = [
    {    
        "image" : NEWS_IMAGE_PATH.NEWS_1,
        "date" : "12 MAR, 2018",
        "header" : "The intersection Where Blockchain Meets Energy",
        "description" : "Blockchain Meets Energy Surplus of electrical energy is sometimes ut perspiciatis unde omnis iste natus...",
        "link" : NEWS_LINK.NEWS_1,
    },
    {    
        "image" : NEWS_IMAGE_PATH.NEWS_2,
        "date" : "26 FEB, 2018",
        "header" : "Pros & Cons of Premined Cryptocurrencies",
        "description" : "Blockchain Meets Energy Surplus of electrical energy is sometimes ut perspiciatis unde omnis iste natus...",
        "link" : NEWS_LINK.NEWS_2,
    },
    {    
        "image" : NEWS_IMAGE_PATH.NEWS_3,
        "date" : "18 FEB, 2018",
        "header" : "HOW & Where To Market Your ICO Startup Business",
        "description" : "Blockchain Meets Energy Surplus of electrical energy is sometimes ut perspiciatis unde omnis iste natus...",
        "link" : NEWS_LINK.NEWS_3,
    },
]

const News = (props, context) => {
    return(            
        <React.Fragment>
            <Segment vertical className={styles.NewsContainer} >
                <PageHeader 
                    backgroundImage={false}
                    backgroundTitle="NEWS"
                    title="BLUECOTS NEWS"
                />
                < Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.Row}>
                        <NewCards {...props} />
                    </Grid.Row>
                </Grid>
            </Segment>
        </React.Fragment>
    )
}

const NewCards = (props, context) => {
    return (
        NewsCard.map((t, index) => {
            return (
                <Grid.Column 
                    className={styles.CardColumn} 
                    key={index}     
                    onClick={
                        () => props.handleOnClick(t.link)
                    }
                >
                    <Card className={styles.Card}>
                        <Image 
                            className={styles.Image} 
                            src={t.image} 
                        />
                        <Card.Content>
                            <p className={styles.Date}>{t.date}</p>
                            <p className={styles.Header}>{context.t(`${t.header}`)}</p>
                            <Card.Description>{context.t(`${t.description}`)}</Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            )
        })
    )
}

News.propTypes = {
    handleOnClick: PropTypes.func.isRequired,
}
News.contextTypes = {
    t: PropTypes.func.isRequired
};

NewCards.contextTypes = {
    t: PropTypes.func.isRequired
};

export default News;