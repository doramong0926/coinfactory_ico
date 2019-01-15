import React from "react";
import {
    Grid,
    Image,
    Segment,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";
import VerticalDivider from "../VerticalDivider";

const Partners = (props, context) => {
    return(            
        <div ref={props.myRef} >
            <Segment vertical className={styles.PartnersContainer1} >                
                <PageHeader 
                    backgroundImage={false}
                    backgroundTitle="PARTNER"
                    title="BLUECOTS PARTNERS"
                />
                < Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.Row1}>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_01.png')} alt="partner" />
                        </Grid.Column>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_02.png')} alt="partner" />
                        </Grid.Column>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_03.png')} alt="partner" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={styles.Row2}>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_04.png')} alt="partner" />
                        </Grid.Column>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_05.png')} alt="partner" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment vertical className={styles.PartnersContainer2} >
                <div className={styles.Divider}>
                    <VerticalDivider />   
                </div> 
                <p className={styles.Header}>
                    {context.t("AS SEE IN")}
                </p>
                < Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.Row1}>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_01.png')} alt="partner" />
                        </Grid.Column>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_02.png')} alt="partner" />
                        </Grid.Column>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_03.png')} alt="partner" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={styles.Row2}>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_04.png')} alt="partner" />
                        </Grid.Column>
                        <Grid.Column className={styles.ImageColumn}>
                            <Image className={styles.Image} src={require('images/partners/partner_05.png')} alt="partner" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    )
}

Partners.propTypes = {
    myRef: PropTypes.object,
}

Partners.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Partners;