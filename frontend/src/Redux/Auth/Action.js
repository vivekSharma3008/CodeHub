import { API_BASE_URL } from "@/config/api";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes"
import axios from "axios";

export const register = (userData) => async(dispatch)=>{

    dispatch({type:REGISTER_REQUEST})
    try{
        const response = await axios.post(`${API_BASE_URL}/auth/signup`,userData);
        const user = response.data;
        if(user.jwt){
            localStorage.setItem("jwt",user.jwt);
            dispatch({type:REGISTER_SUCCESS,payload:user});
        }
        
        // console.log("REGISTER SUCCESS",user);
    }catch(error){
        dispatch({type: REGISTER_FAILURE, payload: error.message});
        console.log(error);
    }
}

export const login = userData => async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,userData);
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:LOGIN_SUCCESS,payload:data});
        }
        
        console.log("LOGIN SUCCESS",data);
    }catch(error){
        dispatch({type: LOGIN_FAILURE, payload: error.message});
        console.log(error);
    }
}

export const getUser = (token) => async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        
        dispatch({type:GET_USER_SUCCESS,payload:data});
        
        // console.log("GET USER DATA SUCCESS",data);
    }catch(error){
        console.log(error);
        dispatch({type: GET_USER_FAILURE, payload: error.message});
    }
};

export const logout = () => async(dispatch) => {
    
    dispatch({type:LOGOUT})
    localStorage.clear();

}
