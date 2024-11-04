import { ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUE_FAILURE, CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE, DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUE_BY_ID_REQUEST, FETCH_ISSUE_BY_ID_SUCCESS, UPDATE_ISSUE_FAILURE, UPDATE_ISSUE_REQUEST, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS, UPDATE_ISSUE_SUCCESS } from "./ActionTypes";

const initialState = {
    issues: [],
    loading: false,
    error: null,
    issueDetails: null,
};

export const issueReducer = (state=initialState,action) => {

    switch (action.type) {
        
        case FETCH_ISSUE_BY_ID_REQUEST:
        case CREATE_ISSUE_REQUEST:
        case FETCH_ISSUES_REQUEST:
        case DELETE_ISSUE_REQUEST:
        case UPDATE_ISSUE_STATUS_REQUEST:
        case UPDATE_ISSUE_REQUEST:
        case ASSIGNED_ISSUE_TO_USER_REQUEST:
            return{
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_ISSUES_SUCCESS:
            return{
                ...state,
                loading: false,
                issues: action.issues,
            };

        case FETCH_ISSUE_BY_ID_SUCCESS:
        case UPDATE_ISSUE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                issueDetails: action.issue,
            };

        case CREATE_ISSUE_SUCCESS:
            return{
                ...state,
                loading: false,
                issues: [...state.issues,action.issue],
            };

        case UPDATE_ISSUE_SUCCESS:
        case ASSIGNED_ISSUE_TO_USER_FAILURE:
            return {...state,loading:false,issues:state.issues.map((issue) => issue.id === action.issue.id ? action.issue:issue),};

        case DELETE_ISSUE_SUCCESS:
            return{
                ...state,
                loading: false,
                issues: state.issues.filter((issue) => issue.id !== action.issueId),
            };

        case FETCH_ISSUES_FAILURE:
        case CREATE_ISSUE_FAILURE:
        case UPDATE_ISSUE_FAILURE:
        case DELETE_ISSUE_FAILURE:
        case ASSIGNED_ISSUE_TO_USER_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error,
            };
    
        default:
            return state;
    }

}

export default issueReducer;