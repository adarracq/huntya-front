import AsyncStorageUser from "./AsyncStorageUser";

export const fetchWrapper = {
    get,
    getFile,
    post,
    put,
    putImage,
    delete: _delete
};

async function get(url: string) {
    let token = await AsyncStorageUser.getToken();
    const requestOptions = {
        method: 'GET',
        headers: { authorization: 'Bearer ' + token }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function getFile(url: string) {
    let token = await AsyncStorageUser.getToken();
    const requestOptions = {
        method: 'GET',
        headers: { authorization: 'Bearer ' + token }
    };
    return fetch(url, requestOptions).then(handleFileResponse);
}

async function post(url: string, body: any) {
    let token = await AsyncStorageUser.getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

async function put(url: string, body: any) {
    let token = await AsyncStorageUser.getToken();
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'multipart/form-data',
            authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body),
        credential: 'include'
    };
    return fetch(url, requestOptions).then(handleResponse);
}


async function putImage(url:string, formData:any) {
    let token = await AsyncStorageUser.getToken();
    const requestOptions = {
        method: "PUT",
        body: formData,
        headers: {
            "Accept": "multipart/form-data",
            authorization: 'Bearer ' + token
        },
        credentials: "include",
    };
    return fetch(url, requestOptions).then(handleResponse).catch(err => console.log(err));
}



// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function handleFileResponse(response: any) {
    return response.blob().then((blob: any) => {
        const data = blob && blob;

        if (!response.ok) {
            const error = (data && data.message) || (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}