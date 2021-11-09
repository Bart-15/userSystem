import axios from 'axios';
import { GET_ERRORS, SET_USER} from './types'
import jwt_decode from 'jwt-decode'
import setToken from '../utils/setToken'

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


const loginUser = data => (dispatch) => {
   axios.post('/api/login/', data)
        .then(res => {
            const {token} = res.data;
            setToken(token);
            localStorage.setItem('jwtToken', token)
            const decoded = jwt_decode(token);
            dispatch(setUserData(decoded));
        })
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}


const setUserData = decoded  => {
    return {
        type:SET_USER,
        payload:decoded
    }
}


const logoutUser  = dispatch => {
    // remove jwt token from localStorage
    localStorage.removeItem('jwtToken')

    // set token to false
    setToken(false)

    // set user data to null or empty object
    dispatch(setUserData({}))
}
export {
    createNewUser,
    loginUser, 
    setUserData,
    logoutUser
}