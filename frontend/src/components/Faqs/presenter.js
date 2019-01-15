import React from "react";
import {
    Accordion,
    Segment,
    Icon,
    Menu,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PageHeader from "./../PageHeader";

const Faqs = (props, context) => {

    const questions = [
        {
            "menuItemName": "GENERAL",
            "activeIndex": 0,
            "title" :  context.t("00 What is a dog?"),
            "body" :  context.t("00 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "GENERAL",
            "activeIndex": 1,
            "title" :  context.t("00 What kinds of dogs are there?"),
            "body" :  context.t("00 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "GENERAL",
            "activeIndex": 2,
            "title" :  context.t("00 How do you acquire a dog?"),
            "body" :  context.t("00 Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily."),
        },
        {
            "menuItemName": "GENERAL",
            "activeIndex": 3,
            "title" :  context.t("00 How do you acquire a dog?"),
            "body" :  context.t("00 Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily."),
        },
        {
            "menuItemName": "GENERAL",
            "activeIndex": 4,
            "title" :  context.t("00 How do you acquire a dog?"),
            "body" :  context.t("00 Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily."),
        },
        {
            "menuItemName": "PRE_ICO&ICO",
            "activeIndex": 0,
            "title" :  context.t("11 What is a dog?"),
            "body" :  context.t("11 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "PRE_ICO&ICO",
            "activeIndex": 1,
            "title" :  context.t("11 What kinds of dogs are there?"),
            "body" :  context.t("11 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "PRE_ICO&ICO",
            "activeIndex": 2,
            "title" :  context.t("11 How do you acquire a dog?"),
            "body" :  context.t("11 Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily."),
        },
        {
            "menuItemName": "TOKENS",
            "activeIndex": 0,
            "title" :  context.t("22 What is a dog?"),
            "body" :  context.t("22 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "TOKENS",
            "activeIndex": 1,
            "title" :  context.t("22 What kinds of dogs are there?"),
            "body" :  context.t("22 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "TOKENS",
            "activeIndex": 2,
            "title" :  context.t("22 How do you acquire a dog?"),
            "body" :  context.t("22 Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily."),
        },
        {
            "menuItemName": "CLIENT",
            "activeIndex": 0,
            "title" :  context.t("33 What is a dog?"),
            "body" :  context.t("33 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "CLIENT",
            "activeIndex": 1,
            "title" :  context.t("33 What kinds of dogs are there?"),
            "body" :  context.t("33 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "CLIENT",
            "activeIndex": 2,
            "title" :  context.t("33 How do you acquire a dog?"),
            "body" :  context.t("33 Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily."),
        },
        {
            "menuItemName": "LEGAL",
            "activeIndex": 0,
            "title" :  context.t("44 What is a dog?"),
            "body" :  context.t("44 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "LEGAL",
            "activeIndex": 1,
            "title" :  context.t("44 What kinds of dogs are there?"),
            "body" :  context.t("44 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."),
        },
        {
            "menuItemName": "LEGAL",
            "activeIndex": 2,
            "title" :  context.t("44 How do you acquire a dog?"),
            "body" :  context.t("44 Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily."),
        },
    ]

    const _renderItems = (activeIndex, selectedMenuItem, handleClick) => {
        return (
            <React.Fragment>
                {
                    questions.map((t, index) => {
                        if (t.menuItemName === selectedMenuItem) {
                            return (
                                <div key={index} className={activeIndex === t.activeIndex ? styles.AccordionDivisionSelected : styles.AccordionDivision}>
                                    <Accordion.Title active={activeIndex === t.activeIndex} index={t.activeIndex} onClick={handleClick}>
                                    <Icon name='dropdown' />
                                    {t.title}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === t.activeIndex}>
                                        <p>
                                            {t.body}
                                        </p>
                                    </Accordion.Content>
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </React.Fragment>
        )
    }


    return(            
        <React.Fragment>
            <Segment basic vertical className={styles.NewsContainer} >
                <PageHeader 
                    backgroundImage={false}
                    backgroundTitle="FAQS"
                    title="FREQUENTLY ASKED QUESTIONS"
                    lineNum={2}
                    description={context.t("Below we've provided a bit of ICO, ICO Token, cryptocurrencies, and few others. If you have any other questions, please get in touch using the contact form below.")}
                />
                <div className={styles.MenuDivision}>
                    <Menu pointing secondary className={styles.Menu}>
                        <Menu.Item 
                            name='GENERAL' 
                            active={props.selectedMenuItem === 'GENERAL'} 
                            onClick={props.handleMenuItemClick}
                            className={props.selectedMenuItem === 'GENERAL' ? styles.MenuItemSelected : styles.MenuItem}
                        />
                        <Menu.Item
                            name='PRE_ICO&ICO'
                            active={props.selectedMenuItem === 'PRE_ICO&ICO'}
                            onClick={props.handleMenuItemClick}
                            className={props.selectedMenuItem === 'PRE_ICO&ICO' ? styles.MenuItemSelected : styles.MenuItem}
                        />
                        <Menu.Item
                            name='TOKENS'
                            active={props.selectedMenuItem === 'TOKENS'}
                            onClick={props.handleMenuItemClick}
                            className={props.selectedMenuItem === 'TOKENS' ? styles.MenuItemSelected : styles.MenuItem}
                        />
                        <Menu.Item
                            name='CLIENT'
                            active={props.selectedMenuItem === 'CLIENT'}
                            onClick={props.handleMenuItemClick}
                            className={props.selectedMenuItem === 'CLIENT' ? styles.MenuItemSelected : styles.MenuItem}
                        />
                        <Menu.Item
                            name='LEGAL'
                            active={props.selectedMenuItem === 'LEGAL'}
                            onClick={props.handleMenuItemClick}
                            className={props.selectedMenuItem === 'LEGAL' ? styles.MenuItemSelected : styles.MenuItem}
                        />
                        </Menu>
                </div>
                <div className={styles.Accordions}>
                    <Accordion fluid styled>
                        {_renderItems(props.activeIndex, props.selectedMenuItem, props.handleClick)}
                    </Accordion>
                </div>
            </Segment>
        </React.Fragment>
    )
}

Faqs.propTypes = {    
    activeIndex: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    selectedMenuItem: PropTypes.string.isRequired,
    handleMenuItemClick: PropTypes.func.isRequired,
}

Faqs.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Faqs;