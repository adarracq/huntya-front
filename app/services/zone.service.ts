import { fetchWrapper } from "../utils/FetchWrapper";

const baseUrl = process.env.EXPO_PUBLIC_DEV_API_URL + '/api/zone';

export const zoneService = {
    getAll,
    getMany,
    addToZones,
    create,
    createMany,
    getZoneFromCoords,
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getMany(ids: string[]) {
    return fetchWrapper.put(baseUrl + '/many', ids);
}

function create(params: any) {
    return fetchWrapper.post(baseUrl, params);
}

function createMany(params: any) {
    return fetchWrapper.post(baseUrl + '/many', params);
}

function addToZones(params:any) {
    return fetchWrapper.put(baseUrl + '/add', params);
}

function getZoneFromCoords(coords: any) {
    return fetchWrapper.put(baseUrl + '/coords', coords);
}