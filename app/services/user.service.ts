import { fetchWrapper } from "../utils/FetchWrapper";

const baseUrl = process.env.EXPO_PUBLIC_DEV_API_URL + '/api/user';

export const userService = {
    loginOrSignup,
    verifyEmailCode,
    getByEmail,
    update
};

function loginOrSignup(params: any) {
    return fetchWrapper.post(baseUrl + '/loginOrSignup', params);
}

function verifyEmailCode(params: any) {
    return fetchWrapper.post(baseUrl + '/code', params);
}

function getByEmail(email: string) {
    return fetchWrapper.get(baseUrl + '/' + email);
}
function update(params: any) {
    return fetchWrapper.put(baseUrl + '/', params);
}