
const DOMAIN = "http://localhost:8000";

export const request = (method: any, url: string, data: any) => {
    return fetch(DOMAIN + url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then((data) => data.json())
        .catch((err) => console.log(err));
};