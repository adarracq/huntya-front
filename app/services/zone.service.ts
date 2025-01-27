import { fetchWrapper } from "../utils/FetchWrapper";

const baseUrl = process.env.EXPO_PUBLIC_DEV_API_URL + '/api/zone';

export const zoneService = {
    getAll,
    create,
    createMany,
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function create(params: any) {
    return fetchWrapper.post(baseUrl, params);
}

function createMany(params: any) {
    return fetchWrapper.post(baseUrl + '/many', params);
}