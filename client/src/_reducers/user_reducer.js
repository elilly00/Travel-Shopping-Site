import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';
import { registerUser } from '../_actions/user_action';

const userReducer = (state = {}, action) => {
    switch (action.type) { // 각각의 타입마다 다른 대응을 해야하기 때문에 switch 문법을 이용해 처리함
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // '...state'은 빈상태를 나타냄
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload };
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }; // 'index.js'에서 나열된 데이터들이 'action.payload'에 저장되어 userData로 정의함
            break;    
        default:
            return state;
    }
};
export default userReducer;
