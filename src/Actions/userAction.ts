import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "./types";
import { request, requestMedia } from "../utils/fetch";

const USER_URL = "/user";

export async function registerUser(dataToSubmit: any) {
    const data = await requestMedia("post", USER_URL + "/register", dataToSubmit);

    return {
        type: REGISTER_USER,
        payload: data,
    };
}

export async function loginUser(dataToSubmit: any) {
    const data = await request("post", USER_URL + "/login", dataToSubmit);

    return {
        type: LOGIN_USER,
        payload: data,
    };
}

export async function logoutUser() {
    const data = await request("post", USER_URL + "/logout", "");

    return {
        type: LOGOUT_USER,
        payload: data,
    };
}
