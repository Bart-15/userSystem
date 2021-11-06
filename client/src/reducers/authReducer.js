import {SET_USER} from '../actions/types'
import isEmpty from '../validation/isEmpty'

const initialState = {
    isAuth:false,
    user:{}
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER :
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user:action.payload
            }
        default: 
            return state;
    }
}


export default authReducer;