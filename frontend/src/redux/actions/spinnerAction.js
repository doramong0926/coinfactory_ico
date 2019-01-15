import actionTypes from '../actionTypes';

export function ShowDefaultSpinner() {
    return {
        type: actionTypes.SPINNER_SHOW_DEFAULT_SPINNER,
    };
}

export function HideDefaultSpinner() {
    return {
        type: actionTypes.SPINNER_HIDE_DEFAULT_SPINNER,
    };
}