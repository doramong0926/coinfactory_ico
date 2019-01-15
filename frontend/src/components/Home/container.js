import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from 'query-string'
import Home from "./presenter";

class Container extends Component {
    // constructor(props, context) {
    //     super(props, context)
    // }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        SaveReferralQuery: PropTypes.func.isRequired,
        home_location: PropTypes.string,
        ref_whatis: PropTypes.object,
        ref_tokenSale: PropTypes.object,
        ref_roadmap: PropTypes.object,
        ref_team: PropTypes.object,
        ref_partner: PropTypes.object,
        ref_contact: PropTypes.object,
    };

    componentDidMount() {        
        const foundQuery = queryString.parse(this.props.location.search).ref;
        if (foundQuery !== null &&  foundQuery !== undefined) {
            this.props.SaveReferralQuery(foundQuery);
        }
        if (this.props.home_location !== null) {
            if(this.props.home_location === 'home') {
                setTimeout(() => {
                    if (this.props.ref_whatis.current !== null) {
                        this._scrollToElement(null)
                    }    
                }, 100);
            } else if(this.props.home_location === 'whatis') {
                setTimeout(() => {
                    if (this.props.ref_whatis.current !== null) {
                        this._scrollToElement(this.props.ref_whatis)
                    }    
                }, 100);
            } else if(this.props.home_location === 'tokensale') {
                setTimeout(() => {
                    if (this.props.ref_tokenSale.current !== null) {
                        this._scrollToElement(this.props.ref_tokenSale)
                    }    
                }, 100);
            } else if(this.props.home_location === 'roadmap') {
                setTimeout(() => {
                    if (this.props.ref_roadmap.current !== null) {
                        this._scrollToElement(this.props.ref_roadmap)
                    }    
                }, 100);
            } else if(this.props.home_location === 'team') {
                setTimeout(() => {
                    if (this.props.ref_team.current !== null) {
                        this._scrollToElement(this.props.ref_team)
                    }    
                }, 100);
            } else if(this.props.home_location === 'partner') {
                setTimeout(() => {
                    if (this.props.ref_partner.current !== null) {
                        this._scrollToElement(this.props.ref_partner)
                    }    
                }, 100);
            } else if(this.props.home_location === 'contact') {
                setTimeout(() => {
                    if (this.props.ref_contact.current !== null) {
                        this._scrollToElement(this.props.ref_contact)
                    }    
                }, 100);
            }
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if ((this.props.home_location === null &&  nextProps.home_location !== null)
            || (this.props.home_location !== null &&  (this.props.home_location !== nextProps.home_location))) {
            if(nextProps.home_location === 'home') {
                this._scrollToElement(null)
            } else if(nextProps.home_location === 'whatis') {
                if (this.props.ref_contact.current !== null) {
                    this._scrollToElement(this.props.ref_whatis)
                } 
            } else if(nextProps.home_location === 'tokensale') {
                if (this.props.ref_tokenSale.current !== null) {
                    this._scrollToElement(this.props.ref_tokenSale)
                } 
            } else if(nextProps.home_location === 'roadmap') {
                if (this.props.ref_roadmap.current !== null) {
                    this._scrollToElement(this.props.ref_roadmap)
                } 
            } else if(nextProps.home_location === 'team') {
                if (this.props.ref_team.current !== null) {
                    this._scrollToElement(this.props.ref_team)
                } 
            } else if(nextProps.home_location === 'partner') {
                if (this.props.ref_partner.current !== null) {
                    this._scrollToElement(this.props.ref_partner)
                } 
            } else if(nextProps.home_location === 'contact') {
                if (this.props.ref_contact.current !== null) {
                    this._scrollToElement(this.props.ref_contact)
                } 
            }         
        }
    }

    render() {
        return (
            <Home />
        )
    }
    
    _scrollToElement = (ref) => {
        window.scrollTo({
            top: ref === null ? 0 : ref.current.offsetTop, 
            behavior: "smooth"
        })
    }
}

export default Container;