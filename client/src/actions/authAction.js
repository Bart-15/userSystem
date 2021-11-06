import axios from 'axios';
import { GET_ERRORS} from './types'



const createNewUser = (data, history) => (dispatch) => {
    axios.post('/api/signup', data)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}


// const loginUser = data => (dispatch) => {
//     axios.post('/api/login/', data){
//         dispatch()
//     }
// }

export  {
    createNewUser
}