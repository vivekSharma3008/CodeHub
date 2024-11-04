import api from "@/config/api";
import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionTypes"

export const sendMessage = ({message,sendToServer}) => {
    return async (dispatch) => {
        dispatch({type:SEND_MESSAGE_REQUEST});
        try{
            const response = await api.post(
                "/api/message/send",message
            );
            sendToServer(response.data);
            dispatch({
                type: SEND_MESSAGE_SUCCESS,
                message: response.data,
            });
            console.log("Message sent",response.data);
        }catch(error){
            dispatch({
                type: SEND_MESSAGE_FAILURE,
                error: error.message,
            });
        }
    };
};

export const messageReceived = (message) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: SEND_MESSAGE_SUCCESS,
                message: message,
            });
        }catch(error){
            dispatch({
                type: SEND_MESSAGE_FAILURE,
                error: error.message,
            });
        }
    };
};

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        dispatch({type:FETCH_CHAT_BY_PROJECT_REQUEST});
        try{
            const response = await api.get(
                `/api/projects/${projectId}/chat`
            );
            console.log("Fetch chat by project",response.data);
            dispatch({
                type: FETCH_CHAT_BY_PROJECT_SUCCESS,
                payload: response.data,
            });
        } catch(error){
            console.log(error);
            dispatch({
                type: FETCH_CHAT_BY_PROJECT_FAILURE,
                error: error.message,
            });
        }
    };
};

export const fetchChatMessage = (chatId) => {
    return async (dispatch) => {
        dispatch({type: FETCH_CHAT_MESSAGES_REQUEST});
        try{
            const response = await api.get(
                `api/message/chat/${chatId}`
            );
            console.log("Fetch Messages",response.data);
            dispatch({
                type: FETCH_CHAT_MESSAGES_SUCCESS,
                chatId,
                messages: response.data,
            });
        } catch(error){
            console.log(error);
            dispatch({
                type: FETCH_CHAT_MESSAGES_FAILURE,
                error: error.message,
            });
        }
    };
};