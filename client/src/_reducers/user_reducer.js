import { LOGIN_USER, REGISTER_USER } from '../_actions/types';



export default function (state = {}, action) { //(previousState, action) => nextState  //문서참조
    switch (action.type) { //type들이 많아 질 것을 위해 switch문을 사용
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload };
            break;    
    
        default:
            return state;
    }
}