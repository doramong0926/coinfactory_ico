import React from "react";
import PropTypes from "prop-types";
import {
    Dropdown,
    Flag,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const languageOptions = [ 
    { key: 'kr', value: 'ko', flag: 'kr', text: 'Korea'},
    { key: 'en', value: 'en', flag: 'us', text: 'English'},
]

const Language = (props, context) => {
    return (
        <div className={styles.Container}>
            <FlagImage lang={props.lang}/>
            <Dropdown
                options={languageOptions}
                text={props.onlyFlag === true ? null : context.t("언어")}    
                onChange={props.handleOnClickLanguage}
                className={props.onlyFlag === true ? styles.DropdownOnlyFlag: styles.Dropdown}
            >
            </Dropdown>
        </div>
    )
}

const FlagImage = (props)  => {
    if (props.lang === 'ko') {
        return <Flag name='kr' className={styles.Flag} />
    } else {
        return <Flag name='us' className={styles.Flag} />
    }
}

Language.propTypes = {
    handleOnClickLanguage: PropTypes.func.isRequired,
    lang: PropTypes.string,
    onlyFlag: PropTypes.bool.isRequired,
}

Language.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Language;
