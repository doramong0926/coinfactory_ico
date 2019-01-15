import Web3 from "web3";
import EthereumJsWallet from 'ethereumjs-wallet';
import EthUtil from 'ethereumjs-util';
import ProviderEngine from 'web3-provider-engine';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import CryptoJS from 'crypto-js';
import { abi, erc20Abi } from "./../config/contract_abi"
import { NETWORK } from "./../config/constants"

export const GetParentString = (parent, child) => {       
    if (parent === null || child === null) {
        return null;
    }
    
    return CryptoJS.AES.decrypt(parent, child).toString(CryptoJS.enc.Utf8)
}

export const GetContractAbi = () => {
    return abi;
}

export const GetErc20Abi = () => {
    return erc20Abi;
}

export const IsValidWalletAddress = (address) => {
    return /^0x([A-Fa-f0-9]{40})$/.test(address);
}

export const GetEthBalance = (walletAddress) => {
    const web3 = new Web3(getWeb3HTTPProvider());
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(walletAddress, (error, weiBalance) => {
          if (error) {
            reject(error);
          }
          const balance = weiBalance / Math.pow(10, 18);
          resolve(balance);
        });
    });
}

export const GetBlcBalance = (walletAddress, contractAddress, decimals) => {
    const web3 = new Web3(getWeb3HTTPProvider());
    return new Promise((resolve, reject) => {
        web3.eth
          .contract(GetErc20Abi())
          .at(contractAddress)
          .balanceOf(walletAddress, (error, decimalsBalance) => {
            if (error) {
              reject(error);
            }

            const balance = decimalsBalance / Math.pow(10, decimals);
            resolve(balance);
          });
    });
}

export const ReturnTokenToOwnerWallet = (privateKey, contractAddress, ownerAddress) => {
    const web3 = getWeb3Instance(privateKey)
    
    return new Promise((resolve, reject) => {
        web3.eth
        .contract(GetContractAbi())
        .at(contractAddress)
        .returnTokenToWallet (
            {from: ownerAddress}, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            }
        );
    });
}

export const GetIsIcoStarted = (contractAddress) => {
    const web3 = new Web3(getWeb3HTTPProvider());
    return new Promise((resolve, reject) => {
        web3.eth
        .contract(GetContractAbi())
        .at(contractAddress)
        .startico.call(
            (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            }
        );
    });
}

export const ContractStartStop = (startStop, privateKey, contractAddress, ownerAddress) => {
    const web3 = getWeb3Instance(privateKey)
    
    return new Promise((resolve, reject) => {
        web3.eth
        .contract(GetContractAbi())
        .at(contractAddress)
        .startstopICO (
            startStop,
            {from: ownerAddress}, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            }
        );
    });
}

export const getWeb3HTTPProvider = () => {
    switch (NETWORK) {
        case 'ropsten':
            return new Web3.providers.HttpProvider(
                `https://ropsten.infura.io/${process.env.REACT_APP_INFURA_API_KEY}`,
            );
        case 'kovan':
            return new Web3.providers.HttpProvider(
                `https://kovan.infura.io/${process.env.REACT_APP_INFURA_API_KEY}`,
            );
        case 'rinkeby':
            return new Web3.providers.HttpProvider(
                `https://rinkeby.infura.io/${process.env.REACT_APP_INFURA_API_KEY}`,
            );
        default:
            return new Web3.providers.HttpProvider(
                `https://mainnet.infura.io/${process.env.REACT_APP_INFURA_API_KEY}`,
            );
    }
}

export const getWeb3Instance = (privateKey) => {
    const wallet = EthereumJsWallet.fromPrivateKey(EthUtil.toBuffer(privateKey));
    const engine = new ProviderEngine();
    engine.addProvider(new WalletSubprovider(wallet, {}));
    engine.addProvider(new ProviderSubprovider(getWeb3HTTPProvider()));
    engine.start();
    const web3 = new Web3(engine);    
    web3.eth.defaultAccount = wallet.walletAddress;
    return web3;
}