
const DOMAIN = "http://localhost:8000";
export const request = (method: any, url: string, data: any) => {
    return fetch(DOMAIN + url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then((data) => data.json())
        .catch((err) => console.log(err));
};

export const requestMedia = (method: any, url: string, data: any) => {
    return fetch(DOMAIN + url, {
        method,
        body: data
    })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

export const requestGet = (method: any, url: string,) => {
    return fetch(DOMAIN + url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((data) => data.json())
        .catch((err) => console.log(err));
};