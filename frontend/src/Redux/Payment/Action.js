import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS } from "./ActionTypes";

export const createPayment = async({planType,jwt}) => async (dispatch) => {
    try{
        dispatch({type: CREATE_PAYMENT_REQUEST});

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${jwt}`,
            },
        };

        const {data} = await api.post(`/api/payments/${planType}`, config);
        if(data.payment_link_url){
            window.location.href=data.payment_link_url;
        }

        dispatch({
            type: CREATE_PAYMENT_SUCCESS,
            payload: data,
        });

    } catch(error){
        
        console.log("Error",error);
        dispatch({
            type: CREATE_PAYMENT_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });

    }
};