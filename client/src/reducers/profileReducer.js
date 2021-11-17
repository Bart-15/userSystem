import {GET_PROFILE} from '../../src/actions/types'

const initialState = {
    profile:{}
}


const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROFILE:
            return {
               ...state,
                profile: action.payload
            }
        
        default: 
        return state;
    }
    
}

export default profileReducer;