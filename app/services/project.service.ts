import { fetchWrapper } from '../utils/FetchWrapper';

const baseUrl = process.env.EXPO_PUBLIC_DEV_API_URL + '/api/project';

export const projectService = {
    getAll,
    create,
    getOne,
    getAllByUserId,
    getProjectsInZones,
    getProjectsInZone,
    update,
    delete: _delete
};


function getAll() {
    return fetchWrapper.get(baseUrl);
}

function create(params: any) {
    return fetchWrapper.post(baseUrl, params);
}

function getOne(id: string) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getAllByUserId(id: string) {
    return fetchWrapper.get(`${baseUrl}/user/${id}`);
}

function getProjectsInZones(zones: any) {
    return fetchWrapper.post(`${baseUrl}/zones`, zones);
}

function getProjectsInZone(zone: any) {
    return fetchWrapper.post(`${baseUrl}/zone`, zone);
}

function update(id: string, params: any) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
