import React from "react";
import { 
    Header, 
    Segment,
    Divider,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
const whitepaper = (props, context) => {
    if (props.whitepaper === null) {
        return <Header>Loading</Header>
    } else {
        return(            
            <Segment basic>
                {
                    props.whitepaper.map((t, index) => {
                        return (
                            <React.Fragment key={index}>
                                <p>launage : {t.language}</p>
                                <p>path : <a href={t.file_path}>{t.file_path}</a></p>
                                <Divider inverted section />
                            </React.Fragment>
                        )
                    })
                }
            </Segment>
        )
    }
}

whitepaper.propTypes = {
    wallpaper: PropTypes.array,
}

whitepaper.contextTypes = {
    t: PropTypes.func.isRequired
};


export default whitepaper;