import { CREATE_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS } from "../Project/ActionTypes";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes";

const initialState = {
    user:null,
    loading:false,
    error:null,
    jwt:null,
    projectSize:0,
}

export const authReducer = (state=initialState,action) => {

    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {...state,loading:true,error:null};

        case CREATE_PROJECT_SUCCESS:
            return{...state,loading:false,projectSize:state.projectSize+1};

        case DELETE_PROJECT_SUCCESS:
            return {...state,loading:false,projectSize: state.projectSize-1};

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state,loading:false,jwt:action.payload.jwt};

        case GET_USER_SUCCESS:
            return {...state,loading:false,user:action.payload,projectSize:action.payload.projectSize};

        case GET_USER_FAILURE:
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {...state,loading:false,error:action.payload};

        case LOGOUT:
            localStorage.removeItem("jwt");
            return {...state,jwt:null,user:null};
    
        default:
            return state;
    }

}