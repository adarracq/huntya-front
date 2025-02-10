import { fetchWrapper } from "../utils/FetchWrapper";

const baseUrl = process.env.EXPO_PUBLIC_DEV_API_URL + '/api/conv';

export const convService = {
    getConv,
    getUserConvs,
    readConv,
    sendMessage,
};

function getConv(senderId: string, receiverId: string) {
    return fetchWrapper.get(`${baseUrl}/senderId=${senderId}&receiverId=${receiverId}`);
}

function getUserConvs(userId: string) {
    return fetchWrapper.get(`${baseUrl}/user/${userId}`);
}

function readConv(convId: string) {
    return fetchWrapper.get(`${baseUrl}/read/${convId}`);
}

function sendMessage(params:any) {
    return fetchWrapper.post(`${baseUrl}/message`, params);
}
