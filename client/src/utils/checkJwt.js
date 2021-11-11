import jwt_decode from 'jwt-decode';
import store from '../store'
import setToken from '../utils/setToken'
import {setUserData, logoutUser} from '../actions/authAction'

const checkJwt = (token) => {
    setToken(token)
    const decodedToken = jwt_decode(token)
    store.dispatch(setUserData(decodedToken))
  
    const currentTime = Date.now() / 1000
  
    if(decodedToken.exp < currentTime){
  
      store.dispatch(logoutUser());
      
      store.dispatch(setUserData({}))
      window.location.href = '/login'
  
    }
}

export default checkJwt;