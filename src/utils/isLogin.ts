import Cookies from "universal-cookie";

export const isLogin = () => {
    const cookies = new Cookies();
    return cookies.get('jwt')
}