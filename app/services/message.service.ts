import { fetchWrapper } from "../utils/FetchWrapper";

const baseUrl = process.env.EXPO_PUBLIC_DEV_API_URL + '/api/message';

export const messageService = {
    getConvs,
    getMessages,
    addMessage,
};

function getConvs(params: any) {
    return fetchWrapper.post(baseUrl + '/convs', params);
}

function getMessages(params: any) {
    return fetchWrapper.post(baseUrl + '/messages', params);
}

function addMessage(params: any) {
    return fetchWrapper.post(baseUrl + '/message', params);
}