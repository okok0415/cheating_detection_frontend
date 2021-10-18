import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, GET_USER } from "./types";
import { request, requestMedia, requestGet } from "../utils/fetch";

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

export async function getUser() {
    const data = await requestGet("get", USER_URL + "/user");

    return {
        type: GET_USER,
        payload: data,
    };
}
