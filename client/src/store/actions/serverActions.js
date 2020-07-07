import * as actions from "../actions/actionTypes";

export const createServerAction = ({ serverDetails, auth_token }) => async (
    dispatch,
    getState
) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        await fetch("http://localhost:5000/api/servers/", {
            method: "POST",
            headers,
            body: JSON.stringify(serverDetails),
        });

        dispatch({
            type: actions.SERVER_CREATED,
        });
    } catch (error) {
        dispatch({ type: actions.SERVER_CREATION_FAILED, payload: error.code });
    }
};

// fetch a specific server
export const fetchServerAction = ({ auth_token, serverId }) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: actions.SERVER_FETCH_STARTED,
        });

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const response = await fetch(
            `http://localhost:5000/api/servers/${serverId}`,
            {
                method: "GET",
                headers,
            }
        );

        const server = await response.json();

        dispatch({
            type: actions.SERVER_FETCH_SUCCESS,
            payload: server,
        });
    } catch (error) {
        dispatch({
            type: actions.FETCH_FAIL,
            payload: error,
        });
    }
};

// fetch all Servers
export const fetchAllServers = (auth_token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.SERVERS_FETCH_STARTED,
        });

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const response = await fetch(`http://localhost:5000/api/servers/`, {
            method: "GET",
            headers,
        });

        const allServers = await response.json();

        dispatch({
            type: actions.SERVERS_FETCH_SUCCESS,
            payload: allServers,
        });
    } catch (error) {
        dispatch({
            type: actions.FETCH_FAIL,
            payload: error,
        });
    }
};

export const joinServerAction = ({ auth_token, userId, serverId }) => async (
    dispatch,
    getState
) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            userId: userId,
        };

        await fetch(`http://localhost:5000/api/servers/${serverId}/join`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        dispatch({
            type: actions.JOIN_SERVER_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: actions.JOIN_FAIL,
            payload: error,
        });
    }
};

export const createCategoryAction = ({
    auth_token,
    categoryName,
    serverId,
}) => async (dispatch, getState) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            category: {
                name: categoryName,
            },
        };

        await fetch(`http://localhost:5000/api/servers/${serverId}/`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        dispatch({
            type: actions.CREATE_CATEGORY_SUCCESS,
            payload: categoryName,
        });
    } catch (error) {
        dispatch({
            type: actions.CREATE_CATEGORY_FAIL,
            payload: error,
        });
    }
};

export const createChannelAction = ({
    auth_token,
    channelName,
    categoryId,
    serverId,
}) => async (dispatch, getState) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            channel: {
                name: channelName,
            },
        };

        await fetch(
            `http://localhost:5000/api/servers/${serverId}/${categoryId}`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }
        );

        dispatch({
            type: actions.CREATE_CHANNEL_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: actions.CREATE_CHANNEL_FAIL,
            payload: error,
        });
    }
};

export const joinChannelAction = ({
    auth_token,
    channelId,
    categoryId,
    serverId,
}) => async (dispatch, getState) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const response = await fetch(
            `http://localhost:5000/api/servers/${serverId}/${categoryId}/${channelId}`,
            {
                method: "GET",
                headers,
            }
        );

        const channel = await response.json();

        dispatch({
            type: actions.JOIN_CHANNEL_SUCCESS,
            payload: { channel, categoryId },
        });
    } catch (error) {
        dispatch({
            type: actions.JOIN_CHANNEL_FAIL,
            payload: error,
        });
    }
};

export const postToChannelAction = ({
    auth_token,
    channelId,
    categoryId,
    serverId,
    post,
    userId,
    dateCreated,
}) => async (dispatch, getState) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            content: post,
            owner: userId,
            dateCreated,
        };

        const response = await fetch(
            `http://localhost:5000/api/servers/${serverId}/${categoryId}/${channelId}`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }
        );

        const newPost = await response.json();

        dispatch({
            type: actions.POST_TO_CHANNEL_SUCCESS,
            payload: newPost.postId,
        });
    } catch (error) {
        dispatch({
            type: actions.POST_TO_CHANNEL_FAIL,
            payload: error,
        });
    }
};

export const editPostAction = ({
    auth_token,
    channelId,
    categoryId,
    serverId,
    post,
    content,
    postId,
}) => async (dispatch, getState) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const body = {
            post,
            content,
        };

        await fetch(
            `http://localhost:5000/api/servers/${serverId}/${categoryId}/${channelId}/${postId}`,
            {
                method: "PATCH",
                headers,
                body: JSON.stringify(body),
            }
        );

        dispatch({
            type: actions.EDIT_POST_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: actions.EDIT_POST_FAIL,
            payload: error,
        });
    }
};

export const getUserAction = ({ auth_token, userId }) => async (
    dispatch,
    getState
) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        dispatch({
            type: actions.GET_USER_STARTED,
        });

        const response = await fetch(
            `http://localhost:5000/api/user/${userId}`,
            {
                method: "GET",
                headers,
            }
        );

        const user = response.json();

        dispatch({
            type: actions.GET_USER_SUCCESS,
            payload: user,
        });
    } catch (error) {
        dispatch({
            type: actions.GET_USER_FAIL,
            payload: error,
        });
    }
};
