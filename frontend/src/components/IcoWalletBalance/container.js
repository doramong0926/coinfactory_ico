import React, { Component } from "react";
import IcoWalletBalance from "./presenter";
import PropTypes from "prop-types";
import { 
    GetEthBalance,
    GetBlcBalance,
} from "./../../utils/web3Control"
import { TOKEN_DECIMALS } from "./../../config/constants"

class Container extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            icoWalletList: null,
            icoBalanceEth: null,
            icoBalanceBlc: null,
            contractBalanceEth: null,
            contractBalanceBlc: null,
            ownerBalanceEth: null,
            ownerBalanceBlc: null,
        };    
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        icoWalletList: PropTypes.object,
        pathname: PropTypes.string,
    }

    componentDidMount () {
        if (this.props.icoWalletList !== undefined && this.props.icoWalletList !== null) {
            this.setState({
                icoWalletList: this.props.icoWalletList,
            })
            setTimeout(() => {
                this._getBalance();        
            }, );
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.icoWalletList === null && nextProps.icoWalletList !== null && nextProps.icoWalletList !== undefined) {
            this.setState({
                icoWalletList: nextProps.icoWalletList,
            })
            setTimeout(() => {
                this._getBalance();    
            }, );
        } else if (this.props.pathname !== nextProps.pathname && nextProps.pathname === "/superman/icoinfo/") {
            if (this.props.icoWalletList !== null) {
                this.setState({
                    icoWalletList: nextProps.icoWalletList,
                })
                setTimeout(() => {
                    this._getBalance();    
                }, );
            }
        }
    }

    render() {
        return (
            <IcoWalletBalance 
                icoWalletList={this.state.icoWalletList}
                icoBalanceEth={this.state.icoBalanceEth}
                icoBalanceBlc={this.state.icoBalanceBlc}
                contractBalanceEth={this.state.contractBalanceEth}
                contractBalanceBlc={this.state.contractBalanceBlc}
                ownerBalanceEth={this.state.ownerBalanceEth}
                ownerBalanceBlc={this.state.ownerBalanceBlc}
            />
        )
    }

    _getBalance = async () => {
        if (this.state.icoWalletList !== null) {
            try {
                const icoBalanceEth = await GetEthBalance(this.state.icoWalletList.icoWallet);
                this.setState({
                    icoBalanceEth: icoBalanceEth,
                })
                const icoBalanceBlc = await GetBlcBalance(this.state.icoWalletList.icoWallet, this.state.icoWalletList.contractWallet, TOKEN_DECIMALS);
                this.setState({
                    icoBalanceBlc: icoBalanceBlc,
                })
                const contractBalanceEth = await GetEthBalance(this.state.icoWalletList.contractWallet);
                this.setState({
                    contractBalanceEth: contractBalanceEth,
                })
                const contractBalanceBlc = await GetBlcBalance(this.state.icoWalletList.contractWallet, this.state.icoWalletList.contractWallet, TOKEN_DECIMALS);
                this.setState({
                    contractBalanceBlc: contractBalanceBlc,
                })
                const ownerBalanceEth = await GetEthBalance(this.state.icoWalletList.ownerWallet);
                this.setState({
                    ownerBalanceEth: ownerBalanceEth,
                })
                const ownerBalanceBlc = await GetBlcBalance(this.state.icoWalletList.ownerWallet, this.state.icoWalletList.contractWallet, TOKEN_DECIMALS);
                this.setState({
                    ownerBalanceBlc: ownerBalanceBlc,
                })
            } catch(err) {
                console.log("fail to get balance from contract.", err)
            }
        }
    }
}

export default Container;