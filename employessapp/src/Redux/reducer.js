import { DELETE, GET, PATCH, POST } from "./actions";


export const reducer = (store=[],{type,payload}) => {
    switch(type){
        case GET:{
            return {
                store : [...payload]
            }
        }
        case POST: {
            return {
                store:[...payload]
            }
        }
        case DELETE : {
            return {
                store :[...payload]
            }
        }
        case PATCH : {
            return {
                store : [...payload]
            }
        }
        default:{
            return{
                store
            }
        }
    }
}