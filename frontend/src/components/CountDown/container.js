import React, { Component } from "react";
import PropTypes from "prop-types";
import CountDown from "./presenter";
import { ROUND_TYPE } from "./../../config/constants"
import _ from "lodash";

class Container extends Component {   
    constructor(props, context) {
        super(props, context);
        this.state = {
            date: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            headerText: "",
        }
    }

    static propTypes = {
        color: PropTypes.string.isRequired,
        currentRound: PropTypes.object,
        roundList: PropTypes.array,
    }    

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.currentRound !== null && this.props.roundList !== null) {
            this.setState({
                date: this.calculateCountDownDate(this.props.currentRound, this.props.roundList),
            })
        } else {
            this.setState({
                date: ""
            })
        }
        
        this.interval = setInterval(() => {
            const date = this.calculateCountdown(this.state.date);
            date ? this.setState(date) : this.stop();
        }, 1000);
    }

    componentWillUnmount() {
        this.stop();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentRound === null && nextProps.currentRound !== null) {
            if (this.props.roundList !== null) {
                this.setState({
                    date: this.calculateCountDownDate(nextProps.currentRound, this.props.roundList)
                })
            }
        }
        if (this.props.roundList === null && nextProps.roundList !== null) {
            if (this.props.currentRound !== null) {
                this.setState({
                    date: this.calculateCountDownDate(this.props.currentRound, nextProps.roundList)
                })
            }
        }
    }

    calculateCountDownDate (currentRound, roundList) {
        let timeStamp;
        if (currentRound.round_type === ROUND_TYPE.NOT_STARTED) {
            timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.PRESALE}).start            
            this.setState({
                headerText: this.context.t("ICO PreSale이 곧 시작됩니다.")
            })
        } else if (currentRound.round_type === ROUND_TYPE.PRE_ROUND_A) {
            timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_A}).start            
            this.setState({
                headerText: this.context.t("ICO Round-A가 곧 시작됩니다.")
            })
        } else if (currentRound.round_type === ROUND_TYPE.PRE_ROUND_B) {
            timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_B}).start            
            this.setState({
                headerText: this.context.t("ICO Round-B가 곧 시작됩니다.")
            })
        } else if (currentRound.round_type === ROUND_TYPE.PRE_ROUND_C) {
            timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_C}).start            
            this.setState({
                headerText: this.context.t("ICO Round-C가 곧 시작됩니다.")
            })
        } else if (currentRound.round_type === ROUND_TYPE.PRESALE) {
            if (currentRound.is_completed === true) {
                timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_A}).start            
                this.setState({
                    headerText: this.context.t("ICO PreSale이 조기 마감되었습니다.")
                })
            } else {
                timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.PRESALE}).end 
                this.setState({
                    headerText: this.context.t("ICO PreSale이 곧 마감됩니다.")
                })           
            }
        } else if (currentRound.round_type === ROUND_TYPE.ROUND_A) {
            if (currentRound.is_completed === true) {
                timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_B}).start            
                this.setState({
                    headerText: this.context.t("ICO Round-A가 조기 마감되었습니다.")
                })
            } else {
                timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_A}).end            
                this.setState({
                    headerText: this.context.t("ICO Round-A가 곧 마감됩니다.")
                })
            }
        } else if (currentRound.round_type === ROUND_TYPE.ROUND_B) {
            if (currentRound.is_completed === true) {
                timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_C}).start            
                this.setState({
                    headerText: this.context.t("ICO Round-B가 조기 마감되었습니다.")
                })
            } else {
                timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_B}).end            
                this.setState({
                    headerText: this.context.t("ICO Round-B가 곧 마감됩니다.")
                })
            }
        } else if (currentRound.round_type === ROUND_TYPE.ROUND_C) {
            if (currentRound.is_completed === true) {
                timeStamp = 0;
                this.setState({
                    headerText: this.context.t("모든 ICO가 마감되었습니다.")
                })
            } else {
                timeStamp = _.find(roundList, t => {return t.round_type ===  ROUND_TYPE.ROUND_C}).end            
                this.setState({
                    headerText: this.context.t("ICO Round-C가 곧 마감됩니다.")
                })
            }
        }
        return new Date(timeStamp*1000 + (9*60*60*1000));
    }

    render() {
        return (
            <CountDown 
                days={this.state.days}
                hours={this.state.hours}
                min={this.state.min}
                sec={this.state.sec}
                color={this.props.color}
                headerText={this.state.headerText}
            />
        )
    }

    calculateCountdown(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

        if (diff <= 0) {
            return false;
        }

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0
        };
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        if (diff.toString() === "NaN"){
            timeLeft.sec = 0;
        } else {
            timeLeft.sec = diff;
        }
        return timeLeft;
    }

    stop() {
        clearInterval(this.interval);
    }
}

export default Container;