import React from "react";
import {
    Segment,
    Table,
    Dimmer,
    Loader,
    Button,
    Icon,
    Input,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import _ from "lodash";
import UserInfoModal from "./../UserInfoModal"
import ConfirmModal from "./../ConfirmModal"
import BasicModal from "./../BasicModal"

const UserList = (props, context) => {
    const ConfirmModalContents = [
        {
            title: null,
            text: [
                'Are you sure to change User KYC status?',
            ]
        },
    ];
    const ErrorModalContents = [
        {
            title: null,
            text: [
                "Fail to change User KYC."
            ]
        },
    ];
    
    const SuccessModalContents = [
        {
            title: null,
            text: [
                "Success to change User KYC."
            ]
        },
    ];
    return(            
        <React.Fragment>
            <Segment className={styles.RootSegment}>
                <div className={styles.SubTitleBox}>
                    <p className={styles.SubTitleText}>User List </p>
                    <Button 
                        icon 
                        onClick={props.refresh}
                        className={styles.Button}
                    >
                        <Icon name='refresh' />
                    </Button>                    
                </div>
                <div className={styles.InputBox}>
                    <Input 
                        type='text' 
                        placeholder='Filter String'
                        value={props.filterString !== null ? props.filterString : ""}
                        onChange={props.handleInputChange}
                        name='filterString'
                        className={styles.InputBox}
                    />
                </div>
                {
                    (props.isLoading === true)
                    ? (
                        <Dimmer active inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                    ) 
                    : (
                        <UserListTable                             
                            {...props} 
                            filterString={props.filterString}
                        />
                    )
                }
            </Segment>
            <UserInfoModal 
                visible={props.visibleUserInfoModal}
                handleClose={props.handleCloseModal}
                handleProcessDone={props.handleProcessDoneModal}
                userInfomation={props.userInfomation}
                investedEth={props.investedEth}
                receivedBlc={props.receivedBlc}
            />
            <ConfirmModal 
                visible = {props.visibleConfirmModal}
                handleClose = {props.handleCloseConfirmModal}
                handleConfirm = {props.handleConfirm}
                buttonString = {"Confirm"}
                size={"mini"} 
                title={"ChangeKYC "}
                contents={ConfirmModalContents}                
            />
            <BasicModal 
                visible = {props.visibleSuccessModal}
                handleClose = {props.handleCloseSuccessModal}
                size={"mini"} 
                title="Success"
                contents={SuccessModalContents}
            />
            <BasicModal 
                visible = {props.visibleErrorModal}
                handleClose = {props.handleCloseErrorModal}
                size={"mini"} 
                title="Error"
                contents={ErrorModalContents}
            />
        </React.Fragment>
    )
}

const UserListTable = (props) => {
    return (
        <React.Fragment>
            <Table sortable celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={props.column === 'email' ? props.direction : null}
                            onClick={props.handleSort('email')}
                            className={styles.TableItemNomal}
                        >
                            Email
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={props.column === 'kyc_status' ? props.direction : null}
                            onClick={props.handleSort('kyc_status')}
                            className={styles.TableItemSmall}
                        >
                            KYC Status
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={props.column === 'wallet_address' ? props.direction : null}
                            onClick={props.handleSort('wallet_address')}
                            className={styles.TableItemLong}
                        >
                            Wallet Address
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={props.column === 'is_whitelisted' ? props.direction : null}
                            onClick={props.handleSort('is_whitelisted')}
                            className={styles.TableItemMini}
                        >
                            Is Whitelist
                        </Table.HeaderCell>           
                        <Table.HeaderCell
                            sorted={props.column === 'country' ? props.direction : null}
                            onClick={props.handleSort('mobile_country')}
                            className={styles.TableItemMini}
                        >
                            Country
                        </Table.HeaderCell>     
                        <Table.HeaderCell
                            sorted={props.column === 'mobile_number' ? props.direction : null}
                            onClick={props.handleSort('mobile_number')}
                            className={styles.TableItemSmall}
                        >
                            Mobile number
                        </Table.HeaderCell>    
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(props.user_list, ({ username, email, country, mobile_country, mobile_number, wallet_address, kyc_status, is_whitelisted}) => (
                        (props.filterString !== null && props.filterString !== '')
                            ? (
                                ((email !== null && email.includes(props.filterString)) || (mobile_number !== null && mobile_number.includes(props.filterString)) || (wallet_address !== null && wallet_address.includes(props.filterString)))
                                    ? (
                                        <Table.Row 
                                            key={email}
                                            onClick={() => {props.handleOnClickUser(username)}}
                                            className={styles.RowBox}
                                        >
                                            <Table.Cell>{email}</Table.Cell>                                    
                                            <Table.Cell>{kyc_status}</Table.Cell>
                                            <Table.Cell>{wallet_address}</Table.Cell>                                                                        
                                            <Table.Cell>{is_whitelisted.toString()}</Table.Cell>
                                            <Table.Cell>{country}</Table.Cell>           
                                            <Table.Cell>{mobile_country}-{mobile_number}</Table.Cell>
                                        </Table.Row>
                                    ) : null
                            ) : (
                                    <Table.Row 
                                        key={email}
                                        onClick={() => {props.handleOnClickUser(username)}}
                                        className={styles.RowBox}
                                    >
                                    <Table.Cell>{email}</Table.Cell>                                    
                                    <Table.Cell>{kyc_status}</Table.Cell>
                                    <Table.Cell>{wallet_address}</Table.Cell>                                                                        
                                    <Table.Cell>{is_whitelisted.toString()}</Table.Cell>
                                    <Table.Cell>{country}</Table.Cell>           
                                    <Table.Cell>{mobile_country}-{mobile_number}</Table.Cell>
                                </Table.Row>
                            )
                    ))}
                </Table.Body>
            </Table>                
        </React.Fragment>
    )
}

UserList.propTypes = {    
    user_list: PropTypes.array,
    handleSort: PropTypes.func.isRequired,
    column: PropTypes.string,
    direction: PropTypes.string,
    refresh: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    filterString: PropTypes.string,
    handleOnClickUser: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleProcessDoneModal: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    visibleUserInfoModal: PropTypes.bool.isRequired,
    icoWalletList: PropTypes.object,
    userInfomation: PropTypes.object,
    visibleConfirmModal: PropTypes.bool.isRequired,
    handleCloseConfirmModal: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    visibleSuccessModal: PropTypes.bool.isRequired,
    visibleErrorModal: PropTypes.bool.isRequired,
    handleCloseSuccessModal: PropTypes.func.isRequired,
    handleCloseErrorModal: PropTypes.func.isRequired,
    investedEth: PropTypes.string,
    receivedBlc: PropTypes.string,
}

UserList.contextTypes = {
    t: PropTypes.func.isRequired
};

export default UserList;