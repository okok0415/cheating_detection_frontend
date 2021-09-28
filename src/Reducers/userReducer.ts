import { REGISTER_USER } from "../Actions/types";

export default function user(state = {}, action: any) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, loginSuccess: action.payload };
        default:
            return state;
    }
}