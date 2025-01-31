import { fetchWrapper } from "../utils/FetchWrapper";

const baseUrl = process.env.EXPO_PUBLIC_DEV_API_URL + '/api/event';

export const eventService = {
    getEventsByUserEmail,
    createEvent,
    updateEvent,
    delete: _delete
};

function getEventsByUserEmail(email: string) {
    return fetchWrapper.get(`${baseUrl}/${email}`);
}

function createEvent(params: any) {
    return fetchWrapper.post(baseUrl, params);
}

function updateEvent(id: string, params: any) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
