import React from "react";
import {
    Segment,
    Icon,
    Grid,
    Form,
    Input,
    TextArea,
    Button,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";
import BasicModal from "./../BasicModal";
import { COMPANY_INFO } from "./../../config/constants"

const Contact = (props, context) => {
    const successModalTitle = context.t("이메일 전송 성공");
    const successModalContents = [
        {
            title: null,
            text: [
                context.t("문의사항이 전송되었습니다."),
                context.t("최대한 빠르게 답변드리겠습니다."),
            ]
        },
    ];

    const failureModalTitle = context.t("이메일 전송 실패");
    const failureModalContents = [
        {
            title: null,
            text: [
                context.t("이메일 전송이 실패하였습니다."),
                context.t("잠시후 다시 시도해 주세요."),
            ]
        },
    ];

    return(            
        <div ref={props.myRef} >
            <Segment basic vertical className={styles.ContactContainer} >
                <PageHeader 
                    backgroundImage={false}
                    backgroundTitle="CONTACT"
                    title="CONTACT BLUECOTS"
                    description={context.t("Any question? Reach out to us and we'll get back to you shortly.")}
                />
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row className={styles.GridRow}>
                        <Grid.Column className={styles.GridColumn}>
                            <div className={styles.ItemDivision}>
                                <div className={styles.IconDivision}>
                                    <Icon fitted name='phone' className={styles.Icon} />
                                </div>
                                <div className={styles.TextDivision}>
                                    {/* <p className={styles.Text}>`${COMPANY_INFO.TEL}`</p> */}
                                    <a href={`tel:${COMPANY_INFO.TEL}`}>{`${COMPANY_INFO.TEL}`}</a>
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column className={styles.GridColumn}>
                            <div className={styles.ItemDivision}>
                                <div className={styles.IconDivision}>
                                    <Icon fitted name='mail' className={styles.Icon} />
                                </div>
                                <div className={styles.TextDivision}>
                                    <p className={styles.Text}>{`${COMPANY_INFO.EMAIL}`}</p>
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column className={styles.GridColumn}>
                            <div className={styles.ItemDivisionTelegram}>
                                <div className={styles.IconDivision}>
                                    <Icon 
                                        fitted 
                                        name='telegram plane' 
                                        onClick={props.handleOnClickTelegram}
                                        className={styles.Icon} 
                                    />
                                </div>
                                <div className={styles.TextDivision}>
                                    <p 
                                        className={styles.Text}
                                        onClick={props.handleOnClickTelegram}
                                    >
                                        Join us on telegram
                                    </p>
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div className={styles.FromDivision}>
                    <Form onSubmit={props.handleOnSubmit}>
                        <div className={styles.InputDivision}>
                            <Input 
                                transparent 
                                placeholder='Your Name' 
                                name="name"                                
                                value={props.name}
                                onChange={props.handleInputChange}
                                className={styles.Input}
                            />   
                        </div> 
                        <div className={styles.InputDivision}>
                            <Input 
                                transparent 
                                placeholder='Your Email' 
                                name="email"
                                value={props.email}
                                onChange={props.handleInputChange}
                                className={styles.Input}
                            />   
                        </div> 
                        <div className={styles.InputDivision}>
                            <TextArea 
                                autoHeight 
                                placeholder='Your Message' 
                                name="message"
                                rows={1}
                                value={props.message}
                                onChange={props.handleInputChange}
                                className={styles.TextAreaInput}
                            />
                        </div> 
                        <div className={styles.ButtonContainer}>
                            <Button 
                                fluid={true} 
                                type='submit'
                                disabled={!props.isEnableSubmit}
                                className={styles.SubmitButton}
                            >
                                {context.t('SEND E-MAIL')}
                            </Button>   
                        </div>
                    </Form>
                </div>
                <BasicModal 
                    visible = {props.visibleModal}
                    handleClose = {props.handleCloseModal}
                    size={"mini"} 
                    title={props.sendEmailResult === true ? successModalTitle : failureModalTitle}
                    contents={props.sendEmailResult === true ? successModalContents : failureModalContents}
                />
            </Segment>
        </div>
    )
}

Contact.propTypes = {    
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    isEnableSubmit: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    visibleModal: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    sendEmailResult: PropTypes.bool.isRequired,
    handleOnClickTelegram: PropTypes.func.isRequired,
    myRef: PropTypes.object,
}

Contact.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Contact;