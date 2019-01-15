import React from "react";
import {
    Image,
    Segment,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const PageHeader = (props, context) => {
    return(     
        <Segment basic className={styles.PageHeaderSegment}>
            <div className={styles.HeaderImageDiv}>
            {
                props.backgroundImage === undefined || props.backgroundImage === false  ? null :
                <Image className={styles.HeaderImage} src={require('images/page_header_circle.png')} />
            }
            </div>
            <p className={styles.BackgroundTitleText}>{context.t(`${props.backgroundTitle}`)}</p>
            <p className={props.lineNum > 1 ? styles.TitleTextMultiLine : styles.TitleText}>{context.t(`${props.title}`)}</p>     
            {props.description === undefined ? 
                null 
                : <p className={styles.DescriptionText}>{context.t(`${props.description}`)}</p>
            }       
            
        </Segment>
    )
}

PageHeader.propTypes = {
    backgroundImage: PropTypes.bool,
    backgroundTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    lineNum:PropTypes.number,
}

PageHeader.contextTypes = {
    t: PropTypes.func.isRequired
};



export default PageHeader;