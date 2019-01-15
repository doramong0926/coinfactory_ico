import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const Spinner = (props, context) => (
    <React.Fragment>
        <Dimmer active={props.visible} page>
            <Loader active={props.visible} size={props.size}>{context.t('로딩중...')}</Loader>
        </Dimmer>
        {props.children}
    </React.Fragment>
)

Spinner.propTypes = {
    children: PropTypes.any.isRequired,
    visible: PropTypes.any.isRequired,
}

Spinner.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Spinner;