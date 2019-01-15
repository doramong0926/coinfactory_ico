import React, { Component } from "react";
import TeamMember from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.myRef = React.createRef()   // Create a ref object 
    }

    static propTypes = {
        SaveRefTeam: PropTypes.func.isRequired,
    }    
    componentDidMount() {
        this.props.SaveRefTeam(this.myRef);
    }

    render() {
        return (
            <TeamMember 
                memberList={this.memberList}
                advisorList={this.advisorList}
                handleOnClick={this._handleOnClick}
                myRef={this.myRef}
            />
        )
    }
    _handleOnClick = (url) => {
        console.log(url)
        window.open(url, '_blank');
    }

    memberList = [
        {
            "key" : "1",
            "name" : "TIGER OH",
            "image" : "avatar.jpg",
            "job" : "CEC & Lead Blockchain",
            "facebook" : "https://www.facebook.com/",
            "linkedin" : "https://www.linkedin.com/",
            "twitter" : "https://twitter.com/",
        },
        {
            "key" : "2",
            "name" : "SteFan Harary",
            "image" : "avatar.jpg",
            "job" : "CTO & Senior Developer",
            "facebook" : "https://www.facebook.com/",
            "linkedin" : "https://www.linkedin.com/",
            "twitter" : "https://twitter.com/",
        },
        {
            "key" : "3",
            "name" : "Moises Teare",
            "image" : "avatar.jpg",
            "job" : "Blockchain App Developer",
            "facebook" : "https://www.facebook.com/",
            "linkedin" : "https://www.linkedin.com/",
            "twitter" : "https://twitter.com/",
        },
        {
            "key" : "4",
            "name" : "Gabriel Bernal",
            "image" : "avatar.jpg",
            "job" : "Community Management",
            "facebook" : "https://www.facebook.com/",
            "linkedin" : "https://www.linkedin.com/",
            "twitter" : "https://twitter.com/",
        },
    ]
    
    advisorList = [
        {
            "key" : "1",
            "name" : "TIGER OH",
            "image" : "avatar.jpg",
            "job" : "CEC & Lead Blockchain",
            "facebook" : "https://www.facebook.com/",
            "linkedin" : "https://www.linkedin.com/",
            "twitter" : "https://twitter.com/",
        },
        {
            "key" : "2",
            "name" : "SteFan Harary",
            "image" : "avatar.jpg",
            "job" : "CTO & Senior Developer",
            "facebook" : "https://www.facebook.com/",
            "linkedin" : "https://www.linkedin.com/",
            "twitter" : "https://twitter.com/",
        },
        {
            "key" : "3",
            "name" : "Moises Teare",
            "image" : "avatar.jpg",
            "job" : "Blockchain App Developer",
            "facebook" : "https://www.facebook.com/",
            "linkedin" : "https://www.linkedin.com/",
            "twitter" : "https://twitter.com/",
        },
    ]
}

export default Container;