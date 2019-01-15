import React from "react";
import PropTypes from "prop-types";
import {
    Segment,
    Input,
    Container,
    Button,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import SocialIcons from "./../SocialIcons";
import BasicModal from "../BasicModal";
import VerticalDivider from "../VerticalDivider";
// import Language from "../Language";

const Footer = (props, context) => {
    const successModalTitle = context.t("이메일 등록 성공");
    const successModalContents = [
        {
            title: null,
            text: [
                context.t("이메일 등록이 완료되었습니다."),
            ]
        },
    ];

    const failureModalTitle = context.t("이메일 등록 실패");
    const failureModalContents = [
        {
            title: null,
            text: [
                context.t("이메일 등록이 실패하였습니다."),
            ]
        },
    ];

    return (
        <Segment basic inverted vertical className={styles.FooterContainer}>
            {
                props.isShowDivider === true 
                    ? (
                        <div className={styles.Divider}>
                        <VerticalDivider />   
                    </div> 
                    )
                    : null
            }
            
            <Container>
                <p className={styles.SubscribeTitle}>{context.t("Don't miss out, Stay updated")}</p>
                <Input 
                    placeholder='Enter your email address'
                    name="subscribeText"
                    type="email"                    
                    onChange={props.handleInputChange}
                    className={styles.SubscribeInput}
                    action
                >
                    <input />
                    <Button 
                        type='submit' 
                        onClick={props.handleOnClickSubscribe}
                    >
                        SUBSCRIBE
                    </Button>
                </Input>
            </Container>
            <Container className={styles.SocialIcon}>
                <SocialIcons telegram facebook twitter instagram/>
            </Container>            
            {/* <Container className={styles.Language}>
                <Language />
            </Container> */}
            <Container className={styles.Copyright}>                
                <p>{context.t("Copyright ©2018 BLUECOTS co.,ltd.")}</p>
                <p>{context.t("All trademarks and copyrights belong to their respective owners.")}</p>
            </Container>
            <BasicModal 
                visible = {props.visibleModal}
                handleClose = {props.handleCloseModal}
                size={"mini"} 
                title={props.subscribeResult === true ? successModalTitle : failureModalTitle}
                contents={props.subscribeResult === true ? successModalContents : failureModalContents}
            />
        </Segment>
    )
}

Footer.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    subscribeText: PropTypes.string.isRequired,
    handleOnClickSubscribe: PropTypes.func.isRequired,
    visibleModal: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    subscribeResult: PropTypes.bool.isRequired,
    isShowDivider: PropTypes.bool.isRequired,
}

Footer.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Footer;
