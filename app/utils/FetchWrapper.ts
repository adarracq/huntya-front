export const fetchWrapper = {
    get,
    getFile,
    post,
    put,
    putImage,
    delete: _delete
};

function get(url: string) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function getFile(url: string) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(url, requestOptions).then(handleFileResponse);
}

function post(url: string, body: any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'multipart/form-data' },
        body: JSON.stringify(body),
        credential: 'include'
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function putImage(url: string, formData: any) {

    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
        },
        body: formData,
        credential: 'include'
    };
    return fetch(url, requestOptions).then(handleResponse);
}


// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
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