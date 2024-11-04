import api from "@/config/api";
import { ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUE_FAILURE, CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE, DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUE_BY_ID_FAILURE, FETCH_ISSUE_BY_ID_REQUEST, FETCH_ISSUE_BY_ID_SUCCESS, UPDATE_ISSUE_FAILURE, UPDATE_ISSUE_REQUEST, UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS, UPDATE_ISSUE_SUCCESS } from "./ActionTypes"

export const fetchIssues = (id) => {
    return async(dispatch) => {
        dispatch({type: FETCH_ISSUES_REQUEST});
        try{
            const response = await api.get(`/api/issues/project/${id}`);
            console.log("Fetch issues",response.data);
            dispatch({
                type: FETCH_ISSUES_SUCCESS,
                issues: response.data,
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: FETCH_ISSUES_FAILURE,
                error: error.message,
            });
        }
    };
};

export const fetchIssueById = (id) => {
    return async(dispatch)=>{
        dispatch({type: FETCH_ISSUE_BY_ID_REQUEST});
        try{
            const response = await api.get(`/api/issues/${id}`);
            console.log("Fetch issue by id",response.data);
            dispatch({
                type: FETCH_ISSUE_BY_ID_SUCCESS,
                issue: response.data,
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: FETCH_ISSUE_BY_ID_FAILURE,
                error: error.message,
            });
        }
    };
};

export const updateIssueStatus = ({id,status}) => {
    return async(dispatch) => {
        dispatch({type: UPDATE_ISSUE_STATUS_REQUEST});
        try{
            const response = await api.put(`/api/issues/${id}/status/${status}`);
            console.log("Update issue status", response.data);
            dispatch({
                type: UPDATE_ISSUE_STATUS_SUCCESS,
                issue: response.data,
            });
        } catch(error){
            console.log(error);
            dispatch({
                type: UPDATE_ISSUE_STATUS_FAILURE,
                error: error.message,
            });
        }
    };
};

export const assignedUserToIssue = ({issueId,userId}) => {
    return async(dispatch) => {
        dispatch({type: ASSIGNED_ISSUE_TO_USER_REQUEST});
        try{
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            console.log("Assigned Issue",response.data);
            dispatch({
                type: ASSIGNED_ISSUE_TO_USER_SUCCESS,
                issue: response.data,
            });
        } catch(error){
            console.log(error);
            dispatch({
                type: ASSIGNED_ISSUE_TO_USER_FAILURE,
                error: error.message,
            });
        }
    };
};

export const createIssue = (issueData) => {
    return async(dispatch) => {
        dispatch({type: CREATE_ISSUE_REQUEST});
        try{
            const response = await api.post("/api/issues",issueData);
            dispatch({
                type: CREATE_ISSUE_SUCCESS,
                issue: response.data,
            });
            console.log("Issue created successfully",response.data);
        } catch(error){
            dispatch({
                type: CREATE_ISSUE_FAILURE,
                error: error.message,
            });
        }
    };
};

export const updateIssue = (issueId,updatedData) => {
    return async(dispatch) => {
        dispatch({type: UPDATE_ISSUE_REQUEST});
        try{
            const response = await api.put(`/api/issues/${issueId}`,updatedData);
            dispatch({
                type: UPDATE_ISSUE_SUCCESS,
                issue: response.data,
            });
        } catch(error){
            dispatch({
                type: UPDATE_ISSUE_FAILURE,
                error: error.message,
            });
        }
    };
};

export const deleteIssue = (issueId) => {
    return async(dispatch) => {
        dispatch({type: DELETE_ISSUE_REQUEST});
        try{
            await api.delete(`/api/issues/${issueId}`);
            dispatch({
                type: DELETE_ISSUE_SUCCESS,
                issueId
            });
            console.log("Issue deleted successfully",issueId);
        } catch(error){
            dispatch({
                type: DELETE_ISSUE_FAILURE,
                error: error.message,
            });
        }
    };
};

