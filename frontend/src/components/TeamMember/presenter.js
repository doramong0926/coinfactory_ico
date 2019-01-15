import React from "react";
import {
    Image,
    Segment,
    Grid,
    Button,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";
import _ from "lodash";

const TeamMember = (props, context) => {
    return(            
        <div ref={props.myRef} >
            <Segment vertical className={styles.TeamSegment} >
                <PageHeader 
                    backgroundImage={false}
                    backgroundTitle={context.t("TEAM")}
                    title={context.t("POWERED BY A TEAM")}
                    description={context.t("The BLUECOTS Team combines a passion for hotel, industry experise & proven record in finance, development, marketing & licensing.")}
                />
                <Grid container stackable verticalAlign='middle' className={styles.AvatarContainer}>                    
                    <Grid.Row className={styles.AvatarRowBox}>
                        <RenderAvatar {...props} list={props.memberList} />
                    </Grid.Row>
                    <p className={styles.SubHeaderText}>ADVISORS</p>
                    <Grid.Row className={styles.AvatarRowBox}>
                        <RenderAvatar {...props} list={props.advisorList} />
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    )    
}

const RenderAvatar = (props) => {
    return (
        <React.Fragment>
            {
                _.map(props.memberList, (item, key) => {
                    return (
                        <Grid.Column key={item.key} className={styles.AvatarColumnBox}>
                            <Image 
                                src={require(`images/team/${item.image}`)} 
                                size="small"
                                avatar
                                className={styles.AvatarImage}
                            />
                            <p className={styles.avatarName}>{item.name}</p>
                            <p className={styles.avatarJob}>{item.job}</p>
                            <span className={styles.Container}>
                                {item.facebook !== undefined ? <Button 
                                                                                    className={styles.Icon} 
                                                                                    circular 
                                                                                    size="tiny"                     
                                                                                    icon="facebook"      
                                                                                    onClick={
                                                                                        () => props.handleOnClick(item.facebook)
                                                                                    }     
                                                                                /> : null}
                                {item.twitter !== undefined ? <Button 
                                                                                    className={styles.Icon} 
                                                                                    circular 
                                                                                    size="tiny"                     
                                                                                    icon="twitter"      
                                                                                    onClick={
                                                                                        () => props.handleOnClick(item.twitter)
                                                                                    }        
                                                                                /> : null}
                                {item.linkedin !== undefined ? <Button 
                                                                                    className={styles.Icon} 
                                                                                    circular 
                                                                                    size="tiny"                     
                                                                                    icon="linkedin"   
                                                                                    onClick={
                                                                                        () => props.handleOnClick(item.linkedin)
                                                                                    }
                                                                                /> : null}
                            </span>
                        </Grid.Column>
                    )
                })
            }
        </React.Fragment>
    )
}

TeamMember.propTypes = {
    memberList: PropTypes.array.isRequired,
    advisorList: PropTypes.array.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    myRef: PropTypes.object,
}

TeamMember.contextTypes = {
    t: PropTypes.func.isRequired
};

export default TeamMember;