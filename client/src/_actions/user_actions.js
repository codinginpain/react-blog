import axios from 'axios';
import { LOGIN_USER } from './types';

export function loginUser(dataToSubmit) {

    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data); //response.data를 request에 저장
    
    return {
        type: LOGIN_USER,
        payload: request
    }

}