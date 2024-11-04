import api, { API_BASE_URL } from "@/config/api"
import { ACCEPT_INVITATION_FAILURE, ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_FAILURE, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECT_BY_ID_FAILURE, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, INVITE_TO_PROJECT_FAILURE, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_FAILURE, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS } from "./ActionTypes";
import { FETCH_CHAT_BY_PROJECT_FAILURE } from "../Chat/ActionTypes";

export const fetchProjects = ({category,tag}) => { 
    
    const params = {};
    if(category){
        params.category=category;
    }
    if(tag){
        params.tag=tag;
    }
    
    return async(dispatch) => {
        dispatch({type:FETCH_PROJECTS_REQUEST})
        try{
            const {data} = await api.get("/api/projects",{params});
            // console.log("ALL PROJECTS",data);
            dispatch({type:FETCH_PROJECTS_SUCCESS,projects:data});

        } catch(error){
            console.log(error);
            dispatch({
                type: FETCH_PROJECTS_FAILURE,
                error: error.message,
            });
        }
    };
};

export const searchProjects = (keyword) => async(dispatch) => {
    dispatch({type:SEARCH_PROJECT_REQUEST})
    try{
        const {data} = await api.get("/api/projects/search?keyword="+keyword);
        console.log("SEARCH PROJECTS",data);
        dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data});

    } catch(error){
        console.log(error);
        dispatch({
            type: SEARCH_PROJECT_FAILURE,
            error: error.message,
        });
    }
};

export const createProject = (projectData) => async(dispatch) => {
    dispatch({type:CREATE_PROJECT_REQUEST})
    try{
        const {data} = await api.post(`${API_BASE_URL}/api/projects`,projectData);
        console.log("CREATE PROJECT",data);
        dispatch({type:CREATE_PROJECT_SUCCESS,project:data});

    } catch(error){
        console.log(error);
        dispatch({
            type: CREATE_PROJECT_FAILURE,
            error: error.message,
        });
    }
};

export const updateProject = ({projectId, updatedData}) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_PROJECT_REQUEST});
      try {
        const response = await api.put(
          `${API_BASE_URL}/api/projects/${projectId}`,
          updatedData
        );
        dispatch({
          type: UPDATE_PROJECT_SUCCESS,
          project: response.data,
        });
      } catch (error) {
          console.log("catch error ",error)
        dispatch({
          type: UPDATE_PROJECT_FAILURE,
          error: error.message,
        });
      }
    };
  };

export const fetchProjectById = (id) => async(dispatch) => {
    dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
    try{
        const {data} = await api.get("/api/projects/"+id);
        dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS,projectDetails:data});

    } catch(error){
        console.log(error);
        dispatch({
            type: FETCH_PROJECT_BY_ID_FAILURE,
            error: error.message,
        });
    }
};

export const deleteProject = ({projectId}) => async(dispatch) => {
    dispatch({type:DELETE_PROJECT_REQUEST})
    try{
        await api.delete("/api/projects/"+projectId);
        console.log("DELETE PROJECT",data);
        dispatch({type:DELETE_PROJECT_SUCCESS,projectId});

    } catch(error){
        console.log(error);
        dispatch({
            type: DELETE_PROJECT_FAILURE,
            error: error.message,
        });
    }
};

export const inviteToProject = ({email,projectId}) => async(dispatch) => {
    dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try{
        const {data} = await api.post("/api/projects/invite",{email,projectId});
        // console.log("INVITE PROJECT",data);
        dispatch({type:INVITE_TO_PROJECT_SUCCESS});

    } catch(error){
        console.log(error);
        dispatch({type: INVITE_TO_PROJECT_FAILURE,error: error.message});
    }
};

export const acceptInvitation = ({token,navigate}) => async(dispatch) => {
    dispatch({type:ACCEPT_INVITATION_REQUEST})
    try{
        const {data} = await api.get("/api/projects/accept_invitation",{
            params:{
                token
            }
        });
        navigate("/project/"+data.projectId);
        console.log("ACCEPT INVITATION",data);
        dispatch({type:ACCEPT_INVITATION_SUCCESS,payload:data});

    } catch(error){
        console.log(error);
        dispatch({
            type: ACCEPT_INVITATION_FAILURE,
            error: error.message,
        });
    }
};