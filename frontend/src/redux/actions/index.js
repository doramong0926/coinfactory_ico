import * as userAction from './userAction';
import * as spinnerAction from './spinnerAction';
import * as kycAction from './kycAction';
import * as configAction from './configAction';

const ActionCreator = Object.assign({},
    userAction,
    kycAction,
    spinnerAction,
    configAction,
);

export default ActionCreator;