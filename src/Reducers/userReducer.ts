import { GET_USER, LOGIN_USER, REGISTER_USER } from "../Actions/types";

export default function user(state = {}, action: any) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, loginSuccess: action.payload };
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        case GET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}