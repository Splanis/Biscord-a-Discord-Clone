import * as actions from "../actions/actionTypes";

const initialState = {
    authError: null,
    auth_token: null,
    profile: null,
    servers: [],
    loading: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                profile: payload.userProfile,
                auth_token: payload.auth_token,
                authError: null,
            };
        case actions.AUTH_FAILED:
            return { ...state, authError: payload };
        case actions.LOGOUT:
            return { authError: null, auth_token: null, profile: null };
        case actions.USER_SERVERS_FETCH_STARTED:
            return {
                ...state,
                loading: true,
            };
        case actions.USER_SERVERS_FETCH_SUCCESS:
            return {
                ...state,
                servers: payload,
                loading: false,
            };
        case actions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
