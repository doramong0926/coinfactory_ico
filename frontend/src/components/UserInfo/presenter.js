import React from "react";
import {
    Segment,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
// import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import UserList from "../UserList";

const UserInfo = (props, context) => {
    return(            
        <React.Fragment>
            <Segment basic vertical className={styles.RootSegment} >
                <UserList />
            </Segment>
        </React.Fragment>
    )
}

UserInfo.propTypes = {    
    // activeIndex: PropTypes.number.isRequired,
    // handleClick: PropTypes.func.isRequired,
    // selectedMenuItem: PropTypes.string.isRequired,
    // handleMenuItemClick: PropTypes.func.isRequired,
}

UserInfo.contextTypes = {
    // t: PropTypes.func.isRequired
};

export default UserInfo;