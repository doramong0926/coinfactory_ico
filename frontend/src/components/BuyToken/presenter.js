import React from "react";
import PropTypes from "prop-types";
import { 
    Segment,
    Input,
    Responsive,
    Container,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import QRCode from "qrcode.react";
import { 
    KYC_STATUS,
    ROUND_TYPE, 
    ROUND_STRING 
} from "./../../config/constants"

const BuyToken = (props, context) => (
    <div className={styles.RootDivision}>
        <div className={styles.RootContainer}>
            <div className={styles.HeaderDivision}>
                <p className={styles.HeaderText}>{context.t("BLUECOTS(BLC) Token Invest")}</p>
                <p className={styles.DescriptionText}>
                    {context.t("Every investor should be complete our KYC process adn we only use ethereum to buy BLC token.")}
                </p>
            </div>
            <EventBox {...props} />
            <CalculateBox {...props} />
            <HowToInveste />
            {props.kyc_status === KYC_STATUS.APPROVED ? <QrCode {...props} /> : null}
        </div>
    </div>
)

const QrCode = (props, context) => {
    return (
        <div className={styles.QrCodeDeivision}>
            <div className={styles.HeaderText}>
                <p>{context.t("2. Address to Send Your Ethereum")}</p>
            </div>
            <Segment className={styles.QrCodeSegment}>
                <div className={styles.QrCodeImage}>
                    <QRCode 
                        value={props.icoWallet}
                        renderAs='svg'
                        size={200}
                    />
                </div>
                <Container>
                    <div className={styles.AddressText}>
                        <p>{props.icoWallet}</p>
                    </div>
                </Container>
            </Segment>   
        </div>
    )
}

const HowToInveste = (props, context) => {
    return (
        <div className={styles.HowToDeivision}>
            <div className={styles.HeaderText}>
                <p>{context.t("1. How to Invest")}</p>
            </div>
            <div className={styles.DescriptionText}>
                <p>{context.t("KYC should be completed before send ethereum to buy BLC token.")}</p>
                <p>{context.t("Copy below address.")}</p>
                <p>{context.t("Transfer Ethereum for purchasing BLC tokens to this address.")}</p>
                <p>{context.t("Add your Ethereum address from which you won private key (do not add address from exchanges!) and get BLC tokens.")}</p>
            </div>
        </div>
    )
}

const CalculateBox = (props, context) => {
    return (
        <Segment basic className={styles.CalculateSegment}>
            <div className={styles.HeaderDivision}>
                <img className={styles.HeaderImage} src={require("images/icons/calculator_image.png")} alt="event_planning" />
                <p className={styles.HeaderText}>
                    {context.t("Token Calculator")}
                </p>
            </div>
            <div className={styles.EventDivision}>
                <div>
                    <img className={styles.EventImage} src={require("images/icons/bonus_image.png")} alt="event_planning" />
                </div>
                <div className={styles.EventTextBox}>
                    <div>
                        <p className={styles.EventText}>
                            {context.t("Ethereum Price")}
                        </p>
                    </div>
                    <div>
                        <p className={styles.RatioText}>
                            {`${props.ethPrice} $`}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.EventDivision}>
                <div>
                    <img className={styles.EventImage} src={require("images/icons/bonus_image.png")} alt="event_planning" />
                </div>
                <div className={styles.EventTextBox}>
                    <div>
                        <p className={styles.EventText}>
                            {context.t("Bluecots Price")}
                        </p>
                    </div>
                    <div>
                        <p className={styles.RatioText}>
                            {`${props.exchange_price} $`}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.EventDivision}>
                <div>
                    <img className={styles.EventImage} src={require("images/icons/bonus_image.png")} alt="event_planning" />
                </div>
                <div className={styles.EventTextBox}>
                    <div>
                        <p className={styles.EventText}>
                            {context.t("Exchage Rate")}
                        </p>
                    </div>
                    <div>
                        <p className={styles.ExchangeRateText}>
                            {`1 : ${props.exchangeRate}`}
                        </p>
                    </div>
                </div>
            </div>
            <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
                <div className={styles.BodyDivision}>
                    <div className={styles.EthDivision}>
                        <img className={styles.TokenImage} src={require("images/icons/eth_icon.png")} alt="eth_icon" />
                        <Input 
                            transparent 
                            type='text'                         
                            name='eth_amount'
                            onChange={props.handleInputChange}
                            value={props.eth_amount}
                            className={styles.EthInputBox} 
                        />
                        <p className={styles.TokenText}>
                            {context.t("ETH")}
                        </p>
                    </div>
                    <div className={styles.middleText}>
                        <p>=</p>
                    </div>
                    <div className={styles.BlcDivision}>
                        <img className={styles.TokenImage} src={require("images/icons/blc_icon.png")} alt="blc_icon" />
                        <Input 
                            transparent 
                            type='text'                         
                            name='blc_amount'
                            onChange={props.handleInputChange}
                            value={props.blc_amount}
                            className={styles.BlcInputBox} 
                            readOnly={!props.isEnableInput}
                        />
                        <p className={styles.TokenText}>
                            {context.t("BLC")}
                        </p>
                    </div>
                </div>
            </Responsive>         
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                <div className={styles.BodyDivisionMobile}>
                    <div className={styles.EthDivision}>
                        <img className={styles.TokenImage} src={require("images/icons/eth_icon.png")} alt="eth_icon" />
                        <Input 
                            transparent 
                            type='text'                         
                            name='eth_amount'
                            onChange={props.handleInputChange}
                            value={props.eth_amount}
                            className={styles.EthInputBox} 
                        />
                        <p className={styles.TokenText}>
                            {context.t("ETH")}
                        </p>
                    </div>
                    <div className={styles.middleText}>
                        <p>=</p>
                    </div>
                    <div className={styles.BlcDivision}>
                        <img className={styles.TokenImage} src={require("images/icons/blc_icon.png")} alt="blc_icon" />
                        <Input 
                            transparent 
                            type='text'                         
                            name='blc_amount'
                            onChange={props.handleInputChange}
                            value={props.blc_amount}
                            className={styles.BlcInputBox} 
                        />
                        <p className={styles.TokenText}>
                            {context.t("BLC")}
                        </p>
                    </div>
                </div>
            </Responsive>
        </Segment>
    )
}

const EventBox = (props, context) => {
    return (
        <Segment basic className={styles.EventSegment}>
            <div className={styles.HeaderDivision}>
                <img className={styles.HeaderImage} src={require("images/icons/event_planning_image.png")} alt="event_planning">
                </img>
                <p className={styles.HeaderText}>
                    {context.t("Event Planning")}
                </p>
            </div>
            {
                _renderRoundBonus(props.roundBonusList, props.currentRoundType)
            }
            <div className={styles.EventDivision}>
                <div>
                    <img className={styles.EventImage} src={require("images/icons/bonus_image.png")} alt="event_planning" />
                </div>
                <div className={styles.EventTextBox}>
                    <div>
                        <p className={styles.EventText}>
                            {context.t("Reffral bonus")}
                        </p>
                    </div>
                    <div>
                        <p className={styles.CurrentRatioText}>
                            {context.t(`${props.raferral_bonus_rate}%`)}
                        </p>
                    </div>
                </div>
            </div>             
        </Segment>
    )
}

const _renderRoundBonus = (roundBonusList, currentRoundType) => {
    if (roundBonusList === null || currentRoundType === "") {
        return null;
    } else {
        return (        
            <React.Fragment>
                {
                    roundBonusList.map((t, index) => {      
                        if (t.round_type === ROUND_TYPE.PRESALE 
                            || t.round_type === ROUND_TYPE.ROUND_A
                            || t.round_type === ROUND_TYPE.ROUND_B
                            || t.round_type === ROUND_TYPE.ROUND_C
                        ) {              
                            return (
                                <div key={index} className={styles.EventDivision}>
                                    <div>
                                        <img className={styles.EventImage} src={require("images/icons/bonus_image.png")} alt="event_planning" />
                                    </div>
                                    <div className={styles.EventTextBox}>
                                        <div>
                                            <p className={styles.EventText}>
                                                {getRoundString(t.round_type)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={currentRoundType === t.round_type ? styles.CurrentRatioText : styles.RatioText}>
                                                {`${t.bonus_rate} %`}
                                            </p>
                                        </div>
                                    </div>
                                </div>   
                            )
                        }
                        else {
                            return null;
                        }
                    })
                }
            </React.Fragment>
        );
    }
}

const getRoundString = (round_type) => {
    switch(round_type) {
        case ROUND_TYPE.PRESALE:
            return ROUND_STRING.PRESALE;
        case ROUND_TYPE.ROUND_A:
            return ROUND_STRING.ROUND_A;
        case ROUND_TYPE.ROUND_B:
            return ROUND_STRING.ROUND_B;
        case ROUND_TYPE.ROUND_C:
            return ROUND_STRING.ROUND_C;
        default :
            return "";
    }
}

BuyToken.propTypes = {
    kyc: PropTypes.object,
    blc_amount: PropTypes.string.isRequired,
    eth_amount: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    raferral_bonus_rate: PropTypes.string.isRequired,
    icoWallet: PropTypes.string.isRequired,
    kyc_status: PropTypes.string.isRequired,
    ethPrice: PropTypes.string.isRequired,
    exchange_price: PropTypes.string.isRequired,
    exchangeRate: PropTypes.string.isRequired,
    roundBonusList: PropTypes.array,
    currentRoundType: PropTypes.string,
}

BuyToken.contextTypes = {
    t: PropTypes.func.isRequired
};

EventBox.contextTypes = {
    t: PropTypes.func.isRequired
};

CalculateBox.contextTypes = {
    t: PropTypes.func.isRequired
};

HowToInveste.contextTypes = {
    t: PropTypes.func.isRequired
};

QrCode.contextTypes = {
    t: PropTypes.func.isRequired
};


export default BuyToken;