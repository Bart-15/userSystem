import axios from 'axios';
import { GET_ERRORS, SET_USER, GET_PROFILE} from './types'
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


const loginUser = (data, history) => (dispatch) => {
   axios.post('/api/login/', data)
        .then(res => {
            const {token} = res.data;
            setToken(token);
            localStorage.setItem('jwtToken', token)
            const decoded = jwt_decode(token);
            dispatch(setUserData(decoded));
            history.push('/dashboard')
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


const logoutUser = () => dispatch => {

    dispatch({
        type:GET_PROFILE,
        payload:{}
    })
    // remove jwt token from localStorage
    localStorage.removeItem('jwtToken')
    
    // set token to false
    setToken(false)
    
    // set user data to null or empty object
    dispatch(setUserData({}))
}

const deleteAccount  = () => dispatch => {
    if(window.confirm('Are you sure you want to delete this account?')){ 
        axios.delete('/api/myprofile/delete/')
            .then(res => {
                localStorage.removeItem('jwtToken')
                dispatch({
                    type:SET_USER,
                    payload:{}
                })
            }).catch(err => {
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
            })
    }
}


const loadProfile = () => dispatch => {
    axios.get('/api/myprofile')
            .then(res => 
                dispatch({
                    type:GET_PROFILE,
                    payload:res.data
                })
            )   
            .catch(err => dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }))
}

const uploadAvatar = (data, history) => dispatch => {
   axios.post('/api/myprofile/avatar', data)
    .then(response => {
        dispatch(history.push('/dashboard'));
    }).catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response
    }));
}
export {
    uploadAvatar,
    createNewUser,
    loginUser, 
    setUserData,
    logoutUser,
    deleteAccount,
    loadProfile
}