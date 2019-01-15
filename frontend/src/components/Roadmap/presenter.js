import React from "react";
import {
    Image,
    Segment,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";
import VerticalDivider from "../VerticalDivider";

const Roadmap = (props, context) => {
    return(            
        <div ref={props.myRef} >
            <Segment vertical className={styles.RoadmapContainer} >
                <div className={styles.Divider}>
                    <VerticalDivider />   
                </div> 
                <PageHeader 
                    backgroundImage={false}
                    backgroundTitle="ROADMAP"
                    title="OUR ROADMAP"
                />
                <Image src={require('images/roadmap_vertical.png')} className={styles.RoadmapVerticalImage}/>
                <Image src={require('images/roadmap_horizental.png')} className={styles.RoadmapHorizentalImage}/>
            </Segment>
        </div>
    )
}

Roadmap.propTypes = {
    myRef: PropTypes.object,
};

Roadmap.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Roadmap;